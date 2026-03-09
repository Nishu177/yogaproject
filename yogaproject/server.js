const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

/* -------- MongoDB Atlas Connection -------- */

mongoose.connect("mongodb+srv://nisha:ekisha777@cluster0.uklak6o.mongodb.net/?appName=Cluster0")
.then(() => console.log("MongoDB Atlas Connected"))
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
