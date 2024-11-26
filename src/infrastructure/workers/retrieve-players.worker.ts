import {parentPort} from 'worker_threads';
import RetrievePlayersUseCase from '../../application/usecases/retrieve-players.usecase';

const retrievePlayersUseCase = new RetrievePlayersUseCase();

retrievePlayersUseCase.execute(1000) // 1 second for each map
    .then(players => {
        if (parentPort) {
            parentPort.postMessage(players);
        }
    })
    .catch(err => {
        if (parentPort) {
            parentPort.postMessage({error: err.message});
        }
    });