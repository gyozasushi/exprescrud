const prisma = require("../db");



//mencari product secara menyeluruh
const findProducts =  async()=>{
    const products = await prisma.product.findMany();

    return products;
};

//mencari product berdasarkan id 
const findProductById = async()=>{
    const product = await prisma.product.findUnique({
        where:{
            id,
        },
    });

    return product;
};

//memasukkan ke dalam db
const insertProduct = async(productdata)=>{
    const product = await prisma.product.create({
        data:{
            name:productdata.name,
            description:productdata.description,
            price:productdata.price,
            image:productdata.image,
        }
    });
    return product;
};

//delete product
const deleteProduct = async(id)=>{
    await prisma.product.delete({
        where:{
            id,
        },
    });
};

//edit product
const editProduct = async()=>{
    const product = await prisma.product.update({
        where:{
            id :parseInt(id),
        },
        data:{
            name:productdata.name,
            description:productdata.description,
            price:productdata.price,
            image:productdata.image,
        }
    });
    return product;
};

module.exports = {
    insertProduct,
    findProducts,
    findProductById,
    deleteProduct,
    editProduct
};