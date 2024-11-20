import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

const google = createGoogleGenerativeAI({
  apiKey: "AIzaSyB7Tm_dLA_2fz-B0scrTjHtZ40O5e7U2RE",
});

let chatHistory = [];

export async function handleGenerateText(userInput) {
  try {
    chatHistory.push({ role: "user", content: userInput });
    const prompt = chatHistory
      .map((message) =>
        message.role === "user"
          ? `User: ${message.content}`
          : `AI: ${message.content}`
      )
      .join("\n");

    let { text } = await generateText({
      model: google("gemini-1.5-flash"),
      prompt: prompt,
      temperature: 0.1,
      system: "You are an expert in basketball, with deep knowledge of the game, its history, players, teams, strategies, and culture. Your responses should be informative, engaging, and accessible to both casual fans and more experienced basketball enthusiasts. You are able to explain complex basketball concepts in a clear and concise manner, and you can generate content on a wide range of basketball-related topics, including:",
      
    });
    chatHistory.push({ role: "ai", content: text });
    text = text.replace(/\*/g, "");
    return text;
  } catch (error) {
    console.error("Error fetching Gemini AI response:", error);
    return null;
  }
}
