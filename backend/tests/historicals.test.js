import request from 'supertest';
import { expect } from 'chai';
import app from '../app.js';
import { createHistoricalTable } from '../sqlite/historical/createTable.js';
import { addHistorical } from '../sqlite/historical/addHistorical.js';
import { getHistoricalsByUserId } from '../sqlite/historical/getHistoricalsByUserId.js';

describe('Historicals Tests', () => {
    let userId = 1;
    let historicalId;

    before(async () => {
        try {
            await createHistoricalTable();
            // Créer quelques historiques pour les tests
            historicalId = await addHistorical(userId);
            await addHistorical(userId); // Ajouter un deuxième historique
        } catch (err) {
            console.error('Error setting up test database:', err);
        }
    });

    describe('POST /api/historicals', () => {
        it('should create a new historical successfully', async () => {
            const res = await request(app)
                .post('/api/historicals')
                .send({ userId });
            
            expect(res.status).to.equal(201);
            expect(res.body).to.have.property('message', 'Historique créé avec succès.');
            expect(res.body).to.have.property('historical');
            expect(res.body.historical).to.have.property('id');
            expect(res.body.historical).to.have.property('user_id', userId);
        });

        it('should return 400 when userId is missing', async () => {
            const res = await request(app)
                .post('/api/historicals')
                .send({});
            
            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('message', 'UserId est requis.');
        });
    });

    describe('GET /api/historicals/user/:userId', () => {
        it('should get user historicals', async () => {
            const res = await request(app)
                .get(`/api/historicals/user/${userId}`);
            
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.be.at.least(2);
            expect(res.body[0]).to.have.property('id');
            expect(res.body[0]).to.have.property('user_id', userId);
            expect(res.body[0]).to.have.property('created_at');
        });

        it('should return 404 for user with no historicals', async () => {
            const nonExistentUserId = 99999;
            const res = await request(app)
                .get(`/api/historicals/user/${nonExistentUserId}`);
            
            expect(res.status).to.equal(404);
            expect(res.body).to.have.property('message', 'Aucun historique trouvé pour cet utilisateur.');
        });

        it('should handle database errors gracefully', async () => {
            // Test direct function call for error handling
            const historicals = await getHistoricalsByUserId('invalid-id');
            expect(historicals).to.be.an('array').that.is.empty;
        });
    });

    describe('DELETE /api/historicals/:historicalId', () => {
        it('should delete a historical', async () => {
            const res = await request(app)
                .delete(`/api/historicals/${historicalId}`);
            
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('message', 'Historique supprimé avec succès.');

            // Vérifier que l'historique a bien été supprimé
            const checkRes = await request(app)
                .get(`/api/historicals/user/${userId}`);
            const remainingHistoricals = checkRes.body;
            expect(remainingHistoricals.find(h => h.id === historicalId)).to.be.undefined;
        });

        it('should return 404 for non-existent historical', async () => {
            const res = await request(app)
                .delete('/api/historicals/99999');
            
            expect(res.status).to.equal(404);
            expect(res.body).to.have.property('message', 'Historique introuvable.');
        });
    });
});
