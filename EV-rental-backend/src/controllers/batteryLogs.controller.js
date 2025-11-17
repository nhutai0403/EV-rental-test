const BatteryLog = require("../models/BatteryLog");
const { nextId } = require("../utils/idHelper");

exports.getAll = async (req, res) => {
  try {
    const docs = await BatteryLog.find().lean();
    res.json(docs);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const doc = await BatteryLog.findOne({ log_id: req.params.id }).lean();
    if (!doc) return res.status(404).json({ message: "Battery log not found" });
    res.json(doc);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.create = async (req, res) => {
  try {
    const data = req.body;
    data.log_id = data.log_id || (await nextId(BatteryLog, "l", "log_id"));
    const doc = await BatteryLog.create(data);
    res.status(201).json(doc);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.update = async (req, res) => {
  try {
    const doc = await BatteryLog.findOneAndUpdate(
      { log_id: req.params.id },
      req.body,
      { new: true }
    );
    if (!doc) return res.status(404).json({ message: "Battery log not found" });
    res.json(doc);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const doc = await BatteryLog.findOneAndDelete({ log_id: req.params.id });
    if (!doc) return res.status(404).json({ message: "Battery log not found" });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
