import dotenv from 'dotenv';

dotenv.config();

interface Config {
    [key: string]: string | number | undefined;
    hostTI?: string;
    portTI?: number;
    passwordTI?: string;
    hostSE?: string;
    portSE?: number;
    passwordSE?: string;
    hostTC?: string;
    portTC?: number;
    passwordTC?: string;
    hostAB?: string;
    portAB?: number;
    passwordAB?: string;
    hostEX?: string;
    portEX?: number;
    passwordEX?: string;
    hostSV?: string;
    portSV?: number;
    passwordSV?: string;
    hostAS?: string;
    portAS?: number;
    passwordAS?: string;
    hostCA?: string;
    portCA?: number;
    passwordCA?: string;
}

const config: Config = {
    hostTI: process.env.HOST_TI,
    portTI: parseInt(process.env.PORT_TI || '0', 10),
    passwordTI: process.env.PASSWORD_TI,
    hostSE: process.env.HOST_SE,
    portSE: parseInt(process.env.PORT_SE || '0', 10),
    passwordSE: process.env.PASSWORD_SE,
    hostTC: process.env.HOST_TC,
    portTC: parseInt(process.env.PORT_TC || '0', 10),
    passwordTC: process.env.PASSWORD_TC,
    hostAB: process.env.HOST_AB,
    portAB: parseInt(process.env.PORT_AB || '0', 10),
    passwordAB: process.env.PASSWORD_AB,
    hostEX: process.env.HOST_EX,
    portEX: parseInt(process.env.PORT_EX || '0', 10),
    passwordEX: process.env.PASSWORD_EX,
    hostSV: process.env.HOST_SV,
    portSV: parseInt(process.env.PORT_SV || '0', 10),
    passwordSV: process.env.PASSWORD_SV,
    hostAS: process.env.HOST_AS,
    portAS: parseInt(process.env.PORT_AS || '0', 10),
    passwordAS: process.env.PASSWORD_AS,
    hostCA: process.env.HOST_CA,
    portCA: parseInt(process.env.PORT_CA || '0', 10),
    passwordCA: process.env.PASSWORD_CA,
    hostG1: process.env.HOST_G1,
    portG1: parseInt(process.env.PORT_G1 || '0', 10),
    passwordG1: process.env.PASSWORD_G1,
};

export default config;