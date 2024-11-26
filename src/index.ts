import {Worker} from 'worker_threads';
import path from 'path';

function runService(workerData: any) {
    return new Promise((resolve, reject) => {
        const worker = new Worker(path.resolve(__dirname, './infrastructure/workers/retrieve-players.worker.js'), {workerData});
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

async function main() {
    try {
        const players = await runService({});
        console.log(players);
    } catch (err) {
        console.error("Error:", err);
    }
}

main();