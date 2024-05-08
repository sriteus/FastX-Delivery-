import express from "express";
import db from "../database/db";
import cors from "cors";

const router = express.Router();

router.get("/bigCategory", async (req, res) => {
  try {
    const query =
      "SELECT name,description,image from big_categories ORDER BY id ASC ";
    const result = await db(query);

    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing your request");
  }
});

router.get("/smallCat", async (req, res) => {
  try {
    const query =
      "SELECT small_categories.name,small_categories.description, small_categories.image,small_categories.price FROM big_categories JOIN small_categories ON big_categories.id = small_categories.big_category_id WHERE big_categories.name = $1;";
    const result = await db(query, [req.query.name]);

    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing your request");
  }
});

router.post("/addcart", async (req, res) => {
  try {
    const query =
      "INSERT INTO cart (userID, product, price, quantity)VALUES ($1, $2, $3, $4) RETURNING *;";
    await db(query, [
      req.body.userID,
      req.body.product,
      req.body.price,
      req.body.quantity,
    ]);
    res.json({
      success: true,
      message: "Added To Cart",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing your request");
  }
});

router.get("/getCart", async (req, res) => {
  try {
    const query =
      "SELECT small_categories.image, cart.product, cart.price, cart.quantity FROM cart JOIN small_categories ON small_categories.name = cart.product WHERE cart.userid = $1";
    const result = await db(query, [req.query.userID]);
    console.log(req.query.userID);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing your request");
  }
});
// router.options("/removeItem", cors());

router.delete("/removeItem", async (req, res) => {
  try {
    const query =
      "DELETE FROM cart WHERE userID = $1 AND product = $2 RETURNING *;";
    const result = await db(query, [req.query.userID, req.query.product]);

    if (result.rowCount > 0) {
      res.json({
        success: true,
        message: "Item removed from cart",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing your request");
  }
});

export default router;
