import { Scroller, Scrollable } from './scroll';

export default class BannerPrimary extends Scrollable {
    private _dimensions = {
        width: { min: 0, max: 0 },
        height: { min: 0, max: 0 }
    };

    constructor(scroller: Scroller) {
        super(document.getElementById('banner-primary') as HTMLElement, scroller);

        window.addEventListener('resize', () => {
            this._updateSizes();
            this.scrollUpdate();
        });
    }

    initDom(): void {
        this._updateSizes();

        this.element.style.width = `${this._dimensions.width.max}px`;
        this.element.style.height = `${this._dimensions.height.max}px`;
        (this.element.childNodes[0] as HTMLElement).style.opacity = '1';
    }

    private _updateSizes(): void {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const scaleFactor = 1.25;

        this._dimensions.width = {
            min: windowWidth,
            max: windowWidth * scaleFactor
        };
        this._dimensions.height = {
            min: windowHeight,
            max: windowHeight * scaleFactor
        };
    }

    public scrollUpdate(): void {
        const closeMin = () => {
            this.element.style.width = `${this._dimensions.width.max}px`;
            this.element.style.height = `${this._dimensions.height.max}px`;
            (this.element.childNodes[0] as HTMLElement).style.opacity = '0.75';
        };

        const closeMax = () => {
            this.element.style.width = `${this._dimensions.width.min}px`;
            this.element.style.height = `${this._dimensions.height.min}px`;
            (this.element.childNodes[0] as HTMLElement).style.opacity = '0';
        };

        const inRange = (getRelativeScroll: () => number) => {
            const relativeScroll = getRelativeScroll();

            this.element.style.width = `${
                this._dimensions.width.min +
                relativeScroll * (this._dimensions.width.max - this._dimensions.width.min)
            }px`;
            this.element.style.height = `${
                this._dimensions.height.min +
                relativeScroll * (this._dimensions.height.max - this._dimensions.height.min)
            }px`;
            (this.element.childNodes[0] as HTMLElement).style.opacity = `${
                (1 - relativeScroll) * 0.75
            }`;
        };

        this.scroller.handleScroll(this.scrollRange, closeMin, closeMax, inRange);
    }
}
