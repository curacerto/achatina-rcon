import {Rcon} from "rcon-client";

class RconClient {
    client: Rcon;
    isConnected: boolean;

    constructor(host: string, port: number, password: string) {
        if (!host || !port || !password) {
            throw new Error('Missing required parameters');
        }

        this.client = new Rcon({host, port, password});
        this.isConnected = false;

        this.client.on('connect', () => {
            // console.log("Connected");
        }).on('authenticated', () => {
            // console.log("Authenticated");
        }).on('error', (err: string) => {
            console.log("Error: " + err);
        }).on('end', () => {
            // console.log("Connection closed");
        });
    }

    public connect() {
        return this.client.connect().then(() => {
            this.isConnected = true;
        });
    }

    public send(command: string) {
        return this.client.send(command);
    }

    public disconnect() {
        return this.client.end().then(() => {
            this.isConnected = false;
        });
    }

}

export default RconClient;