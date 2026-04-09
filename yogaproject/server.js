const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/nisha"));
mongoose.connect("mongodb+srv://nisha:ekisha777@cluster0.uklak6o.mongodb.net/yogaDB?retryWrites=true&w=majority")
.then(() => console.log("MongoDB Atlas Connected"))
.catch(err => console.log("MongoDB Error:", err));
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  program: String
});
const User = mongoose.model("User", userSchema);
app.get("/", (req, res) => {
  res.send("Server Working ✅");
});
app.post("/register", async (req, res) => {
  try {
    const { name, email, phone, program } = req.body;
    const newUser = new User({ name, email, phone, program });
    await newUser.save();
    res.send("Enrollment Successful 🎉");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});
app.get("/admin-data", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching data");
  }
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});







