import * as crypto from 'crypto';

const apiKey: string = crypto.randomBytes(32).toString('hex');
console.log(`Generated API Key: ${apiKey}`);