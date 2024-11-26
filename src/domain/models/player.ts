export class Player {
    id: number;
    name: string;
    map: string;
    arkId: string;

    constructor(id: number, name: string, map: string, arkId: string) {
        this.id = id;
        this.name = name;
        this.map = map;
        this.arkId = arkId;
    }
}