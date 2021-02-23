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
                'wrapper': document.getElementById('intro-wrapper') as HTMLElement,
                'container': document.getElementById('intro-container') as HTMLElement,
                'video-wrap': document.getElementById('intro-video') as HTMLElement,
                'photo-wrap': document.getElementById('intro-photo-wrapper') as HTMLElement,
                'name': document.getElementById('intro-name') as HTMLElement
            },
            scroller
        );

        this._sizeRanges['name'] = nameSizes;
    }

    private _updateSizes(): void {
        const height = window.screen.height;
        const videoScaleFactor = 1.25;

        this._sizeRanges['video'] = {
            height: {
                min: height,
                max: height * videoScaleFactor
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

        this.elements['wrapper'].style.width = `${document.body.offsetWidth}px`;
        this.elements['wrapper'].style.height = `${2 * window.screen.height}px`;

        this.elements['video-wrap'].style.width = `${document.body.offsetWidth}px`;

        this.elements['photo-wrap'].style.top = '20';
        this.elements['photo-wrap'].style.opacity = '0';

        this.elements['name'].style.fontSize = `${
            this._sizeRanges['name'][this._widthRangeStr].max
        }px`;
    }

    public scrollUpdate(): void {
        const closeMin = () => {
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
            this.elements['video-wrap'].style.height = '0';
            (this.elements['video-wrap'].childNodes[0] as HTMLElement).style.opacity = '0';

            this.elements['photo-wrap'].style.top = 'calc(50% + 60px)';
            this.elements['photo-wrap'].style.opacity = '1';

            this.elements['name'].style.top = 'calc(50% + 144px)';
            this.elements['name'].style.fontSize = `${
                this._sizeRanges['name'][this._widthRangeStr].min
            }px`;
        };

        const inRange = (utils: {
            relativeScroll?: () => number;
            // eslint-disable-next-line no-unused-vars
            regionRelativeScroll?: (min: number, max: number) => number;
        }) => {
            const relativeScroll = utils.relativeScroll?.() as number;

            if (relativeScroll < 0.45) {
                const regRelScroll = utils.regionRelativeScroll?.(0, 0.45) as number;

                this.elements['video-wrap'].style.height = `${
                    this._sizeRanges['video'].height.max -
                    regRelScroll *
                        (this._sizeRanges['video'].height.max -
                            this._sizeRanges['video'].height.min)
                }px`;
                (this.elements['video-wrap'].childNodes[0] as HTMLElement).style.opacity = `${
                    (1 - regRelScroll) * 0.75
                }`;

                this.elements['photo-wrap'].style.top = `
                    calc(${20 + regRelScroll * 30}% + ${regRelScroll * 60}px)`;
                this.elements['photo-wrap'].style.opacity = `
                    ${utils.regionRelativeScroll?.(0.25, 0.45) as number}`;

                this.elements['name'].style.top = `calc(50% + ${regRelScroll * 144}px)`;
                const fontSizeMin = this._sizeRanges['name'][this._widthRangeStr].min;
                const fontSizeMax = this._sizeRanges['name'][this._widthRangeStr].max;
                this.elements['name'].style.fontSize = `${
                    fontSizeMin + (1 - regRelScroll) * (fontSizeMax - fontSizeMin)
                }px`;
            } else {
                this.elements['video-wrap'].style.height = '0';
                (this.elements['video-wrap'].childNodes[0] as HTMLElement).style.opacity = '0';
            }
        };

        this.scroller.handleScroll(this.scrollRange, closeMin, closeMax, inRange);
    }
}
