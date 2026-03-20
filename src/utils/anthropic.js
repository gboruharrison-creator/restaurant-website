import { menuItems } from "../data/menuItems";

const menuSummary = menuItems.map((item) =>
  item.name + " (" + item.category + ", £" + item.price.toFixed(2) + ")" +
  (item.dietary.length ? " [" + item.dietary.join(", ") + "]" : "") +
  (item.spicy ? " [spicy]" : "") +
  " — " + item.description
).join("\n");

const SYSTEM_PROMPT = `You are a warm, knowledgeable food assistant for Gusto, an upscale Italian restaurant in London.

OUR FULL MENU:
${menuSummary}

YOUR ROLE:
- Help guests choose dishes based on their mood, dietary needs, taste preferences, or occasion
- Recommend 2-3 specific dishes from our menu with a brief explanation of why they suit the guest
- Be warm, enthusiastic, and make the food sound irresistible
- If someone mentions dietary requirements (vegan, vegetarian, gluten-free), only recommend suitable dishes
- Keep responses concise — 3-5 sentences max
- Always recommend dishes that are actually on our menu above
- End with an invitation to ask more questions or add items to their cart

STRICT RULES:
- Only discuss food, our menu, and dining experience
- Never recommend dishes not on the menu above
- If asked about something unrelated, politely redirect to the menu`;

export async function getAIRecommendation(messages) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 400,
      system: SYSTEM_PROMPT,
      messages: messages,
    }),
  });

  if (!response.ok) throw new Error("AI request failed");
  const data = await response.json();
  return data.content[0].text;
}