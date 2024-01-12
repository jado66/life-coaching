import OpenAI from 'openai';
import { generateResponse } from './generate-response';
import setCorsHeaders from 'src/utils/middlware/cors';

const openai = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY }); // Replace with your own API key

export default async function handler(req, res) {
  setCorsHeaders(req, res, async() => {

    if (req.method !== 'POST') {
      // Handle non-POST requests if necessary
      return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const originValid = apiRequestOriginValidation(req); // Assumes the module exports a default function
    if (!originValid) {
      return res.status(403).json({ error: 'Invalid origin' });
    }

    try {
      const { threadId, assistantId, message } = req.body;

      // Assuming that generateResponse is an async function that returns a promise
      const responseObject = await generateResponse(openai, assistantId, threadId, message);
      
      res.status(200).json(responseObject);
    } catch (error) {
      console.error(error); // This will print any error that occurs
      res.status(400).json({ error: error.message });
    }
  })
}

// Make sure to appropriately import or define `apiRequestOriginValidation` for your use case.
