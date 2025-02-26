import RconClient from "../../infrastructure/rcon-client";
import config from "../../infrastructure/config";

export class CommandService {
    async executeCommand(mapName: string, command: string): Promise<[]> {
        return new Promise((resolve, reject) => {
            let rconClient = this.createRconClient(mapName);
            rconClient.connect().then(() => {
                rconClient.sendCommand(command).then((response) => {
                    console.log(response);
                    resolve(response);
                }).catch(
                    reject
                );
            }).catch(
                reject
            );
        });
    }

    private createRconClient(mapName: string) {
        const host: string = 'host' + mapName;
        const port: string = 'port' + mapName;
        const password: string = 'password' + mapName;
        const hostData = config[host] as string;
        const portData = config[port] as number;
        const passwordData = config[password] as string;
        return new RconClient(
            hostData,
            portData,
            passwordData
        );
    }
}