import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import contactRoutes from './routes/contactRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Allowed frontend origins
const allowedOrigins = [
  'https://shadow-techx.vercel.app',
  'http://localhost:3000',
  'http://localhost:5500'
];

// CORS
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

// Test route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'ShadowTech Backend API is running and connected to DB.'
  });
});

// Contact route
app.use('/contact', contactRoutes);

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch(err => console.error('❌ MongoDB Error:', err.message));

// Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
