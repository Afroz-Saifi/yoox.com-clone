const express = require("express");
const {
  add_to_bag,
  get_bags,
  delete_bag,
} = require("../controller/bag.controller");

const bagRouter = express.Router();

/**
 * @swagger
 * components: 
 *  schemas:
 *      Bag:
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
 *              userId:
 *                  type: string
 *                  description: user's id for establishing relationship
 */

/**
 * @swagger
 * /bag/add:
 *  post:
 *    summary: Add to bag
 *    tags: [Bag]
 *    description: Add this particular product in the user's bag account
 *    responses: 
 *      '200':
 *        description: Product added to bag successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#components/schemas/Bag'
 */

bagRouter.post("/add", add_to_bag);

/**
 * @swagger
 * /bag:
 *  get:
 *    summary: Get bag products
 *    tags: [Bag]
 *    description: Get all the products added in the user's bag.
 *    responses: 
 *      '200':
 *        description: Products got successfully.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items: 
 *                type: object
 *                $ref: '#components/schemas/Bag'
 */
bagRouter.get("/", get_bags);

/**
 * @swagger
 * /bag/delete{id}:
 *  delete:
 *    summary: Delete from bag
 *    tags: [Bag]
 *    description: Delete the product from the user's bag.
 *    parameters: 
 *      - name: id
 *        in: path
 *        description: id of the product that needs to be removed from the bag.
 *        required: true
 *        schema:
 *          type: string
 *    responses: 
 *      '200':
 *        description: Product deleted successfully.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items: 
 *                type: object
 *                $ref: '#components/schemas/Bag'
 */
bagRouter.delete("/delete/:id", delete_bag);

module.exports = { bagRouter };
