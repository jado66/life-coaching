import { setCorsHeaders } from 'src/utils/middlware/cors';
import { createThread } from '../create-thread/create-thread';
import { retrieveAssistant } from '../retrieve-assistant';
import pollStatus from './poll-status';

export const generateResponse = async (openai, assistantId, threadId, userMessage) => {

  try {
    if (!threadId) {
      const thread = await createThread(openai);
      threadId = thread.id;
      console.log('Thread: ', JSON.stringify(thread));
    }

    const assistant = await retrieveAssistant(openai, assistantId);

    console.log('Assistant: ', assistant.id);

    // Pass in the user question into the existing thread
    await openai.beta.threads.messages.create(threadId, {
      role: 'user',
      content: userMessage,
    });

    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: assistant.id,
    });

    console.log('Run: ', run.id);

    // Wait until the run is finished before moving on.
    const status = await pollStatus(openai, threadId, run.id, 500);

    // Check for a successful completion of the run.
    if (status !== 'completed') {
      throw new Error(`The run did not complete successfully. Run status: ${status}`);
    }

    // Get the last assistant message from the messages array
    const messages = await openai.beta.threads.messages.list(threadId);

    console.log('Messages: ', JSON.stringify(messages));

    // Find the last message for the current run
    const lastMessageForRun = messages.data
      .filter((message) => message.run_id === run.id && message.role === 'assistant')
      .pop();

    if (lastMessageForRun) {
      const lastMessage = lastMessageForRun.content[0].text.value;

      return {
        message: lastMessage,
        threadId,
      };
    }

    return 'No message found';
  } catch (error) {
    console.error(error); // this will print any error that occurs
    return error.message; // Return a more appropriate value, such as the error message.
  }
 
};
