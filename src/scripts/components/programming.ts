import { Scrollable, Scroller } from '../scroll';

export default class Programming extends Scrollable {
    constructor(scroller: Scroller) {
        super(
            {
                'wrapper': document.getElementById('programming-wrapper') as HTMLElement,
                'background': document.getElementById('programming-background') as HTMLElement,
                'container': document.getElementById('programming-container') as HTMLElement,
                'programming-cards': document.getElementById('programming-cards') as HTMLElement
            },
            scroller
        );
    }

    protected refreshSizes(): void {
        1;
    }

    public scrollUpdate(): void {
        const closeMin = () => {
            1;
        };

        const closeMax = () => {
            // this.elements['background'].style.opacity = '0';
        };

        const inRange = (utils: { vhRelativeScroll?: () => number }) => {
            const vhScrollPos = utils.vhRelativeScroll?.() as number;

            [...this.elements['programming-cards'].childNodes].forEach(
                (item) => ((item as HTMLElement).style.visibility = 'hidden')
            );

            const background = this.elements['background'];
            const backgrounds = ['#f00', '#0f0', '#00f', '#ff0', '#f0f'];

            const handleCard = (index: number, min: number, max: number) => {
                background.style.background = `${backgrounds[index]}`;
                background.style.backgroundSize = 'cover';
                const elem = this.elements['programming-cards'].childNodes[index] as HTMLElement;
                elem.style.visibility = 'visible';

                const relativePos = (vhScrollPos - min) / (max - min);
                if (relativePos >= 0 && relativePos < 0.3) {
                    const regionRelativePos = (relativePos - 0) / (0.3 - 0);
                    background.style.opacity = `${regionRelativePos}`;
                    elem.style.top = `${65 - regionRelativePos * 15}%`;
                    elem.style.opacity = `${regionRelativePos}`;
                } else if (relativePos >= 0.7 && relativePos < 1) {
                    const regionRelativePos = (relativePos - 0.7) / (1 - 0.7);
                    elem.style.top = `${50 - regionRelativePos * 15}%`;
                    elem.style.opacity = `${1 - regionRelativePos}`;
                    if (index !== 4) {
                        background.style.opacity = `${1 - regionRelativePos}`;
                    }
                } else {
                    background.style.opacity = '1';
                    elem.style.opacity = '1';
                }
            };

            if (vhScrollPos >= 0 && vhScrollPos < 1) {
                background.style.opacity = '0';
            } else if (vhScrollPos >= 1 && vhScrollPos < 2) {
                handleCard(0, 1, 2);
            } else if (vhScrollPos >= 2 && vhScrollPos < 3) {
                handleCard(1, 2, 3);
            } else if (vhScrollPos >= 3 && vhScrollPos < 4) {
                handleCard(2, 3, 4);
            } else if (vhScrollPos >= 4 && vhScrollPos < 5) {
                handleCard(3, 4, 5);
            } else if (vhScrollPos >= 5 && vhScrollPos < 6) {
                handleCard(4, 5, 6);
            } else {
                background.style.background = `${backgrounds[4]}`;
                background.style.opacity = '1';
            }
        };

        this.scroller.handleScroll(this.scrollRange, closeMin, closeMax, inRange);
    }
}
