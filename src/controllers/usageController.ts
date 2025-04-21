import { Request, Response } from 'express';
import { UsageMetadata } from "@google/generative-ai";
import config from '../utils/config'; // Import config to access limits

// In-memory storage for usage statistics
let usageStats = {
    successfulRequests: 0,
    totalInputTokens: 0,
    totalOutputTokens: 0,
    // Note: Quota limits are NOT available via the client library.
};

/**
 * Increments the usage statistics.
 * Called by the translation controller on successful Gemini calls.
 * @param {UsageMetadata} [usage] - Optional usage metadata from the Gemini response.
 */
export const incrementUsageStats = (usage?: UsageMetadata) => {
    usageStats.successfulRequests++;
    if (usage) {
        usageStats.totalInputTokens += usage.promptTokenCount || 0;
        usageStats.totalOutputTokens += usage.candidatesTokenCount || 0;
    }
    // Optional: Log a warning if approaching a limit based on manual config
    if (config.freeTierLimits.monthlyInputTokens && usageStats.totalInputTokens >= config.freeTierLimits.monthlyInputTokens * 0.9) {
         console.warn(`ATTENTION: Local input token count (${usageStats.totalInputTokens}) is approaching the configured monthly limit (${config.freeTierLimits.monthlyInputTokens}). Check your Google Cloud Console for actual usage.`);
    }
     if (config.freeTierLimits.monthlyOutputTokens && usageStats.totalOutputTokens >= config.freeTierLimits.monthlyOutputTokens * 0.9) {
         console.warn(`ATTENTION: Local output token count (${usageStats.totalOutputTokens}) is approaching the configured monthly limit (${config.freeTierLimits.monthlyOutputTokens}). Check your Google Cloud Console for actual usage.`);
    }
};

/**
 * Handles requests to the usage endpoint.
 * @param {Request} req - Express Request object.
 * @param {Response} res - Express Response object.
 */
export const getUsageStats = (req: Request, res: Response) => {
    // Note: This data is for *this specific API instance* since its last restart.
    // It does NOT reflect your overall Google Cloud/Gemini account usage or billing.

    const responseData: any = { // Use any for flexibility to add percentage later
        ...usageStats
    };

    const percentageData: any = {};

    // Calculate percentage of configured free tier limit if limits are set
    if (config.freeTierLimits.monthlyInputTokens !== undefined && config.freeTierLimits.monthlyInputTokens > 0) {
        percentageData.inputTokensPercentage = (usageStats.totalInputTokens / config.freeTierLimits.monthlyInputTokens) * 100;
         // Cap percentage at 100 for reporting simplicity
         percentageData.inputTokensPercentage = Math.min(percentageData.inputTokensPercentage, 100);
    } else {
         percentageData.inputTokensPercentage = null; // Indicate not calculated/available
    }

    if (config.freeTierLimits.monthlyOutputTokens !== undefined && config.freeTierLimits.monthlyOutputTokens > 0) {
        percentageData.outputTokensPercentage = (usageStats.totalOutputTokens / config.freeTierLimits.monthlyOutputTokens) * 100;
         // Cap percentage at 100 for reporting simplicity
        percentageData.outputTokensPercentage = Math.min(percentageData.outputTokensPercentage, 100);
    } else {
         percentageData.outputTokensPercentage = null; // Indicate not calculated/available
    }

    // Add percentage data if any limits were configured
    if (percentageData.inputTokensPercentage !== null || percentageData.outputTokensPercentage !== null) {
        responseData.percentageOfConfiguredFreeTier = percentageData;
        // Add a note about the basis of the percentage calculation
        responseData.percentageNote = "Percentage is based on local token count vs. manually configured monthly limits in .env. This is NOT your official Google Cloud usage.";
    }


    res.status(200).json({
        status: 'success',
        message: 'API instance usage stats (since last restart). **WARNING: This is NOT Google Cloud billing/quota data.**',
        data: responseData,
        officialGoogleCloudNote: "For official usage and quota details, check the Google Cloud Console or Google AI Studio."
    });
};