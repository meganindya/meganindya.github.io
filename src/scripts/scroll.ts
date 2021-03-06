import { TTarget, TRange, TScrollHandler } from './@types/main';
import ranges from './ranges.json';

export class ScrollHandler {
    private _targets: string[];
    private _rangeEnds: number[];

    private _prevTargetIndex = 0;
    private _targetMap: { [key: string]: TRange } = {};
    private _onScroll: TScrollHandler;

    constructor(onScroll: TScrollHandler) {
        this._targets = Object.keys(ranges);
        this._rangeEnds = this._targets.map(
            (target) => (ranges as { [key: string]: number })[target]
        );

        this._updateRanges();

        this._onScroll = onScroll;
        window.addEventListener('scroll', () => this.monitor());

        window.addEventListener('resize', () => this._updateRanges());
    }

    private _updateRanges() {
        let lastStart = 0;
        for (let i = 0; i < this._targets.length; i++) {
            this._targetMap[this._targets[i]] = {
                min: lastStart,
                max: lastStart + this._rangeEnds[i] * window.innerHeight - 1
            };
            lastStart = this._targetMap[this._targets[i]].max + 1;
        }
    }

    public getRange(target: TTarget): TRange {
        return this._targetMap[target] as TRange;
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
                this._prevTargetIndex = Math.max(this._prevTargetIndex - 1, 0);
            } else {
                this._onScroll({
                    area: 'moving',
                    entering: this._targets[this._prevTargetIndex + 1] as TTarget,
                    exiting: this._targets[this._prevTargetIndex] as TTarget
                });
                this._prevTargetIndex = Math.min(this._prevTargetIndex + 1, 5);
            }
        }
    }
}

export class Scroller {
    private _scrollPos = 0;

    constructor() {
        window.addEventListener('scroll', () => (this._scrollPos = window.scrollY));
    }

    private _relativeScroll(scrollRange: TRange) {
        return (this._scrollPos - scrollRange.min) / (scrollRange.max - scrollRange.min);
    }

    private _vhRelativeScroll(scrollRange: TRange) {
        return (this._scrollPos - scrollRange.min) / window.innerHeight;
    }

    public handleScroll(
        scrollRange: TRange,
        exitMin: () => void,
        exitMax: () => void,
        // eslint-disable-next-line no-unused-vars
        inRange: (utils: {
            relativeScroll?: () => number;
            // eslint-disable-next-line no-unused-vars
            regionRelativeScroll?: (min: number, max: number) => number;
            vhRelativeScroll?: () => number;
        }) => void
    ): void {
        if (this._scrollPos < scrollRange.min) {
            exitMin();
        } else if (this._scrollPos > scrollRange.max) {
            exitMax();
        } else {
            inRange({
                relativeScroll: () => this._relativeScroll(scrollRange),
                regionRelativeScroll: (min: number, max: number) =>
                    (this._relativeScroll(scrollRange) - min) / (max - min),
                vhRelativeScroll: () => this._vhRelativeScroll(scrollRange)
            });
        }
    }
}

export abstract class Scrollable {
    protected elements: { [key: string]: HTMLElement };
    private _scrollRange: TRange;
    private _scroller: Scroller;

    constructor(elements: { [key: string]: HTMLElement }, scroller: Scroller) {
        this.elements = elements;
        this._scrollRange = { min: 0, max: 0 };
        this._scroller = scroller;

        window.addEventListener('resize', () => {
            this.refreshSizes();
            this.scrollUpdate();
        });

        setTimeout(() => this.refreshSizes());
    }

    public set scrollRange(scrollRange: TRange) {
        this._scrollRange = scrollRange;
    }

    public get scrollRange(): TRange {
        return this._scrollRange;
    }

    protected get scroller(): Scroller {
        return this._scroller;
    }

    protected abstract refreshSizes(): void;

    public abstract scrollUpdate(): void;
}
