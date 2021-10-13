export class Category {
    _id: String;
    count: Number;
    check?: Boolean;

    constructor(
        _id: string,
        count: number,
        check?: boolean,
    ) {
        this._id = _id;
        this.count = count;
        this.check = check;
    }
}