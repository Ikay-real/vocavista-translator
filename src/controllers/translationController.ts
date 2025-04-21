import { Request, Response } from 'express';
import { translateText } from '../utils/geminiService.';

// Interface for the expected request body
interface TranslateRequestBody {
  input_text: string;
  input_language: 'en' | 'es';
  output_language: 'en' | 'es';
}

export const handleTranslateRequest = async (req: Request, res: Response) => {
  const { input_text, input_language, output_language } = req.body as TranslateRequestBody;

  // Basic Input Validation
  if (!input_text || !input_language || !output_language) {
    return res.status(400).json({ message: 'Missing required fields: input_text, input_language, and output_language are required.' });
  }

  if (!['en', 'es'].includes(input_language)) {
     return res.status(400).json({ message: 'Invalid input_language. Must be "en" or "es".' });
  }

  if (!['en', 'es'].includes(output_language)) {
      return res.status(400).json({ message: 'Invalid output_language. Must be "en" or "es".' });
  }

  if (input_language === output_language) {
      return res.status(400).json({ message: 'Input and output languages cannot be the same.' });
  }

  try {
    const translationResult = await translateText({ input_text, input_language, output_language });

    // Increment usage counter on successful translation
  
    // Gemini is instructed to return the desired JSON format directly
    res.status(200).json(translationResult);

  } catch (error: any) {
    console.error('Error in translation handler:', error.message);
    // Return a generic 500 error or propagate specific errors from geminiService
    res.status(500).json({ message: `Translation failed: ${error.message}` });
  }
};

