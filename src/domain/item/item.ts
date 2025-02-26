export class Item {
    id: number;
    name: string;
    blueprint: string;
    icon: string;
    price: number;
    price_bp: number;
    category: string;

    constructor(id: number, name: string, blueprint: string, icon: string, price: number, price_bp: number, category: string) {
        this.id = id;
        this.name = name;
        this.blueprint = blueprint;
        this.icon = icon;
        this.price = price;
        this.price_bp = price_bp;
        this.category = category;
    }
}