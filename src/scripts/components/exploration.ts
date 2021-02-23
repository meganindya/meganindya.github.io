import { Scrollable, Scroller } from '../scroll';

export default class Exploration extends Scrollable {
    constructor(scroller: Scroller) {
        super(
            {
                wrapper: document.getElementById('exploration-wrapper') as HTMLElement
            },
            scroller
        );
    }

    protected refreshSizes(): void {
        1;
    }

    public scrollUpdate(): void {
        1;
    }
}
