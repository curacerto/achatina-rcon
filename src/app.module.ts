import {Module} from '@nestjs/common';
import {PlayersModule} from './application/players/players.module';

@Module({
    imports: [PlayersModule],
})
export class AppModule {
}