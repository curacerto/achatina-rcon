import {Player} from './player';

export function parseListPlayersResponse(response: string, map: string): Player[] {
    const players: Player[] = [];
    const lines = response.split('\n');

    for (const line of lines) {
        const match = line.match(/^\d+\.\s(.+),\s([a-f0-9]{32})\s*$/);
        if (match) {
            const [, name, arkId] = match;
            players.push(new Player(players.length, name, map, arkId));
        }
    }

    return players;
}