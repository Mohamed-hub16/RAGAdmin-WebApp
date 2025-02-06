import express from 'express';
import bodyParser from 'body-parser';
import { createUserTable } from './sqlite/users/createTable.js';
import { createMessagesTable } from './sqlite/messages/createTable.js';
import { createHistoricalTable } from './sqlite/historical/createTable.js';
import authRoutes from './routes/auth.js';
import chatsRoutes from './routes/chats.js';
import usersRoutes from './routes/users.js';
import historicalsRoutes from './routes/historicals.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/chats', chatsRoutes);
app.use('/api/user', usersRoutes);
app.use('/api/historicals', historicalsRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

// Initialize database tables
createUserTable();
createMessagesTable();
createHistoricalTable();

// Start server only if this file is run directly
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Serveur démarré sur http://localhost:${PORT}`);
    });
}

export default app;
