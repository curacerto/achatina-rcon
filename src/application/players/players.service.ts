import {Injectable} from '@nestjs/common';
import {Player} from '../../domain/models/player';
import RconClient from "../../infrastructure/rcon-client";

@Injectable()
export class PlayersService {
    runService(connectionData: any): Promise<Player[]> {
        return new Promise((resolve, reject) => {
            let rconClient = new RconClient(
                connectionData.host,
                connectionData.port,
                connectionData.password
            );
            rconClient.connect().then(() => {
                rconClient.sendCommand('listplayers').then((response: string) => {
                    console.log(response);
                    let players: Player[] = [];

                    if (!response.startsWith('No Players')) {
                        response.split('\n').forEach((line: string) => {
                            if (line.trim().length === 0) {
                                return;
                            }
                            // id is the content before the dot
                            const id = Number.parseInt(line.split('.')[0]);
                            // the name is the content between the dot and the first comma
                            const name = line.split('.')[1].split(',')[0].trim();
                            // the id is the content after the first comma
                            const arkId = line.split(',')[1].trim();
                            players.push(new Player(
                                id,
                                name,
                                connectionData.map,
                                arkId
                            ));
                        });
                    }

                    resolve(players);
                }).catch(
                    reject
                );
            }).catch(
                reject
            );
        });
    }
}