import express from "express";
import db from "../database/db";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const pass = req.body.password;
    const hashPass = await bcrypt.hash(pass, 10);
    const query =
      "INSERT INTO users (name, email, mobile, password)VALUES ($1, $2, $3, $4) RETURNING *;";
    await db(query, [req.body.name, req.body.email, req.body.mobile, hashPass]);
    res.json({
      success: true,
      message: "Signup SUCCESS",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing your request");
  }
});

router.post("/login", async (req, res) => {
  try {
    const simplePass: string = req.body.password;
    const query: string = "SELECT * FROM users WHERE (email)=($1)";
    const result = await db(query, [req.body.email]);
    if (result[0] !== undefined) {
      const validPass = await bcrypt.compare(simplePass, result[0].password);

      if (validPass) {
        req.session.username = result[0].name;
        req.session.email = result[0].email;
        req.session.userId = result[0].id;

        res.json({
          success: true,
          message: "Login SUCCESS",
          user: result[0],
          Login: true,
        });
      } else {
        res.json({
          success: false,
          message: "Password is Incorrect",
          Login: false,
        });
      }
    } else {
      res.json({
        success: false,
        message: "Invalid Email ID",
        Login: false,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing your request");
  }
});
router.get("/", (req, res) => {
  console.log(req.session.username);
  if (req.session.username) {
    console.log("Session is on");
    return res.json({
      validUser: true,
      username: req.session.username,
      email: req.session.email,
      userId: req.session.userId,
    });
  } else {
    console.log("Session is OFFFF");
    return res.json({ validUser: false });
  }
});

export default router;
