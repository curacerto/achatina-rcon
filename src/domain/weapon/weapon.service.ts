import {Injectable} from '@nestjs/common';
import {CommandService} from "../command/command.service";

@Injectable()
export class WeaponService {
    constructor(private readonly commandService: CommandService) {
    }

    async spawnWeapon(
        map: string,
        eosId: string,
        blueprint: string,
        isBlueprint: boolean
    ): Promise<any> {
        const mapName = map;
        const quantity = '1';
        const quality = '5000';
        const isBlueprintParam = isBlueprint ? '1' : '0';
        const command = `cheat GiveItemToPlayer ${eosId} ${blueprint} ${quantity} ${quality} ${isBlueprintParam}`;
        await this.commandService.executeCommand(mapName, command);
    }
}