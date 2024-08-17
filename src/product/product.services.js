const prisma = require("../db")

const {
    deleteProduct,
    editProduct,
    insertProduct,
    findProducts,
    findProductById
} = require("../product/product.repository")

const getAllProducts = async ()=>{
    const products = await findProducts();

    return products; 
}

const getProductById = async()=>{
    const product = await findProductById(id);

    if(!product){
        throw Error("product gak ada");
    }
    return product;
};

const createProduct = async(newProductData)=>{
    const product = await insertProduct(newProductData);

    return product;
}

const deleteProductById = async(id,productdata)=>{
    await getProductById(id);

    const product = await deleteProduct(id,productdata);
    return product;
}

const editProductById = async(id,productdata)=>{
    await getProductById(id);
    const product = await editProduct(id,productdata);

    return product;
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    deleteProductById,
    editProductById
}