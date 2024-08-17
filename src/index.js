const express = require("express");
const dotenv = require("dotenv");
const app = express();

dotenv.config();

const PORT = process.env.PORT;
app.use(express.json());

app.get("/api",(req,res)=>{

    res.send("selamat datang di api akuh");
    
});

//import productcontroller
const productController = require("./product/product.controller") 
app.use("/products",productController);


app.listen(PORT,()=>{
    console.log("express running in port " + PORT)
});
