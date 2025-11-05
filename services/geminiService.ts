
import { GoogleGenAI } from "@google/genai";
import type { OrganizationPlan } from '../types';

// Read the API key from Vite environment variable. Do NOT hardcode keys in source.
const API_KEY: string = (import.meta.env.VITE_GEMINI_API_KEY as string) || '';

if (!API_KEY) {
  throw new Error("VITE_GEMINI_API_KEY not set. Configure it in .env.local as VITE_GEMINI_API_KEY=YOUR_KEY");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function organizeFilesByPrefix(fileNames: string[]): Promise<OrganizationPlan> {
  const model = 'gemini-2.5-flash';

  const prompt = `
    You are an expert file organization assistant. I will provide a list of filenames. Your task is to group them by common prefixes. The prefix should be a meaningful name for a new folder.

    Rules:
    1.  Only group files that share a common prefix with at least one other file.
    2.  A common prefix is usually the part of the name before a number, episode, or other differentiator. For example, in "Series Name S01E01.mkv" and "Series Name S01E02.mkv", the prefix is "Series Name S01".
    3.  Ignore files that are unique and cannot be grouped.
    4.  Your response MUST be a valid JSON object.
    5.  The JSON object should be a map where the key is the suggested new folder name (the common prefix) and the value is an array of filenames that belong in that folder.
    6.  The format should be: { [newFolderName: string]: string[] }

    Example Input:
    ["Kingdom 6th Season Episodio 1.mkv", "Kingdom 6th Season Episodio 2.mkv", "video 1.mp4", "video 2.mp4", "random_file.txt", "document.pdf"]

    Example Output:
    {
      "Kingdom 6th Season": ["Kingdom 6th Season Episodio 1.mkv", "Kingdom 6th Season Episodio 2.mkv"],
      "video": ["video 1.mp4", "video 2.mp4"]
    }

    Here is the list of files to process:
    ${JSON.stringify(fileNames)}
  `;

  try {
    const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
        }
    });
    
    const text = response.text;
    // Sometimes the model wraps the JSON in markdown backticks, so we clean it.
    const cleanedJson = text.replace(/^```json\n?/, '').replace(/\n?```$/, '');
    
    const plan = JSON.parse(cleanedJson) as OrganizationPlan;

    // Additional check to ensure the response format is correct
    if (typeof plan !== 'object' || plan === null || Array.isArray(plan)) {
      throw new Error("AI response is not a valid JSON object.");
    }

    // Filter out any files from the plan that were not in the original list
    const originalFileSet = new Set(fileNames);
    const validatedPlan: OrganizationPlan = {};
    for (const folder in plan) {
        const filesInFolder = plan[folder].filter(file => originalFileSet.has(file));
        if(filesInFolder.length > 0) {
            validatedPlan[folder] = filesInFolder;
        }
    }

    return validatedPlan;
  } catch (error) {
    console.error("Error calling AI service:", error);
    throw new Error("Failed to get a valid organization plan from the AI.");
  }
}
   