const express = require('express');
const connectDB = require('./config/db');
const incidentRoutes = require('./routes/incidentRoutes');
const dotenv = require('dotenv');
const app = express();

dotenv.config();
connectDB();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the AI Safety Incident Log API');
});

app.use('/incidents', incidentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));