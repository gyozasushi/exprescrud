const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(__dirname, '../public/uploads');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const filename = Date.now() + path.extname(file.originalname); // Menambahkan timestamp ke nama file
    cb(null, filename);
  }
});

const upload = multer({ storage: storage });

const {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProductById,
  editProductById,
} = require("./product.services");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await getAllProducts();
    res.send(products);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = await getProductById(productId);
    res.send(product);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

router.post("/", upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: "No image file uploaded" });
    }

    const newProductData = {
      ...req.body,
      image: req.file.filename, // Simpan nama file atau path dalam database
    };

    const product = await createProduct(newProductData);

    res.status(201).send({
      data: product,
      message: "Product created successfully",
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});




router.delete("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);

    // Ambil data produk yang ada sebelum dihapus
    const product = await getProductById(productId);

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    // Hapus gambar dari folder jika ada
    if (product.image) {
      const filePath = path.join(uploadDir, product.image);
      console.log(`Attempting to delete file: ${filePath}`); // Debugging

      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log(`File deleted successfully: ${filePath}`);
        } else {
          console.warn(`File not found: ${filePath}`);
        }
      } catch (error) {
        console.error(`Error deleting file: ${error.message}`);
      }
    }

    // Hapus entri dari database
    await deleteProductById(productId);

    res.send({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error); // Log error untuk debugging
    res.status(500).send({ message: error.message });
  }
});


router.put("/:id", upload.single('image'), async (req, res) => {
  try {
    const productId = parseInt(req.params.id);

    // Ambil data produk yang ada sebelum diperbarui
    const existingProduct = await getProductById(productId);
    if (!existingProduct) {
      return res.status(404).send({ message: "Product not found" });
    }

    const updatedProductData = {
      ...req.body,
      // Gunakan nama file gambar yang ada jika tidak ada gambar baru yang diunggah
      image: req.file ? req.file.filename : existingProduct.image,
    };

    if (!(updatedProductData.description && updatedProductData.name && updatedProductData.price)) {
      return res.status(400).send({ message: "Some fields are missing" });
    }

    const updatedProduct = await editProductById(productId, updatedProductData);

    res.send({
      data: updatedProduct,
      message: "Product updated successfully",
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.patch("/:id", upload.single('image'), async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const productData = {
      ...req.body,
      image: req.file ? req.file.filename : null, // Menyimpan nama file di database
    };

    const product = await editProductById(productId, productData);

    res.send({
      data: product,
      message: "Product updated successfully",
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
