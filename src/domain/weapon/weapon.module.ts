import {Module} from "@nestjs/common";
import {WeaponController} from "./weapon.controller";
import {WeaponService} from "./weapon.service";
import {CommandService} from "../command/command.service";

@Module({
    controllers: [WeaponController],
    providers: [WeaponService, CommandService],
})
export class WeaponModule {
}