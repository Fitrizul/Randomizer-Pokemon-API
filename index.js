//Import Modules
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
//Initialize API URL
const API_URL = "https://pokeapi.co/api/v2/pokemon";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//Page display
app.get("/", (req, res) => {
    
    res.render("index.ejs");
});

//Make a request to get respond from PokeAPI
app.post("/random", async (req, res) => {
    try {
        const random = Math.floor(Math.random() * 1025);
        const result = await axios.get(API_URL + "/"+ random);
        res.render("index.ejs", { pokemon: result.data });
    } catch (error) {
        console.error("Error fetching Pokemon data:", error.message);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(port, () => {
    console.log("Server running on port" + port);
})