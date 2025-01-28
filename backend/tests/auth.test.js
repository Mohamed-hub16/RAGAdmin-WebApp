import request from 'supertest';
import { expect } from 'chai';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createUserTable } from '../sqlite/users/createTable.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import routes
import authRoutes from '../routes/auth.js';

// Setup test app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Initialize database
before(async () => {
    try {
        await createUserTable();
    } catch (err) {
        console.error('Error setting up test database:', err);
    }
});

// Setup routes
app.use('/api/auth', authRoutes);

describe('Authentication Tests', () => {
    const testUser = {
        identifiant: 'testuser' + Date.now(),
        password: 'testpassword123'
    };

    describe('POST /api/auth/register', () => {
        it('should register a new user successfully', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .send(testUser);
            
            expect(res.status).to.equal(201);
            expect(res.body).to.have.property('message', 'Utilisateur enregistré avec succès.');
        });

        it('should not allow duplicate registration', async () => {
            const duplicateUser = {
                identifiant: 'duplicate' + Date.now(),
                password: 'testpass123'
            };

            // First registration
            await request(app)
                .post('/api/auth/register')
                .send(duplicateUser);

            // Attempt duplicate registration
            const res = await request(app)
                .post('/api/auth/register')
                .send(duplicateUser);
            
            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('message', 'Utilisateur déjà enregistré.');
        });
    });

    describe('POST /api/auth/login', () => {
        const loginUser = {
            identifiant: 'loginuser' + Date.now(),
            password: 'loginpass123'
        };

        before(async () => {
            // Create a user for login tests
            await request(app)
                .post('/api/auth/register')
                .send(loginUser);
        });

        it('should login successfully with correct credentials', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send(loginUser);
            
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('user');
            expect(res.body.user).to.have.property('identifiant', loginUser.identifiant);
            // Le token n'est pas renvoyé dans la réponse actuelle
        });

        it('should fail with incorrect password', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    identifiant: loginUser.identifiant,
                    password: 'wrongpassword'
                });
            
            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('message', 'Mot de passe incorrect.');
        });

        it('should fail with non-existent user', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    identifiant: 'nonexistentuser' + Date.now(),
                    password: 'anypassword'
                });
            
            expect(res.status).to.equal(404);
            expect(res.body).to.have.property('message', 'Utilisateur introuvable.');
        });
    });
});
