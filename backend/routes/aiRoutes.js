const express = require('express');
const router = express.Router();

async function callGemini(prompt, retries = 1) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
  });

  if (!response.ok) {
    const errText = await response.text();
    if (response.status === 503 && retries > 0) {
      await new Promise(r => setTimeout(r, 1500));
      return callGemini(prompt, retries - 1);
    }
    throw new Error(errText);
  }
  return response.json();
}

router.post('/advice', async (req, res) => {
  const { crop, problem } = req.body;
  if (!crop || !problem) {
    return res.status(400).json({ success: false, message: 'crop and problem are required' });
  }

  const prompt = `You are an agricultural advisor for Indian farmers. A farmer growing "${crop}" reports this problem: "${problem}". Give practical, concise advice (3-4 sentences) they can act on immediately. Avoid jargon.`;

  try {
    const data = await callGemini(prompt);
    const advice = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    res.status(200).json({ success: true, advice });
  } catch (err) {
    console.error('Gemini API error:', err.message);
    res.status(502).json({ success: false, message: 'AI service unavailable, please try again.' });
  }
});

module.exports = router;