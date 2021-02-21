import { TRange } from '../@types/main';
import { Scroller, Scrollable } from '../scroll';

const nameSizes = {
    '910-1520': {
        min: 64,
        max: 96
    },
    '616-909': {
        min: 52,
        max: 72
    },
    '474-615': {
        min: 44,
        max: 64
    },
    '320-473': {
        min: 32,
        max: 40
    }
};

export default class Intro extends Scrollable {
    private _sizeRanges: { [key: string]: { [key: string]: TRange } } = {};
    private _widthRangeStr = '';

    constructor(scroller: Scroller) {
        super(
            {
                'container': document.getElementById('intro-container') as HTMLElement,
                'video-wrap': document.getElementById('intro-video') as HTMLElement,
                'photo-wrap': document.getElementById('intro-photo-wrapper') as HTMLElement,
                'name': document.getElementById('intro-name') as HTMLElement
            },
            scroller
        );

        this._sizeRanges['name'] = nameSizes;

        window.addEventListener('resize', () => {
            this.refreshSizes();
            this.scrollUpdate();
        });
    }

    private _updateSizes(): void {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const videoScaleFactor = 1.25;

        this._sizeRanges['video'] = {
            width: {
                min: windowWidth,
                max: windowWidth * videoScaleFactor
            },
            height: {
                min: windowHeight,
                max: windowHeight * videoScaleFactor
            }
        };

        const bannerContainerBounding = this.elements['container'].getBoundingClientRect();
        const bannerContainerDims = {
            width: bannerContainerBounding.width,
            height: bannerContainerBounding.height
        };
        const widthRangeStrs = Object.keys(this._sizeRanges['name']);
        for (const s of widthRangeStrs) {
            const range = s.split('-').map((i) => Number(i));
            if (bannerContainerDims.width >= range[0] && bannerContainerDims.width <= range[1]) {
                this._widthRangeStr = s;
                break;
            }
        }
    }

    protected refreshSizes(): void {
        this._updateSizes();

        this.elements['photo-wrap'].style.top = '20';
        this.elements['photo-wrap'].style.opacity = '0';

        this.elements['name'].style.fontSize = `${
            this._sizeRanges['name'][this._widthRangeStr].max
        }px`;
    }

    public scrollUpdate(): void {
        const closeMin = () => {
            this.elements['video-wrap'].style.width = `${this._sizeRanges['video'].width.max}px`;
            this.elements['video-wrap'].style.height = `${this._sizeRanges['video'].height.max}px`;
            (this.elements['video-wrap'].childNodes[0] as HTMLElement).style.opacity = '0.75';

            this.elements['photo-wrap'].style.top = '20%';
            this.elements['photo-wrap'].style.opacity = '0';

            this.elements['name'].style.top = '50%';
            this.elements['name'].style.fontSize = `${
                this._sizeRanges['name'][this._widthRangeStr].max
            }px`;
        };

        const closeMax = () => {
            this.elements['video-wrap'].style.width = `${this._sizeRanges['video'].width.min}px`;
            this.elements['video-wrap'].style.height = `${this._sizeRanges['video'].height.min}px`;
            (this.elements['video-wrap'].childNodes[0] as HTMLElement).style.opacity = '0';

            this.elements['photo-wrap'].style.top = 'calc(50% + 60px)';
            this.elements['photo-wrap'].style.opacity = '1';

            this.elements['name'].style.top = 'calc(50% + 144px)';
            this.elements['name'].style.fontSize = `${
                this._sizeRanges['name'][this._widthRangeStr].min
            }px`;
        };

        const inRange = (
            getRelativeScroll: () => number,
            // eslint-disable-next-line no-unused-vars
            regionRelativeScroll: (min: number, max: number) => number
        ) => {
            const relativeScroll = getRelativeScroll();

            this.elements['video-wrap'].style.width = `${
                this._sizeRanges['video'].width.min +
                relativeScroll *
                    (this._sizeRanges['video'].width.max - this._sizeRanges['video'].width.min)
            }px`;
            this.elements['video-wrap'].style.height = `${
                this._sizeRanges['video'].height.min +
                relativeScroll *
                    (this._sizeRanges['video'].height.max - this._sizeRanges['video'].height.min)
            }px`;
            (this.elements['video-wrap'].childNodes[0] as HTMLElement).style.opacity = `${
                (1 - relativeScroll) * 0.75
            }`;

            this.elements['photo-wrap'].style.top = `
                calc(${20 + relativeScroll * 30}% + ${relativeScroll * 60}px)`;
            this.elements['photo-wrap'].style.opacity = `${regionRelativeScroll(0.5, 1)}`;

            this.elements['name'].style.top = `calc(50% + ${relativeScroll * 144}px)`;
            const fontSizeMin = this._sizeRanges['name'][this._widthRangeStr].min;
            const fontSizeMax = this._sizeRanges['name'][this._widthRangeStr].max;
            this.elements['name'].style.fontSize = `${
                fontSizeMin + (1 - relativeScroll) * (fontSizeMax - fontSizeMin)
            }px`;
        };

        this.scroller.handleScroll(this.scrollRange, closeMin, closeMax, inRange);
    }
}
