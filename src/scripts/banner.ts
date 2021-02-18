import { TScrollRange } from './@types/main';

export default class {
    private _bannerPrimary = {
        element: document.getElementById('banner-primary') as HTMLElement,
        width: { min: 0, max: 0 },
        height: { min: 0, max: 0 },
        offset: { top: 0, bottom: 0 },
        scrollRange: { min: 0, max: 0 }
    };

    constructor() {
        this._updateSizes();
        window.addEventListener('resize', () => {
            this._updateSizes();
            this.scrollUpdate();
        });
    }

    public set scrollRange(scrollRange: TScrollRange) {
        this._bannerPrimary.scrollRange = scrollRange;
    }

    private _updateSizes(): void {
        const bannerPrimaryWrapperDimens = (document.getElementById(
            'banner-wrapper'
        ) as HTMLElement)?.getBoundingClientRect();

        this._bannerPrimary.offset.top = bannerPrimaryWrapperDimens.top;
        this._bannerPrimary.offset.bottom = window.innerHeight - bannerPrimaryWrapperDimens.bottom;

        this._bannerPrimary.width = {
            min: bannerPrimaryWrapperDimens.width,
            max: window.innerWidth
        };
        this._bannerPrimary.height = {
            min: bannerPrimaryWrapperDimens.height,
            max: window.innerHeight
        };
        this._bannerPrimary.element.style.top = `${-this._bannerPrimary.offset.top}px`;
    }

    public scrollUpdate(): void {
        const scrollPos = window.scrollY;

        if (
            scrollPos < this._bannerPrimary.scrollRange.min ||
            scrollPos > this._bannerPrimary.scrollRange.max
        ) {
            const bannerWidth = this._bannerPrimary.element.clientWidth;

            if (scrollPos < this._bannerPrimary.scrollRange.min) {
                this._bannerPrimary.element.style.width = `${Math.max(
                    bannerWidth,
                    this._bannerPrimary.width.max
                )}px`;
                this._bannerPrimary.element.style.height = `${Math.max(
                    bannerWidth,
                    this._bannerPrimary.height.max
                )}px`;
                this._bannerPrimary.element.style.top = `${-this._bannerPrimary.offset.top}px`;
            } else {
                this._bannerPrimary.element.style.width = `${Math.min(
                    bannerWidth,
                    this._bannerPrimary.width.min
                )}px`;
                this._bannerPrimary.element.style.height = `${Math.min(
                    bannerWidth,
                    this._bannerPrimary.height.min
                )}px`;
                this._bannerPrimary.element.style.top = '0';
            }
            return;
        }

        const relativeScroll =
            (scrollPos - this._bannerPrimary.scrollRange.min) /
            (this._bannerPrimary.scrollRange.max - this._bannerPrimary.scrollRange.min);
        this._bannerPrimary.element.style.width = `${
            this._bannerPrimary.width.max -
            relativeScroll * (this._bannerPrimary.width.max - this._bannerPrimary.width.min)
        }px`;
        this._bannerPrimary.element.style.height = `${
            this._bannerPrimary.height.max -
            relativeScroll * (this._bannerPrimary.height.max - this._bannerPrimary.height.min)
        }px`;
        this._bannerPrimary.element.style.top = `${
            (relativeScroll - 1) * this._bannerPrimary.offset.top
        }px`;
    }
}
