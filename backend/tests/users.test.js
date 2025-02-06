import request from 'supertest';
import { expect } from 'chai';
import app from '../app.js';
import { createUserTable } from '../sqlite/users/createTable.js';

describe('Users Tests', () => {
    let userId;
    const testUser = {
        identifiant: 'testuser' + Date.now(),
        password: 'testpass123'
    };

    before(async () => {
        try {
            await createUserTable();
            // Create a test user
            const res = await request(app)
                .post('/api/auth/register')
                .send(testUser);
            userId = res.body.user.id;
        } catch (err) {
            console.error('Error setting up test database:', err);
        }
    });

    describe('Authentication Tests', () => {
        describe('POST /api/auth/register', () => {
            it('should register a new user successfully', async () => {
                const newUser = {
                    identifiant: 'newuser' + Date.now(),
                    password: 'newpass123'
                };
                
                const res = await request(app)
                    .post('/api/auth/register')
                    .send(newUser);
                
                expect(res.status).to.equal(201);
                expect(res.body).to.have.property('message', 'Utilisateur enregistré avec succès.');
                expect(res.body.user).to.have.property('identifiant', newUser.identifiant);
                expect(res.body.user).to.have.property('id');
            });

            it('should not register a user with existing identifiant', async () => {
                const res = await request(app)
                    .post('/api/auth/register')
                    .send(testUser);
                
                expect(res.status).to.equal(400);
                expect(res.body).to.have.property('message', 'Utilisateur déjà enregistré.');
            });
        });

        describe('POST /api/auth/login', () => {
            it('should login successfully with correct credentials', async () => {
                const res = await request(app)
                    .post('/api/auth/login')
                    .send(testUser);
                
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('user');
                expect(res.body.user).to.have.property('identifiant', testUser.identifiant);
            });

            it('should fail with incorrect password', async () => {
                const res = await request(app)
                    .post('/api/auth/login')
                    .send({
                        identifiant: testUser.identifiant,
                        password: 'wrongpassword'
                    });
                
                expect(res.status).to.equal(400);
                expect(res.body).to.have.property('message', 'Mot de passe incorrect.');
            });

            it('should fail with non-existent user', async () => {
                const res = await request(app)
                    .post('/api/auth/login')
                    .send({
                        identifiant: 'nonexistentuser',
                        password: 'anypassword'
                    });
                
                expect(res.status).to.equal(404);
                expect(res.body).to.have.property('message', 'Utilisateur introuvable.');
            });

        });
    });

    describe('GET /api/user/:userId', () => {
        it('should get user by id', async () => {
            const res = await request(app)
                .get(`/api/user/${userId}`);
            
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('user');
            expect(res.body.user).to.have.property('id', userId);
            expect(res.body.user).to.not.have.property('password');
        });

        it('should return 404 for non-existent user', async () => {
            const res = await request(app)
                .get('/api/user/99999');
            
            expect(res.status).to.equal(404);
            expect(res.body).to.have.property('message', 'Utilisateur introuvable.');
        });
    });
});
