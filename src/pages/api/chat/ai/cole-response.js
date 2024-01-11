import OpenAI from 'openai';
import { generateResponse } from '../generate-response/generate-response';
import apiRequestOriginValidation from 'src/utils/api-request-origin-validation';

const openai = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY }); // Replace with your own API key

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    // If the request is not a POST, return 405 Method Not Allowed
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const originValid = apiRequestOriginValidation(req);
  if (!originValid) {
    // If the request does not pass the origin validation, return 403 Forbidden
    return res.status(403).json({ error: 'Invalid origin' });
  }

  const {body} = req;

  const { threadId, message } = body;

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
}