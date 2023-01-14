import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix =
`
Suggest songs to listen to while reading a book with the given title that matches the mood of the book.

Title:
`

const generateAction = async (req, res) => {
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.8,
    max_tokens: 250,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  const secondPrompt = 
  `
  Take the songs suggested and along with them, include similar songs that also fit the mood of the book with the given title

  
  `
  

  const secondPromptCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${secondPrompt}`,

    temperature: 0.85,

    max_tokens: 1250,
  });
  

  const secondPromptOutput = secondPromptCompletion.data.choices.pop();


  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;