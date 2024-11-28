// src/players/players.module.ts
import {MiddlewareConsumer, Module, RequestMethod} from '@nestjs/common';
import {PlayersService} from './players.service';
import {PlayersController} from './players.controller';
import {AuthenticateMiddleware} from "../../infrastructure/middleware/authenticate";

@Module({
    controllers: [PlayersController],
    providers: [PlayersService],
})
export class PlayersModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthenticateMiddleware)
            .forRoutes({path: 'players', method: RequestMethod.GET});
    }
}