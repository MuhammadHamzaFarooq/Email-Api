const express = require('express');
const app = express();
const cors = require('cors');
// Global Middleware
app.use(express.json());
app.use(cors());
const ngrok = require('ngrok');
(async function() {
  const url = await ngrok.connect();

  console.log(url)
})();


const PORT = process.env.PORT || 8000;

app.get("/",(req,res)=>{
    res.send("Welcome in Matrix ptv LTD");
});


app.post('/contact',(req,res)=>{
    res.send({
        message: "Check your email",
        details:req.body
    });
});


app.listen(PORT,()=>{
    console.log(`Server is up on running on port ${PORT}`);
});