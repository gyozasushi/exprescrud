const express = require("express");
const prisma = require("../db");
const { getAllProducts, getProductById, createProduct, deleteProductById, editProductById } = require("./product.services");

const router = express.Router();

router.get("/", async (req,res)=>{
    const products = await getAllProducts();
    
    res.send(products);
});

router.get("/:id",async(req,res)=>{
    try {
        const productById = parseInt(id);
        const product = await getProductById(parseInt(productid));
        
        res.send(product);
    }catch (err){
        res.status(400).send(err.message);
    }

});

router.post("/",async(req,res)=>{
    try{
        const newProductData = req.body;
        const product = await createProduct(newProductData);

        res.send({
            data:product,
            message : "berhasil ditambahkan coy"

        });
    }catch(error){
        res.status(400).send(error.message);
    }
});

router.delete("/:id",async(req,res)=>{
    try{
        const productId = req.params.id;

        await deleteProductById(parseInt(productId));
        res.send("ter hapus yahh");
    }
    catch(error){
        res.status(400).send(error.message);
    }
});

router.put("/:id",async(req,res)=>{
   const productId = req.params.id;
   const productData = req.body;

    if(
        !(
            productData.image &&
            productData.name &&
            productData.price &&
            productData.description
        )
    ){
        return res.status(400).send("gaboleh kosong");
    }
    const product = await editProductById(parseInt(productId),productData);

    res.send({
        data: product,
        message:"berhasil edit"
    });
});

router.patch("/:id",async(req,res)=>{
   try{
    const productId = req.params.id;
    const productData = req.body;

    const product = await editProductById(parseInt(productId),productData);

    res.send({
        data:product,
        message:"di edit yahh"
    })
   }catch(err){
    res.status(400).send(err.message);
   }
});


module.exports = router;

