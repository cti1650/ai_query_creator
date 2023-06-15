import axios from "axios";
import { configDotenv } from "dotenv";
import * as fs from "node:fs";

// require("dotenv").config();
export const gpt = async (request, option = {}) => {
  if (!request) return "";
  configDotenv();
  const apiKey = process.env.API_KEY;
  const apiUrl = "https://api.openai.com/v1/chat/completions";

  // Read prompts from file
  const prompt = fs.readFileSync("./prompts.txt", "utf-8");

  // Send API request
  const result = new Promise((resolve, reject) => {
    axios
      .post(
        apiUrl,
        {
          model: option?.model ?? "gpt-3.5-turbo-16k",
          messages: [
            { role: "system", content: prompt },
            { role: "user", content: request },
          ],
          temperature: 0.5,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      )
      .then((response) => {
        resolve(response.data.choices[0].message.content);
      })
      .catch((error) => {
        reject(error);
      });
  });
  return result;
};
