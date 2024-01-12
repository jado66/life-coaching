import OpenAI from 'openai';
import { createThread } from './create-thread';
import {setCorsHeaders} from 'src/utils/middlware/cors';

const openai = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY }); // Replace with your own API key

export default async function handler(req, res) {
  setCorsHeaders(req, res, async() => {

    // Restrict to GET requests
    if (req.method !== 'GET') {
      res.setHeader('Allow', ['GET']);
      return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
      const thread = await createThread(openai);
      res.status(200).json(thread);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  })
}