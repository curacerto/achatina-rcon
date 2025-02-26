import {Body, Controller, Post} from '@nestjs/common';
import {WeaponService} from "./weapon.service";
import { Item } from '../item/item';

@Controller('weapon')
export class WeaponController {
    constructor(private readonly weaponService: WeaponService) {
    }

    @Post('spawn-weapon')
    async spawnWeapon(
        @Body('map') map: string,
        @Body('eosId') eosId: string,
        @Body('blueprint') blueprint: string,
        @Body('isBlueprint') isBlueprint: boolean,
    ): Promise<Item> {
        return this.weaponService.spawnWeapon(map, eosId, blueprint, isBlueprint);
    }
}