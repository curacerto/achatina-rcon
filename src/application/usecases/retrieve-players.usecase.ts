import RconManager from "../../infrastructure/rcon-manager";
import RconClient from "../../infrastructure/rcon-client";
import {parseListPlayersResponse} from "../parsers/player.parser";
import {Player} from "../../domain/models/player";

class RetrievePlayersUseCase {
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

    public async execute(mapTimeout: number): Promise<Player[]> {
        let players: Player[] = [];

        const promises = Object.keys(this.rconManager.rconClients).map(map => {
            const client: RconClient = this.rconManager.rconClients[map];
            console.log(map);
            return this.withTimeout(
                client.connect()
                    .then(() => client.send("listplayers"))
                    .then(res => {
                        players = players.concat(parseListPlayersResponse(res, map));
                        return client.disconnect();
                    })
                    .then(() => {
                        console.log("Disconnected");
                    }),
                mapTimeout // Timeout duration in milliseconds for each map
            ).catch(() => {
                console.error(`${map} timed out`);
            });
        });

        await Promise.all(promises);
        return players;
    }
}

export default RetrievePlayersUseCase;