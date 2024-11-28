import express from 'express';
import bodyParser from 'body-parser';
import { createUserTable } from './sqlite/users/createTable.js';
import authRoutes from './routes/auth.js';

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);

createUserTable();

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
