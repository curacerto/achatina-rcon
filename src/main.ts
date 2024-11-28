import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {AuthenticateMiddleware} from "./infrastructure/middleware/authenticate";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(new AuthenticateMiddleware().use);
    await app.listen(3000);
}

bootstrap();