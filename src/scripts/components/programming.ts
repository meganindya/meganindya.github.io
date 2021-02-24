import { Scrollable, Scroller } from '../scroll';

export default class Programming extends Scrollable {
    constructor(scroller: Scroller) {
        super(
            {
                'wrapper': document.getElementById('programming-wrapper') as HTMLElement,
                'backgrounds': document.getElementById('programming-backgrounds') as HTMLElement,
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

            const backgrounds = [...this.elements['backgrounds'].childNodes] as HTMLElement[];
            backgrounds.forEach((background) => (background.style.visibility = 'hidden'));

            const handleCard = (index: number, min: number, max: number) => {
                backgrounds[index].style.visibility = 'visible';

                const elem = this.elements['programming-cards'].childNodes[index] as HTMLElement;
                elem.style.visibility = 'visible';

                const relativePos = (vhScrollPos - min) / (max - min);
                if (relativePos >= 0 && relativePos < 0.3) {
                    const regionRelativePos = (relativePos - 0) / (0.3 - 0);
                    backgrounds[index].style.opacity = `${regionRelativePos}`;
                    elem.style.top = `${65 - regionRelativePos * 15}%`;
                    elem.style.opacity = `${regionRelativePos}`;
                } else if (relativePos >= 0.7 && relativePos < 1) {
                    const regionRelativePos = (relativePos - 0.7) / (1 - 0.7);
                    elem.style.top = `${50 - regionRelativePos * 15}%`;
                    elem.style.opacity = `${1 - regionRelativePos}`;
                    if (index !== 4) {
                        backgrounds[index].style.opacity = `${1 - regionRelativePos}`;
                    }
                } else {
                    backgrounds[index].style.opacity = '1';
                    elem.style.opacity = '1';
                }
            };

            if (vhScrollPos >= 0 && vhScrollPos < 1) {
                backgrounds[0].style.opacity = '0';
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
                backgrounds[4].style.visibility = 'visible';
                backgrounds[4].style.opacity = '1';
            }
        };

        this.scroller.handleScroll(this.scrollRange, closeMin, closeMax, inRange);
    }
}
