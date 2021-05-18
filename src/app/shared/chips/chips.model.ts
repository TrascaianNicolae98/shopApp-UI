export class ChipsModel<T> {
    public type = 'chips-model';

    public id: number;
    public name: string;
    public img: string;
    public obj: T;

    constructor(chip: any = {}) {
        this.id = chip.id;
        this.name = chip.name;
        this.img = chip.img;
        this.obj = chip.obj;
    }
}
