// const { GoogleGenerativeAI } = require('@google/generative-ai');
import { GoogleGenerativeAI } from "@google/generative-ai";




const processChatRequest = async (req, res) => {
  console.log('Received chat request');
  console.log(process.env.GEMINI_API_KEY);
  const generativeAI = new GoogleGenerativeAI("AIzaSyBwH17XSxD-hSXm38SpOaMVoH7QsY9bn_8");
  // const model = generativeAI.getGenerativeModel({ model: "gemini-1.5-flash" });


  try {
    const { message } = req.body;
    console.log('User message:', message);

    // Validate the message
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Get the generative model
    const model = generativeAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generate content based on the user message
    const result = await model.generateContent(message);
    const response = await result.response;

    // Send the generated response back to the client
    res.status(200).json({ response: response.text() });
  } catch (error) {
    console.error('Error processing chat request:', error);
    res.status(500).json({ error: 'Failed to process chat request' });
  }
};


export default processChatRequest;