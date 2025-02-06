import request from 'supertest';
import { expect } from 'chai';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createUserTable } from '../sqlite/users/createTable.js';
import { createMessagesTable } from '../sqlite/messages/createTable.js';
import { createHistoricalTable } from '../sqlite/historical/createTable.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import the app
import app from '../app.js';

describe('App Tests', () => {
    before(async () => {
        try {
            await createUserTable();
            await createMessagesTable();
            await createHistoricalTable();
        } catch (err) {
            console.error('Error setting up test database:', err);
        }
    });

    describe('Server Setup', () => {
        it('should respond to health check', async () => {
            const res = await request(app)
                .get('/health')
                .send();
            
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('status', 'ok');
        });

        it('should handle CORS', async () => {
            const res = await request(app)
                .options('/api/auth/login')
                .send();
            
            expect(res.headers['access-control-allow-origin']).to.equal('*');
        });

        it('should parse JSON bodies', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({ test: 'data' });
            
            expect(res.status).to.not.equal(400);
        });
    });
});
