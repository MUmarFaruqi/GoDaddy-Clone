
import { GoogleGenAI, Type } from "@google/genai";
import { Domain } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getDomainSuggestions = async (keyword: string): Promise<Domain[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Suggest 5 professional and brandable domain names related to the keyword: "${keyword}". 
      Vary the TLDs (e.g., .com, .net, .io, .ai, .tech). 
      Provide a reason why it's a good choice.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              tld: { type: Type.STRING },
              price: { type: Type.NUMBER },
              isPremium: { type: Type.BOOLEAN },
              reason: { type: Type.STRING },
            },
            required: ["name", "tld", "price", "isPremium", "reason"]
          }
        }
      }
    });

    const suggestions = JSON.parse(response.text || "[]");
    return suggestions.map((s: any) => ({
      ...s,
      available: true,
      renewalPrice: s.price * 1.2
    }));
  } catch (error) {
    console.error("Gemini Error:", error);
    return [];
  }
};

export const checkDomainAvailability = async (query: string): Promise<Domain> => {
    // We'll simulate checking availability for the exact query
    // and use Gemini to provide an "AI Brand Review"
    const parts = query.split('.');
    const name = parts[0] || query;
    const tld = parts[1] || 'com';

    // Mock logic: names with 'god' or 'apple' are taken
    const takenKeywords = ['god', 'apple', 'google', 'microsoft', 'amazon', 'facebook'];
    const isTaken = takenKeywords.some(kw => name.toLowerCase().includes(kw));

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Evaluate the domain name "${name}.${tld}" as a brand. Is it catchy? Is it professional? Suggest its potential value.`,
    });

    return {
        name,
        tld: `.${tld}`,
        available: !isTaken,
        price: isTaken ? 0 : (name.length < 5 ? 49.99 : 11.99),
        renewalPrice: isTaken ? 0 : 15.99,
        reason: response.text
    };
};
