import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { startMongoDatabase } from './lib/mongodb.js';
import routes from './routes/index.route.js';
import logger from './lib/logger.js';

// Initiate server and database
dotenv.config();
startMongoDatabase();
const app = express();

// Set Up Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,POST',
}));

// Set Up Routes
app.use('/api/v1/ticket', routes.ticket);
app.use('/api/v1/user', routes.user);


// Set Port and Listen
const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}.`);
});

