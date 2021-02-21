import { TRange } from './@types/main';
import { Scroller, Scrollable } from './scroll';

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

// export class IntroB extends Scrollable {
//     private _dimensions = {
//         width: { min: 0, max: 0 },
//         height: { min: 0, max: 0 }
//     };
//     private _nameHeader: {
//         element: HTMLElement;
//         fontSize: { [key: string]: { min: number; max: number } };
//     };
//     private _bannerContainerWidthRange: string;
//     private _vertical: boolean;

//     constructor(scroller: Scroller) {
//         super(document.getElementById('banner-primary') as HTMLElement, scroller);

//         this._nameHeader = {
//             element: (document.getElementById('info-card') as HTMLElement)
//                 .childNodes[0] as HTMLElement,
//             fontSize: {
//                 '910-1520': {
//                     min: 64,
//                     max: 96
//                 },
//                 '616-909': {
//                     min: 52,
//                     max: 72
//                 },
//                 '474-615': {
//                     min: 44,
//                     max: 64
//                 },
//                 '320-473': {
//                     min: 32,
//                     max: 40
//                 }
//             }
//         };

//         this._bannerContainerWidthRange = '';
//         this._vertical = false;

//         window.addEventListener('resize', () => {
//             this._updateSizes();
//             this.scrollUpdate();
//         });
//     }

//     initDom(): void {
//         this._updateSizes();

//         this.element.style.width = `${this._dimensions.width.max}px`;
//         this.element.style.height = `${this._dimensions.height.max}px`;
//         (this.element.childNodes[0] as HTMLElement).style.opacity = '0.75';

//         this._nameHeader.element.style.top = '50%';
//         this._nameHeader.element.style.transform = 'translate(-50%, -50%)';
//     }

//     private _updateSizes(): void {
//         const windowWidth = window.innerWidth;
//         const windowHeight = window.innerHeight;
//         const scaleFactor = 1.25;

//         this._vertical = windowWidth < 768;

//         this._dimensions.width = {
//             min: windowWidth,
//             max: windowWidth * scaleFactor
//         };
//         this._dimensions.height = {
//             min: windowHeight,
//             max: windowHeight * scaleFactor
//         };

//         const bannerContainerBounding = (document.getElementById(
//             'banner-container'
//         ) as HTMLElement).getBoundingClientRect();
//         const bannerContainerDims = {
//             width: bannerContainerBounding.width,
//             height: bannerContainerBounding.height
//         };
//         const rangeStrings = Object.keys(this._nameHeader.fontSize);
//         for (const s of rangeStrings) {
//             const range = s.split('-').map((i) => Number(i));
//             if (bannerContainerDims.width >= range[0] && bannerContainerDims.width <= range[1]) {
//                 this._bannerContainerWidthRange = s;
//                 break;
//             }
//         }

//         this._nameHeader.element.style.fontSize = `${
//             this._nameHeader.fontSize[this._bannerContainerWidthRange].max
//         }px`;
//     }

//     public scrollUpdate(): void {
//         const closeMin = () => {
//             this.element.style.width = `${this._dimensions.width.max}px`;
//             this.element.style.height = `${this._dimensions.height.max}px`;
//             (this.element.childNodes[0] as HTMLElement).style.opacity = '0.75';

//             this._nameHeader.element.style.transform = 'translate(-50%, -50%)';
//             this._nameHeader.element.style.fontSize = `${
//                 this._nameHeader.fontSize[this._bannerContainerWidthRange].max
//             }px`;
//         };

//         const closeMax = () => {
//             this.element.style.width = `${this._dimensions.width.min}px`;
//             this.element.style.height = `${this._dimensions.height.min}px`;
//             (this.element.childNodes[0] as HTMLElement).style.opacity = '0';

//             if (this._vertical) {
//                 this._nameHeader.element.style.transform = 'translate(-50%, 16px)';
//             } else {
//                 this._nameHeader.element.style.transform = 'translate(0, calc(-100% - 16px))';
//             }
//             this._nameHeader.element.style.fontSize = `${
//                 this._nameHeader.fontSize[this._bannerContainerWidthRange].min
//             }px`;
//         };

//         const inRange = (
//             getRelativeScroll: () => number,
//             // eslint-disable-next-line no-unused-vars
//             regionRelativeScroll: (min: number, max: number) => number
//         ) => {
//             const relativeScroll = getRelativeScroll();

//             this.element.style.width = `${
//                 this._dimensions.width.min +
//                 relativeScroll * (this._dimensions.width.max - this._dimensions.width.min)
//             }px`;
//             this.element.style.height = `${
//                 this._dimensions.height.min +
//                 relativeScroll * (this._dimensions.height.max - this._dimensions.height.min)
//             }px`;
//             (this.element.childNodes[0] as HTMLElement).style.opacity = `${
//                 (1 - relativeScroll) * 0.75
//             }`;

//             if (this._vertical) {
//                 this._nameHeader.element.style.transform = `
//                     translate(
//                         -50%,
//                         calc(-${(1 - relativeScroll) * 50}% + ${relativeScroll * 16}px)
//                     )`;
//             } else {
//                 if (relativeScroll < 0.5) {
//                     this._nameHeader.element.style.transform = `
//                         translate(-${(1 - regionRelativeScroll(0, 0.5)) * 50}%, -50%)`;
//                 } else {
//                     this._nameHeader.element.style.transform = `
//                         translate(
//                             0,
//                             calc(
//                                 -${50 + regionRelativeScroll(0.5, 1) * 50}% -
//                                 ${regionRelativeScroll(0.5, 1) * 16}px
//                             )
//                         )`;
//                 }
//             }

//             const fontSizeMin = this._nameHeader.fontSize[this._bannerContainerWidthRange].min;
//             const fontSizeMax = this._nameHeader.fontSize[this._bannerContainerWidthRange].max;
//             this._nameHeader.element.style.fontSize = `${
//                 fontSizeMin + (1 - relativeScroll) * (fontSizeMax - fontSizeMin)
//             }px`;
//         };

//         this.scroller.handleScroll(this.scrollRange, closeMin, closeMax, inRange);
//     }
// }

// export class BannerSecondary extends Scrollable {
//     private _photoCard: HTMLElement;
//     private _nameHeader: HTMLElement;
//     private _infoData: HTMLElement;
//     private _vertical: boolean;

//     constructor(scroller: Scroller) {
//         super(document.getElementById('banner-secondary') as HTMLElement, scroller);
//         this._photoCard = this.element.childNodes[0] as HTMLElement;
//         this._nameHeader = (this.element.childNodes[1] as HTMLElement).childNodes[0] as HTMLElement;
//         this._infoData = (this.element.childNodes[1] as HTMLElement).childNodes[1] as HTMLElement;

//         const photo = (this.element.childNodes[0] as HTMLElement).childNodes[0] as HTMLElement;
//         window.addEventListener('mousemove', (event) => {
//             const offsetX = 2 * (event.clientX / window.innerWidth) - 1;
//             const offsetY = 2 * (event.clientY / window.innerHeight) - 1;
//             const delta = -8;
//             photo.style.backgroundPosition = `${delta * offsetX}px ${delta * offsetY}px`;
//         });
//         this._vertical = false;

//         window.addEventListener('resize', () => {
//             this._updateSizes();
//             this.scrollUpdate();
//         });
//     }

//     initDom(): void {
//         this._updateSizes();
//         this._photoCard.style.opacity = '0';
//         this._photoCard.style.transform = 'translate(-50%, -50%)';

//         this._nameHeader.style.top = '50%';
//         this._nameHeader.style.transform = 'translate(-50%, -50%)';

//         this._infoData.style.opacity = '0';
//     }

//     private _updateSizes(): void {
//         this._vertical = window.innerWidth < 768;

//         if (this._vertical) {
//             const windowWidth = window.innerWidth;
//             this._photoCard.style.width = `${windowWidth * 0.4}px`;
//             this._photoCard.style.height = `${windowWidth * 0.4}px`;
//             this._infoData.style.width = `${windowWidth * 0.65}px`;
//             this._infoData.style.textAlign = 'justify';
//         } else {
//             const windowWidth = window.innerWidth;
//             this._photoCard.style.width = `${windowWidth * 0.3}px`;
//             this._photoCard.style.height = `${windowWidth * 0.3}px`;
//             this._infoData.style.width = `${windowWidth * 0.3}px`;
//             this._infoData.style.textAlign = 'left';
//         }
//     }

//     public scrollUpdate(): void {
//         const closeMin = () => {
//             this._photoCard.style.opacity = '0';

//             if (this._vertical) {
//                 this._photoCard.style.left = '50%';

//                 this._nameHeader.style.transform = 'translate(-50%, -100%)';
//                 this._infoData.style.transform = 'translate(-50%, 96px)';
//             } else {
//                 this._photoCard.style.left = '45%';
//                 this._photoCard.style.transform = 'translate(-50%, -50%)';

//                 this._nameHeader.style.transform = 'translate(0, -100%)';
//                 this._infoData.style.transform = 'translate(96px, -50%)';
//             }
//             this._infoData.style.opacity = '0';
//         };

//         const closeMax = () => {
//             this._photoCard.style.opacity = '1';

//             if (this._vertical) {
//                 this._photoCard.style.left = '50%';

//                 this._nameHeader.style.transform = 'translate(-50%, -100%)';
//                 this._infoData.style.transform = 'translate(-50%, -15%)';
//             } else {
//                 this._photoCard.style.left = '45%';
//                 this._photoCard.style.transform = 'translate(-100%, -50%)';

//                 this._nameHeader.style.transform = 'translate(0, calc(-100% - 24px))';
//                 this._infoData.style.transform = 'translate(0, -50%)';
//             }
//             this._infoData.style.opacity = '1';
//         };

//         const inRange = (
//             getRelativeScroll: () => number,
//             // eslint-disable-next-line no-unused-vars
//             regionRelativeScroll: (min: number, max: number) => number
//         ) => {
//             const relativeScroll = getRelativeScroll();

//             if (this._vertical) {
//                 this._photoCard.style.transform = `
//                     translate(-50%, calc(-100% - ${(1 - relativeScroll) * 96}px - 96px))`;
//             } else {
//                 this._photoCard.style.transform = `
//                     translate(calc(-100% - ${(1 - relativeScroll) * 96}px), -50%)`;
//             }
//             this._photoCard.style.opacity = `${relativeScroll}`;

//             if (relativeScroll < 0.5) {
//                 if (this._vertical) {
//                     this._nameHeader.style.transform = 'translate(-50%, -100%)';
//                 } else {
//                     this._nameHeader.style.transform = `translate(0, calc(-100% - ${
//                         regionRelativeScroll(0, 0.5) * 24
//                     }px))`;
//                 }
//             }
//             if (relativeScroll > 0.5) {
//                 if (this._vertical) {
//                     this._infoData.style.transform = `
//                         translate(-50%, calc(${(1 - regionRelativeScroll(0.5, 1)) * 96}px - 15%))`;
//                 } else {
//                     this._infoData.style.transform = `
//                         translate(calc(${(1 - regionRelativeScroll(0.5, 1)) * 96}px), -50%)`;
//                 }
//                 this._infoData.style.opacity = `${regionRelativeScroll(0.5, 1)}`;
//             }
//         };

//         this.scroller.handleScroll(this.scrollRange, closeMin, closeMax, inRange);
//     }
// }
