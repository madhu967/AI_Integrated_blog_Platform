async function main(prompt) {
  const apiKey = process.env.GEMINI_API_KEY;
  const modelsToTry = [
    "gemini-3.8-flash",
    "gemini-3.8-pro"
  ];

  const requestBody = {
    contents: [{ parts: [{ text: prompt }] }]
  };

  for (let model of modelsToTry) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    
    // Aggressive micro-retry loop for each model
    for (let attempt = 1; attempt <= 8; attempt++) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody)
        });

        if (response.ok) {
          const data = await response.json();
          if (data.candidates && data.candidates.length > 0) {
            return data.candidates[0].content.parts[0].text;
          }
          return "Could not generate content.";
        }

        if (response.status === 503) {
          console.log(`[Attempt ${attempt}] ${model} overloaded (503). Retrying in 1.5s...`);
          await new Promise(resolve => setTimeout(resolve, 1500));
          continue;
        }

        const errorData = await response.json();
        throw new Error(`Gemini API Error: ${response.status} - ${JSON.stringify(errorData)}`);
      } catch (error) {
        if (attempt === 8) throw error; // Give up on this model after 8 tries
      }
    }
  }
  
  throw new Error("All models are currently overloaded. Please wait a minute and try again.");
}

export default main;