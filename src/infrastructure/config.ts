import dotenv from 'dotenv';

dotenv.config();

const config = {
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
    hostCA: process.env.HOST_CA,
    portCA: parseInt(process.env.PORT_CA || '0', 10),
    passwordCA: process.env.PASSWORD_CA,
};

export default config;