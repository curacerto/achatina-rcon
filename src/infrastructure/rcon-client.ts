import * as net from 'net';

class RconClient {
    private client: net.Socket;
    private readonly host: string;
    private readonly port: number;
    private readonly password: string;
    private requestId: number;

    constructor(host: string, port: number, password: string) {
        this.host = host;
        this.port = port;
        this.password = password;
        this.requestId = 0;
        this.client = new net.Socket();
    }

    public connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            let isConnected = false;

            this.client.connect(this.port, this.host, () => {
                this.authenticate().then(() => {
                    isConnected = true;
                    resolve();
                }).catch(reject);
            });

            this.client.on('error', (err) => {
                if (!isConnected) {
                    reject(err);
                } else {
                    console.error('Connection error:', err);
                }
            });

            this.client.on('close', () => {
                if (!isConnected) {
                    reject(new Error('Connection closed'));
                } else {
                    console.warn('Connection closed');
                }
            });
        });
    }

    private authenticate(): Promise<void> {
        return new Promise((resolve, reject) => {
            const authRequest = this.createRequest(3, ++this.requestId, this.password);
            this.client.write(authRequest);

            this.client.once('data', (data) => {
                const response = this.readResponse(data);
                if (response.id === this.requestId && response.type === 2) {
                    resolve();
                } else {
                    reject(new Error('Authentication failed'));
                }
            });

            this.client.on('close', () => {
                reject(new Error('Connection closed during authentication'));
            });
        });
    }

    public sendCommand(command: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const commandRequest = this.createRequest(2, ++this.requestId, command);
            this.client.write(commandRequest);

            this.client.once('data', (data) => {
                const response = this.readResponse(data);
                if (response.id === this.requestId) {
                    resolve(response.body);
                } else {
                    reject(new Error('Invalid response'));
                }
            });

            this.client.on('close', () => {
                reject(new Error('Connection closed before response received'));
            });
        });
    }

    public createRequest(type: number, id: number, body: string): Buffer {
        let size = Buffer.byteLength(body) + 14;
        let buffer = Buffer.alloc(size);
        buffer.writeInt32LE(size - 4, 0);
        buffer.writeInt32LE(id, 4);
        buffer.writeInt32LE(type, 8);
        buffer.write(body, 12, size - 2, "ascii");
        buffer.writeInt16LE(0, size - 2);
        return buffer;
    }

    public readResponse(buffer: Buffer): any {
        return {
            id: buffer.readInt32LE(4),
            type: buffer.readInt32LE(8),
            body: buffer.toString("ascii", 12, buffer.length - 2)
        };
    }
}

export default RconClient;