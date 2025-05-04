const Incident = require('../models/Incident');

exports.getAllIncidents = async (req, res) => {
  const incidents = await Incident.find().sort({ reported_at: -1 });
  res.status(200).json(incidents);
};

exports.getIncidentById = async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);
    if (!incident) return res.status(404).json({ message: 'Incident not found' });
    res.status(200).json(incident);
  } catch (err) {
    res.status(400).json({ message: 'Invalid ID format' });
  }
};

exports.createIncident = async (req, res) => {
  const { title, description, severity } = req.body;

  if (!title || !description || !severity) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (!['Low', 'Medium', 'High'].includes(severity)) {
    return res.status(400).json({ message: 'Invalid severity value' });
  }

  const incident = new Incident({ title, description, severity });
  await incident.save();
  res.status(201).json(incident);
};

exports.deleteIncident = async (req, res) => {
  try {
    const incident = await Incident.findByIdAndDelete(req.params.id);
    if (!incident) return res.status(404).json({ message: 'Incident not found' });
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ message: 'Invalid ID format' });
  }
};