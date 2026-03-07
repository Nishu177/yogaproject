const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));
/* -------- MongoDB Connection -------- */

mongoose.connect("mongodb://127.0.0.1:27017/yogaDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

/* -------- Schema -------- */

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  program: String
});

const User = mongoose.model("User", userSchema);

/* -------- Home Route -------- */

app.get("/", (req, res) => {
  res.send("Server Working ✅");
});

/* -------- Register (Enroll Form) -------- */

app.post("/register", async (req, res) => {

  try {

    const { name, email, phone, program } = req.body;

    const newUser = new User({
      name,
      email,
      phone,
      program
    });

    await newUser.save();

    res.send("Enrollment Successful 🎉");

  } catch (error) {

    console.log(error);
    res.status(500).send("Server Error");

  }

});

/* -------- Server Start -------- */

app.listen(5000, () => {
  console.log("Server running on port 5000");
});