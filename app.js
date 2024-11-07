import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({extended : true}));

// Home route to render form
app.get('/', (req, res) => {
    res.render('index.ejs', { joke: null, error: null });
});


app.post('/get-joke', async (req, res) => {
    const name = req.body.name;

    if(!name){
        return res.render('index.ejs', { joke: null, error: 'Please, enter your name!' });
    }

    try {
      // Fetch a joke from JokeAPI with a custom name
      const response = await axios.get('https://v2.jokeapi.dev/joke/Any?type=single');
      let joke = response.data.joke;
  
      // Replace placeholders in the joke with user's name
      //joke = joke.replace(/Chuck Norris/g, name);
  
      res.render('index.ejs', { joke, error: null });
    } catch (error) {
      console.error('Error fetching joke:', error);
      res.render('index.ejs', { joke: null, error: 'Error fetching joke, please try again.' });
    }
});
  

// Start Server
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});