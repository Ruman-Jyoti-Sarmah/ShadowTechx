import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import contactRoutes from './routes/contactRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

const allowedOrigins = [
  'https://shadow-tech-backend.onrender.com/api/contact',
  'https://shadow-techx.vercel.app', 
  'http://localhost:3000',
  'http://localhost:5500'
];


app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  })
);


// Routes
app.get('/', (req, res) => {
  res.status(200).json({ message: 'ShadowTech Backend API is running and connected to DB.' });
});

app.use('/api', contactRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch(err => {
    console.error('❌ MongoDB Connection Error:', err.message);
    console.error('URI:', process.env.MONGO_URI);
    // Don't exit—let the server run so we can debug
  });

// Start Server
app.listen(PORT, () => {
  console.log(` ShadowTech Backend Server running on http://localhost:${PORT}/`);
});
