import { parseListPlayersResponse } from './player.parser';
import { Player } from '../../domain/models/player';

describe('parseListPlayersResponse', () => {
    it('should parse the response and return an array of Player objects', () => {
        const response =
            "0. Stellinha Apelon..., 0002bb9d5ffe465d88f81368410fef7e\n" +
            "1. dexsee, 00029369f37c4b3bbc9652da2e69f3c4\n" +
            "2. KingWill, 0002b80200254fcc81ad59e7236276ed";

        const map = 'TheIsland';

        const expectedPlayers: Player[] = [
            new Player(0, 'Stellinha Apelon...', map, '0002bb9d5ffe465d88f81368410fef7e'),
            new Player(1, 'dexsee', map, '00029369f37c4b3bbc9652da2e69f3c4'),
            new Player(2, 'KingWill', map, '0002b80200254fcc81ad59e7236276ed')
        ];

        const players = parseListPlayersResponse(response, map);

        expect(players).toEqual(expectedPlayers);
    });

    it('should return an empty array if the response is empty', () => {
        const response = '';
        const map = 'TheIsland';

        const players = parseListPlayersResponse(response, map);

        expect(players).toEqual([]);
    });

    it('should skip lines that do not match the expected format', () => {
        const response =
            "0. Stellinha Apelon..., 0002bb9d5ffe465d88f81368410fef7e\n" +
            "invalid line\n" +
            "1. dexsee, 00029369f37c4b3bbc9652da2e69f3c4\n" +
            "2. KingWill, 0002b80200254fcc81ad59e7236276ed";

        const map = 'TheIsland';

        const expectedPlayers: Player[] = [
            new Player(0, 'Stellinha Apelon...', map, '0002bb9d5ffe465d88f81368410fef7e'),
            new Player(1, 'dexsee', map, '00029369f37c4b3bbc9652da2e69f3c4'),
            new Player(2, 'KingWill', map, '0002b80200254fcc81ad59e7236276ed')
        ];

        const players = parseListPlayersResponse(response, map);

        expect(players).toEqual(expectedPlayers);
    });

    it('should parse the response and return an array of Player objects', () => {
        const response =
            "\n0. dexsee, 00029369f37c4b3bbc9652da2e69f3c4 \n";

        const map = 'TheIsland';

        const players = parseListPlayersResponse(response, map);

        expect(players.length).toEqual(1);
    });
});