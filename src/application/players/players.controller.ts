import {Controller, Get} from '@nestjs/common';
import {PlayersService} from './players.service';
import {Player} from '../../domain/models/player';

@Controller('players')
export class PlayersController {
    constructor(private readonly playersService: PlayersService) {
    }

    @Get()
    async retrievePlayers(): Promise<Player[]> {
        return this.playersService.getPlayers();
    }
}