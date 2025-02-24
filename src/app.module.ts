import {Module} from '@nestjs/common';
import {PlayersModule} from './domain/players/players.module';

@Module({
    imports: [PlayersModule],
})
export class AppModule {
}