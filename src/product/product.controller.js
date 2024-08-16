const express = require("express");
const prisma = require("../db");
const { getAllProduct } = require("./product.services");

const router = express.Router();

router.get("/",async (req,res)=>{
    const products = await getAllProduct();
    res.send(products);
});

router.get("/:id",async(req,res)=>{
    const productid = req.params.id;
    const product = await prisma.product.findUnique({
        where:{
            id :parseInt(productid),

        }
    }); 
    
    if(!product){
        return res.status(400).send("gaada produknya");
    }

    res.send(product);
});

router.post("/",async(req,res)=>{
    const newProductData = req.body;
    
    const product = await prisma.product.create({
        data:{
            name : newProductData.name,
            description : newProductData.description,
            image   :  newProductData.image,
            price   :  newProductData.price
        }, 
    });
    res.send({
        data:product,
        message:"ditambahkan coyy"
    })
});

router.delete("/:id",async(req,res)=>{
    const productid = req.params.id;

    await prisma.product.delete({
        where :{
            id : parseInt(productid),
        },
    });
    res.send("Product dihapus coyyyy")
});

router.put("/:id",async(req,res)=>{
    const productid  = req.params.id;
    const productdata = req.body;

    if(
        !(
            productdata.image && 
            productdata.name && 
            productdata.price && 
            productdata.description
        )){
        {
           return res.send("isilahh");
        }
    }

    const product = await prisma.product.update({
        where:{
            id:parseInt(productid)
        },data :    {
            description : productdata.description,
            name    :   productdata.name,
            image   :  productdata.image,
            price   :  productdata.price,
        }
    });
    res.send({
        data:product,
        message : "waduhh"
    })
});

router.patch("/:id",async(req,res)=>{
    const productid  = req.params.id;
    const productdata = req.body;

    const product = await prisma.product.update({
        where:{
            id:parseInt(productid)
        },data :    {
            description : productdata.description,
            name    :   productdata.name,
            image   :  productdata.image,
            price   :  productdata.price,
        }
    });
    res.send({
        data:product,
        message : "waduhh"
    })
});


module.exports = router;

