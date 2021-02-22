import { Scrollable, Scroller } from '../scroll';

export default class Exploration extends Scrollable {
    constructor(scroller: Scroller) {
        super({}, scroller);
    }

    protected refreshSizes(): void {
        1;
    }

    public scrollUpdate(): void {
        1;
    }
}
