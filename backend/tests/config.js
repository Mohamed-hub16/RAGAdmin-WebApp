import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const TEST_CONFIG = {
    dbPath: join(__dirname, '../sqlite/test.db'),
    port: 5001, // Different port for test environment
    jwtSecret: 'test-secret-key'
};
