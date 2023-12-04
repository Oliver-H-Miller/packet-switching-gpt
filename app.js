const OpenAI = require('openai')
const express = require('express')
const app = express()
const path = require('path')
const PORT = 4000

app.use('/static', express.static(path.join(__dirname, 'static')))

app.get('/', (req, res) => {
    // send redirect to index.html
    res.redirect('/static/index.html');
})

app.get('/gpt', async (req, res) => {
    /* DO NOT PUBLISH */
    const OPEN_AI_API_KEY = "REDACTED";
    // const OPEN_AI_API_KEY = req.query.key;
    // // validate key
    // if (!OPEN_AI_API_KEY || (OPEN_AI_API_KEY.length > 55 || OPEN_AI_API_KEY.length < 45)) {
    //     res.status(400).json('Invalid API Key');
    //     return;
    // }
    // create gpt instance
    const gpt = new OpenAI({apiKey: OPEN_AI_API_KEY});
    const chatCompletion = await gpt.chat.completions.create({
        messages: [
            {
              role: "system",
              content: "You are a helpful assistant designed to output JSON.",
            },
            { role: "user", content: "Who won the world series in 2020?" },
          ],
          model: "gpt-3.5-turbo-1106",
          response_format: { type: "json_object" },      
    });
    res.status(200).json(chatCompletion);
})

app.get('/test', (req, res) => {
    res.status(200).json('test');
})


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

// Export the Express API
module.exports = app