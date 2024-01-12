import OpenAI from 'openai';
import { generateResponse } from '../generate-response/generate-response';
import setCorsHeaders from 'src/utils/middlware/cors';

const openai = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY }); // Replace with your own API key
const baseUrl = process.env.BASE_URL || 'http://localhost:3000'; 
const environment = process.env.NODE_ENV || 'dev';

export default async function handler(req, res) {
  setCorsHeaders(req, res, async() => {
    if (req.method !== 'POST') {
      // If the request is not a POST, return 405 Method Not Allowed
      res.setHeader('Allow', ['POST']);
      return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const {body} = req;

    const { threadId, message } = body;

    // Simulate a failure response some of the time in dev mode
    if (environment === 'dev') {
      const simulateResponseEndpoint = `${baseUrl}/api/simulate/failSomeOfTheTime`;

      const simulateResponse = await fetch(simulateResponseEndpoint);
      if (simulateResponse.status !== 200) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    }

    try {
      const responseObject = await generateResponse(
        openai,
        process.env.COLE_BOT_ID,
        threadId,
        message
      );
      res.status(200).json(responseObject);
    } catch (error) {
      console.error(error); // This will print any error that occurs
      res.status(400).json({ error: error.message }); // Return the error message in the response
    }
  });
}