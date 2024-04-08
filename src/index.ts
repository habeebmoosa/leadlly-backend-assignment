import express from 'express';

const app = express();
const PORT = 3020;

app.get("/", (req, res)=>{
    try {
        res.status(200).json({"message":"Hello"});
    } catch (error) {
        
    }
})


app.listen(PORT, ()=> console.log(`Server is running on http://localhost:${PORT}`))