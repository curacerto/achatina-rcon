import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {PlayersModule} from './domain/players/players.module';
import {AuthenticateMiddleware} from "./infrastructure/middleware/authenticate";
import {WeaponModule} from "./domain/weapon/weapon.module";

@Module({
    imports: [
        PlayersModule,
        WeaponModule,
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthenticateMiddleware)
            .forRoutes(
                {path: 'players', method: RequestMethod.GET},
                {path: 'weapon', method: RequestMethod.POST},
            );
    }
}