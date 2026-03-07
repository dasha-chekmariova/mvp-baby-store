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
          content: "Ти розумний аналітик дитячого магазину. Користувач може писати запити з помилками (наприклад, 'каляска', 'ігрушка'). Твоє завдання - виправити помилки і повернути JSON з полями: 'category' (strollers, toys, clothing, feeding, hygiene, cribs, books, playmats або null), 'maxPrice' (число або null), 'color' (виправлений колір у називному відмінку або null), 'searchQuery' (інші слова для пошуку). ВАЖЛИВО: Якщо користувач пише назву бренду кирилицею (наприклад, 'лего', 'чіко', 'сайбекс', 'рейма'), обов'язково переклади її на оригінальну назву (LEGO, Chicco, Cybex, Anex, Fisher-Price, Carter's, Reima, Tiny Love, Skip Hop)."
        },
        { role: "user", content: query }
      ],
      response_format: { type: "json_object" },
      temperature: 0.1
    });

    const content = response.choices[0].message.content;
    const data = JSON.parse(content);
    console.log("🤖 ШІ розпізнав (з перекладом брендів):", data);
    return data;
  } catch (error) {
    console.error("AI Error:", error.message);
    return { category: null, maxPrice: null, color: null, searchQuery: query };
  }
};