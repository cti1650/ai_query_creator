import { gpt } from "./util/chatgpt.js";

const args = process.argv.slice(2);

const request = args?.[0] ?? "I want to get dau for each workspace";

console.log("request", request);

console.log("response", await gpt(request));
