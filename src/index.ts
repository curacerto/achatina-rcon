import dotenv from 'dotenv';
import RconClient from './infrastructure/rconClient';

// Load environment variables from .env file
dotenv.config();

// Access environment variables
const hostTheIsland = process.env.HOST_SE;
const portTheIsland = parseInt(process.env.PORT_SE || '0', 10);
const passwordTheIsland = process.env.PASSWORD_SE;

// Ensure the variables are defined
if (!hostTheIsland || !portTheIsland || !passwordTheIsland) {
    throw new Error('Missing required environment variables');
}

// Create an instance of RconClient with the environment variables
const rconClient = new RconClient(hostTheIsland, portTheIsland, passwordTheIsland);

// Example usage
rconClient.connect().then(() => {
    console.log('Connected to RCON server');

    // Send a gfi command to spawn a metal pickaxe in player inventory
    rconClient.sendCommand('giveitemtoplayer 293639103 "Blueprint\'/Game/PrimalEarth/CoreBlueprints/Weapons/PrimalItem_WeaponMetalPick.PrimalItem_WeaponMetalPick\'" 1 5000 1').then((response) => {
        console.log('Received response:', response);
    }).catch((err) => {
        console.error('Failed to send command:', err);
    });

}).catch((err) => {
    console.error('Failed to connect to RCON server:', err);
});

rconClient.disconnect();
