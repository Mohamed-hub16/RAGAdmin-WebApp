import request from 'supertest';
import { expect } from 'chai';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createMessagesTable } from '../sqlite/messages/createTable.js';
import { createHistoricalTable } from '../sqlite/historical/createTable.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import routes
import chatsRoutes from '../routes/chats.js';

// Setup test app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Initialize database
before(async () => {
    try {
        await createMessagesTable();
        await createHistoricalTable();
    } catch (err) {
        console.error('Error setting up test database:', err);
    }
});

// Setup routes
app.use('/api/chats', chatsRoutes);

describe('Chat Tests', () => {
    let historicalId;

    describe('POST /api/chats', () => {
        it('should create a new chat successfully', async () => {
            const res = await request(app)
                .post('/api/chats')
                .send({ userId: 1 });
            
            expect(res.status).to.equal(201);
            expect(res.body).to.have.property('message', 'Nouveau chat créé avec succès.');
            expect(res.body).to.have.property('chat');
            expect(res.body.chat).to.have.property('id');
            historicalId = res.body.chat.id;
        });
    });

    describe('POST /api/chats/messages', () => {
        it('should send a message successfully', async () => {
            const res = await request(app)
                .post('/api/chats/messages')
                .send({
                    historicalId: historicalId,
                    sender: 'user',
                    content: 'Test message ' + Date.now()
                });
            
            expect(res.status).to.equal(201);
            expect(res.body).to.have.property('message', 'Message ajouté avec succès.');
        });

        it('should fail when content is empty', async () => {
            const res = await request(app)
                .post('/api/chats/messages')
                .send({
                    historicalId: historicalId,
                    sender: 'user',
                    content: ''
                });
            
            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('error', 'Tous les champs sont obligatoires.');
        });
    });

    describe('GET /api/chats/:historicalId/messages', () => {
        before(async () => {
            // Add some test messages
            const messages = [
                {
                    content: 'Test message 1 ' + Date.now(),
                    sender: 'user'
                },
                {
                    content: 'Test message 2 ' + Date.now(),
                    sender: 'user'
                },
                {
                    content: 'Test message 3 ' + Date.now(),
                    sender: 'user'
                }
            ];

            for (const msg of messages) {
                await request(app)
                    .post('/api/chats/messages')
                    .send({
                        historicalId: historicalId,
                        ...msg
                    });
            }
        });

        it('should retrieve chat history', async () => {
            const res = await request(app)
                .get(`/api/chats/${historicalId}/messages`);
            
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.be.at.least(3);
            expect(res.body[0]).to.have.property('text');
            expect(res.body[0]).to.have.property('sender');
            expect(res.body[0]).to.have.property('sentAt');
        });

        it('should return messages in chronological order', async () => {
            const res = await request(app)
                .get(`/api/chats/${historicalId}/messages`);
            
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
            
            // Verify timestamps are in ascending order
            const timestamps = res.body.map(msg => new Date(msg.sentAt).getTime());
            const sortedTimestamps = [...timestamps].sort((a, b) => a - b);
            expect(timestamps).to.deep.equal(sortedTimestamps);
        });
    });
});
