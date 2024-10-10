const express = require("express");
const cors = require("cors");
const app = express();


require('dotenv').config();
const dbConfig = require("./config/dbConfig")
const PORT = process.env.PORT || 3001 

const userRoute = require("./routes/userRoutes");
const projectRoute = require("./routes/projectRoutes")
const episodeRoute = require("./routes/episodeRoutes")

app.use(cors());


app.use(express.json());
app.use('/api/user', userRoute);
app.use('/api/project',projectRoute)
app.use('/api/episode',episodeRoute)
app.listen(PORT,()=>{
    console.log(`server is running ${PORT}`)
})