const openai = require('openai');

// Read the OpenAI API key from an environment variable
const apiKey = process.env.OPENAI_API_KEY;

// Check that the API key is set
if (!apiKey) {
  console.error("Please set the OPENAI_API_KEY environment variable.");
  process.exit(1);
}

// Set up OpenAI API credentials
openai.api_key = apiKey;

// Define the prompt to start the conversation
let prompt = "Hello, ChatGPT!";

// Define a function to send a message to ChatGPT and return its response
async function getResponse(prompt) {
  // Define the parameters for the OpenAI API request
  const completions = await openai.complete({
    engine: 'text-davinci-002',
    prompt: prompt,
    maxTokens: 1024,
    n: 1,
    stop: null,
    temperature: 0.5,
  });

  // Extract the first (and only) response from the API result
  const message = completions.choices[0].text.trim();

  return message;
}

// Define a function to record and capture responses from ChatGPT
async function chatWithGPT() {
  // Start the conversation with the initial prompt
  let message = await getResponse(prompt);
  console.log("ChatGPT: " + message);

  // Loop until the user enters "quit"
  while (true) {
    // Get the user's input
    const user_input = prompt("You: ");

    // If the user enters "quit", exit the loop
    if (user_input === "quit") {
      break;
    }

    // Append the user's input to the prompt
    prompt += "\n\nUser: " + user_input;

    // Get ChatGPT's response to the updated prompt
    message = await getResponse(prompt);

    // Append ChatGPT's response to the prompt
    prompt += "\n\nChatGPT: " + message;

    // Print ChatGPT's response
    console.log("ChatGPT: " + message);

    // Wait a moment to avoid rate-limiting issues
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

// Call the chatWithGPT function to start the conversation
chatWithGPT();