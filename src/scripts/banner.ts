import { TScrollRange } from './@types/main';
import { Scroller } from './scroll';

export default class {
    private _bannerPrimary = {
        element: document.getElementById('banner-primary') as HTMLElement,
        width: { min: 0, max: 0 },
        height: { min: 0, max: 0 },
        scrollRange: { min: 0, max: 0 }
    };
    private _scroller: Scroller;

    constructor(scroller: Scroller) {
        this._updateSizes();
        this._initDOM();

        this._scroller = scroller;

        window.addEventListener('resize', () => {
            this._updateSizes();
            this.scrollUpdate();
        });
    }

    private _updateSizes(): void {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const scaleFactor = 1.25;

        this._bannerPrimary.width = {
            min: windowWidth,
            max: windowWidth * scaleFactor
        };
        this._bannerPrimary.height = {
            min: windowHeight,
            max: windowHeight * scaleFactor
        };
    }

    private _initDOM() {
        (this._bannerPrimary.element.childNodes[0] as HTMLElement).style.opacity = '0.5';
    }

    public set scrollRange(scrollRange: TScrollRange) {
        this._bannerPrimary.scrollRange = scrollRange;
    }

    public scrollUpdate(): void {
        const closeMin = () => {
            this._bannerPrimary.element.style.width = `${this._bannerPrimary.width.max}px`;
            this._bannerPrimary.element.style.height = `${this._bannerPrimary.height.max}px`;
            (this._bannerPrimary.element.childNodes[0] as HTMLElement).style.opacity = '0.5';
        };

        const closeMax = () => {
            this._bannerPrimary.element.style.width = `${this._bannerPrimary.width.min}px`;
            this._bannerPrimary.element.style.height = `${this._bannerPrimary.height.min}px`;
            (this._bannerPrimary.element.childNodes[0] as HTMLElement).style.opacity = '0';
        };

        const inRange = (getRelativeScroll: () => number) => {
            const relativeScroll = getRelativeScroll();

            this._bannerPrimary.element.style.width = `${
                this._bannerPrimary.width.min +
                relativeScroll * (this._bannerPrimary.width.max - this._bannerPrimary.width.min)
            }px`;
            this._bannerPrimary.element.style.height = `${
                this._bannerPrimary.height.min +
                relativeScroll * (this._bannerPrimary.height.max - this._bannerPrimary.height.min)
            }px`;
            (this._bannerPrimary.element.childNodes[0] as HTMLElement).style.opacity = `${
                (1 - relativeScroll) * 0.5
            }`;
        };

        this._scroller.handleScroll(this._bannerPrimary.scrollRange, closeMin, closeMax, inRange);
    }
}
