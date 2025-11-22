//Intialize Server
const express = require('express');
const User = require('./models/user');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const server = express();
const port = 3000;
require("dotenv").config();
const { DB_URI} = process.env;

//Middleware
server.use(cors()); 
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//Connections
mongoose
.connect(DB_URI)
    .then(() => {
        server.listen(port, () => {
            console.log(`Connected to DB\nServer is listening on port ${port}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });



//Routes
server.get('/', (request, response) => {
    response.send('Server is live!');
});


server.post('/register', async (request, response) => {
    const { username, password } = request.body;
    console.log(request.body);
    try {
        // Hashing the password need bcrypt and salt rounds as an int
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ 
            username, 
            password: hashedPassword 
        });
        await newUser.save();
        console.log(newUser);
        response.send({ message: 'User Created' });
    } catch (error) {
        response.status(500).json(error.message);
    }   

});

//Login exis 
server.post('/login', async (request, response) => {
    const { username, password } = request.body;
    if (!user){
        return response.status(404).json({ message: "User not found" });
    }
    try{
        const user = await User.findOne({ username });
        if (!user){
            return response.status(403).json({ message: "Incorrect password" });
        }
    }catch (error) {
        response.status(500).json(error.message);
    }
    
});