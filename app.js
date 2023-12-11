const OpenAI = require('openai')
const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const PORT = 4000

app.use(cors())
app.use('/static', express.static(path.join(__dirname, 'static')))
app.use(express.json({type: '*/*'}));
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
    // send redirect to index.html
    res.redirect('/static/index.html');
})

app.post('/gpt', async (req, res) => {
    const OPEN_AI_API_KEY = req.body.key;

    const gpt = new OpenAI({apiKey: OPEN_AI_API_KEY});
    const chatCompletion = await gpt.chat.completions.create({
        messages: [
            {
              role: "system",
              content: req.body.context,
            },
            { role: "user", content: req.body.command },
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