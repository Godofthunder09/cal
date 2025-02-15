const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/cryptoDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const CryptoSchema = new mongoose.Schema({
    crypto: String,
    amount: Number,
    usdValue: Number,
    date: { type: Date, default: Date.now }
});

const CryptoModel = mongoose.model("Crypto", CryptoSchema);

app.post("/save-calculation", async (req, res) => {
    try {
        const newCalculation = new CryptoModel(req.body);
        await newCalculation.save();
        res.status(201).json({ message: "Saved Successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to save!" });
    }
});

app.get("/history", async (req, res) => {
    const history = await CryptoModel.find();
    res.json(history);
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
