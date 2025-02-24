import {Controller, Get} from '@nestjs/common';
import {PlayersService} from './players.service';
import {Player} from './player';
import config from "../../infrastructure/config";
import {Maps} from "../enums/maps.enum";

@Controller('players')
export class PlayersController {
    constructor(private readonly playersService: PlayersService) {
    }

    @Get()
    async retrievePlayers(): Promise<Player[]> {
        const keys = Object.keys(Maps);
        const players: Player[] = [];
        for (const mapName of keys) {
            const host: string = 'host' + mapName;
            const port: string = 'port' + mapName;
            const password: string = 'password' + mapName;
            const hostData = config[host];
            const portData = config[port];
            const passwordData = config[password];
            const connectionData = {
                host: hostData,
                port: portData,
                password: passwordData,
                map: mapName
            };
            try {
                const pls = await this.playersService.runService(connectionData);
                pls.forEach(pl => {
                    players.push(pl);
                });
            } catch (e) {
                console.error(`Error retrieving players for map ${mapName}:`);
            }
        }
        return players;
    }
}