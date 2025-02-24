import { randomBytes } from 'crypto';

function generateApiKey(): string {
    return randomBytes(32).toString('hex');
}

const apiKey = generateApiKey();
console.log(`Generated API Key: ${apiKey}`);