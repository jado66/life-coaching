import OpenAI from 'openai';
import { createThread } from './create-thread';
import apiRequestOriginValidation from 'src/utils/api-request-origin-validation';

const openai = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY }); // Replace with your own API key

export default async function handler(req, res) {
  // Restrict to GET requests
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Verify the origin of the request
  const originValid = apiRequestOriginValidation(req); // Assumes the module exports a default function
  if (!originValid) {
    return res.status(403).json({ error: 'Invalid origin' });
  }

  try {
    const thread = await createThread(openai);
    res.status(200).json(thread);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
}