import '../../assets/images/projects/icmc.png';
import '../../assets/images/projects/lms-1.png';
import '../../assets/images/projects/lms-2.png';
import '../../assets/images/projects/lms-3.png';
import '../../assets/images/projects/lms-4.png';
import '../../assets/images/projects/lms-5.png';
import '../../assets/images/projects/route-1.png';
import '../../assets/images/projects/route-2.png';
import '../../assets/images/projects/route-3.png';
import '../../assets/images/projects/route-4.png';
import '../../assets/images/projects/route-5.png';
import '../../assets/images/projects/sudoku-1.png';
import '../../assets/images/projects/sudoku-2.png';
import '../../assets/images/projects/sudoku-3.png';
import '../../assets/images/projects/sudoku-4.png';
import '../../assets/images/projects/mine-1.png';
import '../../assets/images/projects/mine-2.png';
import '../../assets/images/projects/mine-3.png';
import '../../assets/images/projects/mine-4.png';
import '../../assets/images/projects/snl-1.png';
import '../../assets/images/projects/snl-2.png';
import '../../assets/images/projects/snl-3.png';
import '../../assets/images/projects/lex-1.jpg';
import '../../assets/images/projects/lex-2.jpg';
import '../../assets/images/projects/lex-3.jpg';
import '../../assets/images/projects/lex-4.jpg';
import '../../assets/images/projects/lex-5.jpg';
import '../../assets/images/projects/toddle-1.jpg';
import '../../assets/images/projects/toddle-2.jpg';
import '../../assets/images/projects/toddle-3.jpg';

import { Scrollable, Scroller } from '../scroll';

export default class Projects extends Scrollable {
    constructor(scroller: Scroller) {
        super(
            {
                wrapper: document.getElementById('projects-wrapper') as HTMLElement,
                header: document.getElementById('projects-header') as HTMLElement,
                cards: document.getElementById('project-cards') as HTMLElement
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
            1;
        };

        const inRange = (utils: { vhRelativeScroll?: () => number }) => {
            const vhScrollPos = utils.vhRelativeScroll?.() as number;

            const cards = [...this.elements['cards'].childNodes] as HTMLElement[];
            cards.forEach((card) => (card.style.visibility = 'hidden'));

            const handleTransition = (
                card: HTMLElement,
                min: number,
                max: number,
                // eslint-disable-next-line no-unused-vars
                inRange: (hero: HTMLElement) => void
            ) => {
                card.style.visibility = 'visible';
                const hero = card.childNodes[0] as HTMLElement;
                const label = card.childNodes[1] as HTMLElement;

                if (vhScrollPos >= min && vhScrollPos < min + 0.5) {
                    if (vhScrollPos >= min + 0 && vhScrollPos < min + 0.1) {
                        hero.style.transform = `rotateY(${90 - 18}deg)`;
                    } else if (vhScrollPos >= min + 0.1 && vhScrollPos < min + 0.2) {
                        hero.style.transform = `rotateY(${90 - 36}deg)`;
                    } else if (vhScrollPos >= min + 0.2 && vhScrollPos < min + 0.3) {
                        hero.style.transform = `rotateY(${90 - 54}deg)`;
                    } else if (vhScrollPos >= min + 0.3 && vhScrollPos < min + 0.4) {
                        hero.style.transform = `rotateY(${90 - 72}deg)`;
                    } else if (vhScrollPos >= min + 0.4 && vhScrollPos < min + 0.5) {
                        hero.style.transform = `rotateY(${90 - 90}deg)`;
                    }
                    label.style.opacity = `${vhScrollPos / 0.5}`;
                } else if (vhScrollPos >= min + 0.5 && vhScrollPos < max - 0.5) {
                    hero.style.transform = 'rotateY(0deg)';
                    inRange(hero);
                    label.style.opacity = '1';
                } else {
                    if (vhScrollPos >= max - 0.5 && vhScrollPos < max - 0.4) {
                        hero.style.transform = `rotateY(${72 - 90}deg)`;
                    } else if (vhScrollPos >= max - 0.4 && vhScrollPos < max - 0.3) {
                        hero.style.transform = `rotateY(${54 - 90}deg)`;
                    } else if (vhScrollPos >= max - 0.3 && vhScrollPos < max - 0.2) {
                        hero.style.transform = `rotateY(${36 - 90}deg)`;
                    } else if (vhScrollPos >= max - 0.2 && vhScrollPos < max - 0.1) {
                        hero.style.transform = `rotateY(${18 - 90}deg)`;
                    } else {
                        hero.style.transform = `rotateY(${0 - 90}deg)`;
                    }
                    label.style.opacity = `${1 - (vhScrollPos - (max - 0.5)) / 0.5}`;
                }
            };

            const relativePos = (min: number, max: number) => (vhScrollPos - min) / (max - min);

            if (vhScrollPos >= 0 && vhScrollPos < 1) {
                1;
            } else if (vhScrollPos >= 1 && vhScrollPos < 3) {
                handleTransition(cards[0], 1, 3, (hero: HTMLElement) => {
                    const relPos = relativePos(1.5, 2.5);
                    hero.style.background = 'url(assets/icmc.png) no-repeat';
                    hero.style.backgroundSize = '100% auto';
                    hero.style.backgroundPosition = `center ${relPos * 100}%`;
                });
                if (vhScrollPos < 1.6) {
                    this.elements['header'].style.opacity = '1';
                } else {
                    this.elements['header'].style.opacity = '0';
                }
            } else if (vhScrollPos >= 3 && vhScrollPos < 5) {
                handleTransition(cards[1], 3, 5, (hero: HTMLElement) => {
                    const relPos = relativePos(3.5, 4.5);
                    hero.style.background = `
                        url(assets/lms-${Math.ceil(relPos / 0.2)}.png) no-repeat`;
                    hero.style.backgroundSize = 'contain';
                    hero.style.backgroundPosition = 'center';
                });
            } else if (vhScrollPos >= 5 && vhScrollPos < 7) {
                handleTransition(cards[2], 5, 7, (hero: HTMLElement) => {
                    const relPos = relativePos(5.5, 6.5);
                    hero.style.background = `
                        url(assets/route-${Math.ceil(relPos / 0.2)}.png) no-repeat`;
                    hero.style.backgroundSize = 'contain';
                    hero.style.backgroundPosition = 'center';
                });
            } else if (vhScrollPos >= 7 && vhScrollPos < 9) {
                handleTransition(cards[3], 7, 9, (hero: HTMLElement) => {
                    const relPos = relativePos(7.5, 8.5);
                    hero.style.background = `
                        url(assets/sudoku-${Math.ceil(relPos / 0.25)}.png) no-repeat`;
                    hero.style.backgroundSize = 'contain';
                    hero.style.backgroundPosition = 'center';
                });
            } else if (vhScrollPos >= 9 && vhScrollPos < 11) {
                handleTransition(cards[4], 9, 11, (hero: HTMLElement) => {
                    const relPos = relativePos(9.5, 10.5);
                    hero.style.background = `
                        url(assets/mine-${Math.ceil(relPos / 0.25)}.png) no-repeat`;
                    hero.style.backgroundSize = 'contain';
                    hero.style.backgroundPosition = 'center';
                });
            } else if (vhScrollPos >= 11 && vhScrollPos < 13) {
                handleTransition(cards[5], 11, 13, (hero: HTMLElement) => {
                    const relPos = relativePos(11.5, 12.5);
                    hero.style.background = `
                        url(assets/snl-${Math.ceil(relPos / (1 / 3))}.png) no-repeat`;
                    hero.style.backgroundSize = 'contain';
                    hero.style.backgroundPosition = 'center';
                });
            } else if (vhScrollPos >= 13 && vhScrollPos < 15) {
                handleTransition(cards[6], 13, 15, (hero: HTMLElement) => {
                    const relPos = relativePos(13.5, 14.5);
                    hero.style.background = `
                        url(assets/lex-${Math.ceil(relPos / 0.2)}.jpg) no-repeat`;
                    hero.style.backgroundSize = 'contain';
                    hero.style.backgroundPosition = 'center';
                });
            } else {
                handleTransition(cards[7], 15, 17, (hero: HTMLElement) => {
                    const relPos = relativePos(15.5, 16.5);
                    hero.style.background = `
                        url(assets/toddle-${Math.ceil(relPos / (1 / 3))}.jpg) no-repeat`;
                    hero.style.backgroundSize = 'contain';
                    hero.style.backgroundPosition = 'center';
                });
            }
        };

        this.scroller.handleScroll(this.scrollRange, closeMin, closeMax, inRange);
    }
}
