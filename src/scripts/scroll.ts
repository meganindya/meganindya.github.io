import { TTarget, TScrollRange, TScrollHandler } from './@types/main';

export class ScrollHandler {
    private _targets = ['banner-primary', 'footer'];
    private _rangeEnds = [499, 3000];

    private _prevTargetIndex = 0;
    private _targetMap: { [key: string]: TScrollRange } = {};
    private _onScroll: TScrollHandler;

    constructor(onScroll: TScrollHandler) {
        let lastStart = 0;
        for (let i = 0; i < this._targets.length; i++) {
            this._targetMap[this._targets[i]] = {
                min: lastStart,
                max: this._rangeEnds[i]
            };
            lastStart = this._rangeEnds[i] + 1;
        }

        this._onScroll = onScroll;
        window.addEventListener('scroll', () => this.monitor());
    }

    public getRange(target: TTarget): TScrollRange {
        return this._targetMap[target] as TScrollRange;
    }

    public monitor(): void {
        const currPos = window.scrollY;

        const prevTarget = this._targets[this._prevTargetIndex];
        const prevTargetRange = this._targetMap[prevTarget];

        if (currPos >= prevTargetRange.min && currPos <= prevTargetRange.max) {
            this._onScroll({ area: 'inside', target: prevTarget as TTarget });
        } else {
            if (currPos < prevTargetRange.min) {
                this._onScroll({
                    area: 'moving',
                    entering: this._targets[this._prevTargetIndex - 1] as TTarget,
                    exiting: this._targets[this._prevTargetIndex] as TTarget
                });
                this._prevTargetIndex--;
            } else {
                this._onScroll({
                    area: 'moving',
                    entering: this._targets[this._prevTargetIndex + 1] as TTarget,
                    exiting: this._targets[this._prevTargetIndex] as TTarget
                });
                this._prevTargetIndex++;
            }
        }
    }
}

export class Scroller {
    private _scrollPos = 0;

    constructor() {
        window.addEventListener('scroll', () => {
            this._scrollPos = window.scrollY;
        });
    }

    private _relativeScroll(scrollRange: TScrollRange) {
        return (this._scrollPos - scrollRange.min) / (scrollRange.max - scrollRange.min);
    }

    public handleScroll(
        scrollRange: TScrollRange,
        exitMin: () => void,
        exitMax: () => void,
        // eslint-disable-next-line no-unused-vars
        inRange: (relativeScroll: () => number) => void
    ): void {
        if (this._scrollPos < scrollRange.min) {
            exitMin();
        } else if (this._scrollPos > scrollRange.max) {
            exitMax();
        } else {
            inRange(() => this._relativeScroll(scrollRange));
        }
    }
}
