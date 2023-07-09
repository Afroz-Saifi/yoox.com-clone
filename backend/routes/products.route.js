const express = require("express");
const { getAllProcucts, getSoloProcuct } = require("../controller/product.controller");

const productsRouter = express.Router();

/**
 * @swagger
 * components: 
 *  schemas:
 *      Product:
 *          type: object
 *          properties: 
 *              image:
 *                  type: string
 *                  description: product image
 *              brand:
 *                  type: string
 *                  description: product brand
 *              microcategory:
 *                  type: string
 *                  description: product microcategory
 *              oldprice:
 *                  type: string
 *                  description: product old price
 *              off:
 *                  type: string
 *                  description: product discount off
 *              newprice:
 *                  type: integer
 *                  description: product latest price
 *              category:
 *                  type: string
 *                  description: product category
 *              size: 
 *                  type: string
 *                  description: product size
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get products
 *     tags: [Products]
 *     description: Get all the products that are saven in the database.
 *     responses:
 *       '200':
 *         description: User is registered successfully.
 *         content: 
 *           application/json:
 *              schema: 
 *                  type: array
 *                  items: 
 *                      $ref: '#components/schemas/Product'
 */
productsRouter.get("/", getAllProcucts);

/**
 * @swagger
 * /products/{id}:
 *  get:
 *      summary: Get product
 *      tags: [Products]
 *      description: Get the selected product by id.
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id of the product
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          '200':
 *              description: Product got successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/Product'
 */
productsRouter.get("/:id", getSoloProcuct);

module.exports = { productsRouter };
