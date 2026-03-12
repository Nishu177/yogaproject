const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* -------- Middleware -------- */
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/nisha"));

/* -------- MongoDB Atlas Connection -------- */
// Make sure you have added your Atlas URI as Render Environment Variable named DATABASE_URL
mongoose.connect(process.env.DATABASE_URL || "mongodb+srv://nisha:ekisha777@cluster0.uklak6o.mongodb.net/yogaDB?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB Atlas Connected"))
.catch(err => console.log("MongoDB Connection Error:", err));

/* -------- Schema -------- */
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    program: String
});

const User = mongoose.model("User", userSchema);

/* -------- Routes -------- */
app.get("/", (req, res) => {
    res.send("Server Working ✅");
});

app.post("/register", async (req, res) => {
    try {
        const { name, email, phone, program } = req.body;

        const newUser = new User({ name, email, phone, program });
        await newUser.save();

        res.status(200).send("Enrollment Successful 🎉");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

app.get("/admin-data", async (req, res) => {
  try {
    const data = await Enrollment.find();
    res.json(data);
  } catch (err) {
    res.status(500).send("Error fetching data");
  }
});
/* -------- Start Server -------- */
// Use the port provided by Render or default 5000 locally
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});





