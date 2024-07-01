const express = require("express");
const app = express();
const pornhub = require('@justalk/pornhub-api');

// Define a route handler
app.get("/", async (req, res) => {
    try {
      
        const { RandomPHUB } = require('discord-phub'); //if you are on nodejs
        //If you want to generate unique media each time else set it to false (by default it's false)
        const nsfw = new RandomPHUB(unique = true);
        
        // console.log(nsfw.db); display all the database
        const rnd = nsfw.getRandom("gif");
        console.log(rnd.category);
        res.send("Success!"); // Sending a response when everything is okay
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error"); // Sending an error response if something goes wrong
    }
});

app.listen(9000, () => {
    console.log("Server is running on port 9000");
});


// https://npm.io/package/discord-phub
// const { RandomPHUB } = require('discord-phub'); //if you are on nodejs

// //If you want to generate unique media each time else set it to false (by default it's false)
// const nsfw = new RandomPHUB(unique = true);

// console.log(nsfw.db); //display all the database
// console.log(nsfw.db.all); //display all the links of the databases
// console.log(nsfw.categories); //display all the categories
// console.log(nsfw.type); //display all the type
// console.log(nsfw.totalElements); //display total elements in database
// console.log(nsfw.typesByCategorie) //display all available type by categories

// const verify = nsfw.verifyTypeInCategory("gif", "pussy"); //verify if a type is available in a categorie
// const pussy = nsfw.getRandomInCategory('pussy', "gif"); //will return a link to a pussy gif
// const pussy2 = nsfw.getRandomInCategory('pussy'); //will return a link to a pussy media 
// const rnd = nsfw.getRandom("gif"); //will return a link to a random media of any categorie with gif type
// const rnd2 = nsfw.getRandom(); //will return a link to a random media of any categorie with any type
// const cat = nsfw.getRandomCategory(); //will return a random category
// const type = nsfw.getRandomType(); //will return a random type

// console.log(rnd.type); //show the type of file
// console.log(rnd.category); //show the category of the media
// console.log(rnd.url); //show the link of the media