declare module 'rcon' {
    import { EventEmitter } from 'events';

    class Rcon extends EventEmitter {
        constructor(host: string, port: number, password: string);
        connect(): void;
        disconnect(): void;
        send(command: string, callback?: (response: string) => void): void;
    }

    export = Rcon;
}