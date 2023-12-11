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
    /* DO NOT PUBLISH */
    const OPEN_AI_API_KEY = req.body.key;
    // const OPEN_AI_API_KEY = req.query.key;
    // // validate key
    // if (!OPEN_AI_API_KEY || (OPEN_AI_API_KEY.length > 55 || OPEN_AI_API_KEY.length < 45)) {
    //     res.status(400).json('Invalid API Key');
    //     return;
    // }
    // create gpt instance

    /* Incoming request looks like this:
            fetch('/gpt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    command: command,
                    context: state[mapping[src]]
                })
            })
    */

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