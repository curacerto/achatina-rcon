import RconManager from "../../infrastructure/rcon-manager";
import RconClient from "../../infrastructure/rcon-client";

class GiveResourceUseCase {
    private rconManager: RconManager;

    constructor() {
        this.rconManager = new RconManager();
    }

    private withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
        const timeout = new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error('Timeout')), ms)
        );
        return Promise.race([promise, timeout]);
    }

    public async execute(arkId: string, resource: string, quantity: number, mapTimeout: number): Promise<void> {
        const promises = Object.keys(this.rconManager.rconClients).map(map => {
            const client: RconClient = this.rconManager.rconClients[map];
            return this.withTimeout(
                client.connect()
                    .then(() => client.send(`giveitemtoplayer ${arkId} ${resource} ${quantity} 0 0 0`))
                    .then(() => client.disconnect())
                    .then(() => {
                        console.log(`Resource given to player ${arkId} on map ${map}`);
                    }),
                mapTimeout // Timeout duration in milliseconds for each map
            ).catch(() => {
                console.error(`${map} timed out`);
            });
        });

        await Promise.all(promises);
    }
}

export default GiveResourceUseCase;