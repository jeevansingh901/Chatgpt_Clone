

//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
//apiKey:"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",

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 3080;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const OpenAI  = require("openai");

const openai = new OpenAI({
  
  apiKey:"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",
});
//

app.post("/", async (req, res) => {
  const { chats, model } = req.body;
  console.log(model);
  const response =await openai.completions.create({
    model: model,
    prompt: chats,
    max_tokens: 1000,
    temperature: 0.5,
  });
  res.json({chats:response.choices[0].text});
});


app.get("/", async (req, res) => {
  const response = await openai.models.list();


  res.json({ model: response.data.data});
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});