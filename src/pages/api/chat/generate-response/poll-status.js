async function pollStatus(openai, threadId, runId, pollingInterval) {
  let run;

  try {
    run = await openai.beta.threads.runs.retrieve(threadId, runId);
  } catch (error) {
    console.error('Error retrieving run status:', error);
    throw error; // Re-throw the error to be caught by the try...catch in generateResponse.
  }

  console.log(`Polling... Run status: ${run.status}`);

  // Handle terminal states immediately.
  if (run.status === 'completed') {
    console.log('Run completed');
    return 'completed';
  } else if (run.status === 'failed') {
    console.log('Run failed');
    return 'failed';
  }

  // If the status is not terminal, wait before polling again.
  await new Promise((resolve) => setTimeout(resolve, pollingInterval));

  // Recursively call the function and return its result.
  return await pollStatus(openai, threadId, runId, pollingInterval);
}

export default pollStatus;
