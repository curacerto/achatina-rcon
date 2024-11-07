import Rcon from 'rcon';

class RconClient {
    private client: Rcon;
    private isConnected: boolean;

    constructor(host: string, port: number, password: string) {
        if (!host || !port || !password) {
            throw new Error('Missing required parameters');
        }

        this.client = new Rcon(host, port, password);
        this.isConnected = false;
    }

    connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client.on('auth', () => {
                console.log('Authenticated');
                this.isConnected = true;
                resolve();
            }).on('response', (str: string) => {
                console.log('Response: ' + str);
            }).on('end', () => {
                console.log('Connection closed');
            }).on('error', (err: Error) => {
                console.error('Error: ' + err.message);
                reject(err);
            });

            this.client.connect();
        });
    }

    sendCommand(command: string): Promise<string> {
        return new Promise((resolve, reject) => {
            if (!this.isConnected) {
                return reject(new Error('Cannot send command, not connected to the server'));
            }

            this.client.send(command, (response: string) => {
                resolve(response);
            });
        });
    }

    disconnect(): void {
        if (this.isConnected) {
            this.client.disconnect();
        }
    }
}

export default RconClient;