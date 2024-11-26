import {Injectable} from '@nestjs/common';
import {Worker} from 'worker_threads';
import path from 'path';
import {Player} from '../../domain/models/player';

@Injectable()
export class PlayersService {
    private runService(workerData: any): Promise<Player[]> {
        return new Promise((resolve, reject) => {
            const worker = new Worker(path.resolve(__dirname, '../../infrastructure/workers/retrieve-players.worker.js'), {workerData});
            let timeoutId: NodeJS.Timeout;

            worker.on('message', resolve);
            worker.on('error', reject);
            worker.on('exit', (code) => {
                clearTimeout(timeoutId);
                if (code !== 0) {
                    reject(new Error(`Worker stopped with exit code ${code}`));
                }
            });

            timeoutId = setTimeout(() => {
                worker.terminate().then(() => {
                    reject(new Error('Worker terminated due to timeout'));
                });
            }, 2000); // 2 seconds timeout
        });
    }

    async getPlayers(): Promise<Player[]> {
        return this.runService({});
    }
}