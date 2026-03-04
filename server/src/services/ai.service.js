import OpenAI from 'openai';

export const extractFiltersFromQuery = async (query) => {
const client = new OpenAI({
apiKey: process.env.OPENAI_API_KEY,
baseURL: "https://api.groq.com/openai/v1",
});

try {
const response = await client.chat.completions.create({
model: "llama-3.3-70b-versatile",
messages: [
{
role: "system",
content: "Ти аналітик магазину. Проаналізуй запит і поверни JSON з полями: 'category' (strollers, toys, clothing, feeding, hygiene, cribs, books, playmats або null), 'maxPrice' (максимальна ціна числом або null), 'color' (витягни колір і переклади у називний відмінок, вибери один із: червоний, синій, рожевий, сірий, бежевий, чорний, зелений, жовтий, білий АБО null, якщо не вказано), 'searchQuery' (будь-які інші слова для пошуку типу бренду або null)."
},
{ role: "user", content: query }
],
response_format: { type: "json_object" }
});

const content = response.choices[0].message.content;
const data = JSON.parse(content);
console.log("🤖 ШІ розпізнав:", data);
return data;
} catch (error) {
console.error("AI Error:", error.message);
return { category: null, maxPrice: null, color: null, searchQuery: query };
}
};