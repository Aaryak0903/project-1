const express = require("express");
const router = express.Router();
const Complaint = require("../models/Complaint");

// Create
router.post("/", async (req, res) => {
    const complaint = new Complaint(req.body);
    await complaint.save();
    res.json(complaint);
});

// Read
router.get("/", async (req, res) => {
    const data = await Complaint.find().sort({ date: -1 });
    res.json(data);
});

// Update
router.put("/:id", async (req, res) => {
    const updated = await Complaint.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true }
    );
    res.json(updated);
});

module.exports = router;