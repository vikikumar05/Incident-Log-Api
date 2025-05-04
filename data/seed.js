const connectDB = require('../config/db');
const Incident = require('../models/Incident');

const seedIncidents = async () => {
  await connectDB();
  await Incident.deleteMany();

  const sampleData = [
    {
      title: 'AI Misidentified Object',
      description: 'AI system flagged a human as a threat in a security app.',
      severity: 'High'
    },
    {
      title: 'Biased Recommendation',
      description: 'AI suggested biased job listings favoring one gender.',
      severity: 'Medium'
    },
    {
      title: 'Incorrect Translation',
      description: 'AI translation led to diplomatic misunderstanding.',
      severity: 'Low'
    }
  ];

  await Incident.insertMany(sampleData);
  console.log('Sample incidents inserted.');
  process.exit();
};

seedIncidents();