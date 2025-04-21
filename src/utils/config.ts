import dotenv from 'dotenv';

dotenv.config();

interface AppConfig {
  port: number;
  apiKey: string;
  geminiApiKey: string;
  geminiModel: string;
  geminiConfig: {
    temperature?: number;
    maxOutputTokens?: number;
    topP?: number;
    topK?: number;
    stopSequences?: string[];
  };
  // New: Manual free tier limits
  freeTierLimits: {
      monthlyInputTokens?: number;
      monthlyOutputTokens?: number;
  };
}

const config: AppConfig = {
  port: parseInt(process.env.PORT || '3000', 10),
  apiKey: process.env.API_KEY || '',
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  geminiModel: process.env.GEMINI_MODEL || 'gemini-1.5-flash-latest',
  geminiConfig: {
    temperature: process.env.GEMINI_TEMPERATURE ? parseFloat(process.env.GEMINI_TEMPERATURE) : undefined,
    maxOutputTokens: process.env.GEMINI_MAX_OUTPUT_TOKENS ? parseInt(process.env.GEMINI_MAX_OUTPUT_TOKENS, 10) : undefined,
    topP: process.env.GEMINI_TOP_P ? parseFloat(process.env.GEMINI_TOP_P) : undefined,
    topK: process.env.GEMINI_TOP_K ? parseInt(process.env.GEMINI_TOP_K, 10) : undefined,
    stopSequences: process.env.GEMINI_STOP_SEQUENCES ? process.env.GEMINI_STOP_SEQUENCES.split(',').map(s => s.trim()) : undefined,
  },
  // New: Parse manual limits
  freeTierLimits: {
      monthlyInputTokens: process.env.FREE_TIER_MONTHLY_INPUT_TOKENS_LIMIT ? parseInt(process.env.FREE_TIER_MONTHLY_INPUT_TOKENS_LIMIT, 10) : undefined,
      monthlyOutputTokens: process.env.FREE_TIER_MONTHLY_OUTPUT_TOKENS_LIMIT ? parseInt(process.env.FREE_TIER_MONTHLY_OUTPUT_TOKENS_LIMIT, 10) : undefined,
  }
};

// Basic validation for required keys
if (!config.apiKey) {
  console.error('FATAL ERROR: API_KEY not defined.');
  process.exit(1);
}

if (!config.geminiApiKey) {
  console.error('FATAL ERROR: GEMINI_API_KEY not defined.');
  process.exit(1);
}

// Basic validation/warnings for numerical config settings (remains the same)
if (config.geminiConfig.temperature !== undefined && (isNaN(config.geminiConfig.temperature) || config.geminiConfig.temperature < 0 || config.geminiConfig.temperature > 1)) {
    console.warn('WARNING: Invalid GEMINI_TEMPERATURE value. Using model default.');
    delete config.geminiConfig.temperature;
}
if (config.geminiConfig.maxOutputTokens !== undefined && (isNaN(config.geminiConfig.maxOutputTokens) || config.geminiConfig.maxOutputTokens <= 0)) {
    console.warn('WARNING: Invalid GEMINI_MAX_OUTPUT_TOKENS value. Using model default.');
    delete config.geminiConfig.maxOutputTokens;
}
if (config.geminiConfig.topP !== undefined && (isNaN(config.geminiConfig.topP) || config.geminiConfig.topP < 0 || config.geminiConfig.topP > 1)) {
    console.warn('WARNING: Invalid GEMINI_TOP_P value. Using model default.');
    delete config.geminiConfig.topP;
}
if (config.geminiConfig.topK !== undefined && (isNaN(config.geminiConfig.topK) || config.geminiConfig.topK < 0 || !Number.isInteger(config.geminiConfig.topK))) {
    console.warn('WARNING: Invalid GEMINI_TOP_K value. Using model default.');
    delete config.geminiConfig.topK;
}

// Validation for manual limits
if (config.freeTierLimits.monthlyInputTokens !== undefined && (isNaN(config.freeTierLimits.monthlyInputTokens) || config.freeTierLimits.monthlyInputTokens < 0)) {
     console.warn('WARNING: Invalid FREE_TIER_MONTHLY_INPUT_TOKENS_LIMIT value. Percentage calculation for input tokens will not be available.');
     delete config.freeTierLimits.monthlyInputTokens;
}
if (config.freeTierLimits.monthlyOutputTokens !== undefined && (isNaN(config.freeTierLimits.monthlyOutputTokens) || config.freeTierLimits.monthlyOutputTokens < 0)) {
     console.warn('WARNING: Invalid FREE_TIER_MONTHLY_OUTPUT_TOKENS_LIMIT value. Percentage calculation for output tokens will not be available.');
     delete config.freeTierLimits.monthlyOutputTokens;
}


export default config;