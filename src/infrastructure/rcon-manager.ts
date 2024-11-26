import RconClient from './rcon-client';
import config from './config';
import {Maps} from "../domain/enums/maps.enum";

class RconManager {
    public rconClients: { [key: string]: RconClient };

    constructor() {
        if (!config.hostTI || !config.portTI || !config.passwordTI ||
            !config.hostSE || !config.portSE || !config.passwordSE ||
            !config.hostTC || !config.portTC || !config.passwordTC ||
            !config.hostAB || !config.portAB || !config.passwordAB ||
            !config.hostCA || !config.portCA || !config.passwordCA) {
            throw new Error('Missing required environment variables');
        }

        this.rconClients = {
            [Maps.TI]: new RconClient(config.hostTI, config.portTI, config.passwordTI),
            [Maps.SE]: new RconClient(config.hostSE, config.portSE, config.passwordSE),
            [Maps.TC]: new RconClient(config.hostTC, config.portTC, config.passwordTC),
            [Maps.AB]: new RconClient(config.hostAB, config.portAB, config.passwordAB),
            [Maps.CA]: new RconClient(config.hostCA, config.portCA, config.passwordCA),
        };
    }

}

export default RconManager;