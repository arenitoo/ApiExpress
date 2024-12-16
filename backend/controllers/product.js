const { v4: uuidv4 } = require('uuid');
const { Product } = require('../models')
const { body, validationResult } = require('express-validator');
const redis = require('../config/redisClient');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });


/**
* @swagger
 * /products:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do produto
 *               price:
 *                 type: number
 *                 description: Preço do produto
 *               productImage:
 *                 type: string
 *                 format: binary
 *                 description: Imagem do produto (upload)
 *     responses:
 *       201:
 *         description: Produto em processamento
 *       400:
 *         description: Erro de validação de dados
 *       500:
 *         description: Erro no servidor
 */
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body)
    await redis.del('products:list');
    console.log("invalidado cache de produtos");
    return res.status(201).json(
      product
    )
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}


/**
 * @swagger
 * /products:
 *   get:
 *     summary: Obtém todos os produtos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de produtos
 *       500:
 *         description: Erro no servidor
 */
const getAllProducts = async (req, res) => {
  try {
    const cacheKey = 'products:list';
    const cacheData = await redis.get(cacheKey);
    if (cacheData) {
      console.log('Dados do cache de produto obtidos');
      return res.status(200).json(JSON.parse(cacheData));
    }
    const products = await Product.findAll({ order: [['createdAt', 'DESC']] })

    // Salva em cache por 1 hora
    await redis.set(cacheKey, JSON.stringify(products), 'EX', 3600);
    console.log('Dados do produtos armazenados em cache');
    return res.status(200).json( products )
  } catch (error) {
    return res.status(500).send(error.message)
  }
}
/**
* @swagger
 * /products/{id}:
 *   get:
 *     summary: Obtém um produto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do produto
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Produto encontrado
 *       404:
 *         description: Produto não encontrado
 *       500:
 *         description: Erro no servidor
 */
const getProductById = async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findOne({
      where: { id: id }
    })

    if (product) {
      return res.status(200).json( product )
    }

    return res.status(404).send('Product with the specified ID does not exist')
  } catch (error) {
    return res.status(500).send(error.message)
  }
}
/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Atualiza um produto existente
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do produto
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do produto
 *               price:
 *                 type: number
 *                 description: Preço do produto
 *               productImage:
 *                 type: string
 *                 description: URL da imagem do produto
 *     responses:
 *       202:
 *         description: Produto em atualização
 *       400:
 *         description: Erro de validação de dados
 *       500:
 *         description: Erro no servidor
 */
const updateProductById = async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.update(req.body, {
      where: { id: id }
    })

    if (product) {
      const updatedProduct = await Product.findOne({ where: { id: id } })
      await redis.del('products:list');
      console.log("invalidado cache de produtos");
      return res.status(200).json(updatedProduct)
    }
    throw new Error('product not found')
  } catch (error) {
    return res.status(500).send(error.message)
  }
}


/**
* @swagger
 * /products/{id}:
 *   delete:
 *     summary: Deleta um produto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do produto
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Produto deletado com sucesso
 *       404:
 *         description: Produto não encontrado
 *       500:
 *         description: Erro no servidor
 */
const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params

    const deletedProduct = await Product.destroy({
      where: { id: id }
    })

    if (deletedProduct) {
      await redis.del('products:list');
      console.log("invalidado cache de produtos");
      return res.status(204).send('Product deleted successfully ')
    }

    throw new Error('Product not found')
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProductById,
  updateProductById
}