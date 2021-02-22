/* eslint-disable no-unused-vars */
import { Scrollable, Scroller } from '../scroll';

export default class Ambition extends Scrollable {
    constructor(scroller: Scroller) {
        super(
            {
                wrapper: document.getElementById('ambition-wrapper') as HTMLElement,
                container: document.getElementById('ambition-container') as HTMLElement,
                header: document.getElementById('ambition-header') as HTMLElement
            },
            scroller
        );
    }

    private _updateSizes(): void {
        1;
    }

    protected refreshSizes(): void {
        this._updateSizes();

        [...document.getElementsByClassName('ambition-card-img')].forEach(
            (img) => ((img as HTMLElement).style.width = `${document.body.offsetWidth / 2}px`)
        );
    }

    public scrollUpdate(): void {
        const windowHeight = window.innerHeight;

        const closeMin = () => {
            this.elements['header'].style.position = 'sticky';
            this.elements['header'].style.top = '0';
        };

        const closeMax = () => {
            1;
        };

        const inRange = (utils: { vhRelativeScroll?: () => number }) => {
            const vhScrollPos = utils.vhRelativeScroll?.() as number;

            this.elements['header'].style.position = 'absolute';
            this.elements['header'].style.top = `${windowHeight}px`;

            if (vhScrollPos < 0.8) {
                (document.getElementById('ambition-cards') as HTMLElement).style.position =
                    'absolute';
                (document.getElementById('ambition-cards') as HTMLElement).style.top = '180vh';
            } else {
                (document.getElementById('ambition-cards') as HTMLElement).style.position =
                    'sticky';
                (document.getElementById('ambition-cards') as HTMLElement).style.top = '0';
            }

            const index = Math.floor(vhScrollPos);
            const cards = [...document.getElementsByClassName('ambition-card')] as HTMLElement[];
            const operatingCards = {
                prev: index === 0 ? null : cards[index - 1],
                curr: cards[index],
                next: index === 4 ? null : cards[index + 1]
            };

            cards.forEach((card) => (card.style.visibility = 'hidden'));
            operatingCards.curr.style.visibility = 'visible';

            const currOffset = vhScrollPos % 1;
            const relativePos = (min: number, max: number) => (currOffset - min) / (max - min);

            const fadeInCard = (min: number, max: number) => {
                operatingCards.curr.style.opacity = `${relativePos(min, max)}`;
            };
            const fadeInHeader = (min: number, max: number) => {
                ((operatingCards.curr.childNodes[0] as HTMLElement)
                    .childNodes[0] as HTMLElement).style.opacity = `${relativePos(min, max)}`;
            };
            const fadeInP1 = (min: number, max: number) => {
                ((operatingCards.curr.childNodes[0] as HTMLElement)
                    .childNodes[1] as HTMLElement).style.opacity = `${relativePos(min, max)}`;
            };
            const fadeInP2 = (min: number, max: number) => {
                ((operatingCards.curr.childNodes[0] as HTMLElement)
                    .childNodes[2] as HTMLElement).style.opacity = `${relativePos(min, max)}`;
            };
            const fadeOutCard = (min: number, max: number) => {
                operatingCards.curr.style.opacity = `${1 - relativePos(min, max)}`;
            };

            if (index === 0) {
                fadeInHeader(0, 0.15);
                fadeInP1(0.15, 0.3);
                fadeInP2(0.3, 0.45);
                fadeOutCard(0.85, 1);
            } else {
                fadeInCard(0, 0.2);
                fadeInHeader(0.2, 0.35);
                fadeInP1(0.35, 0.5);
                fadeInP2(0.5, 0.65);
                if (index !== 4) {
                    fadeOutCard(0.85, 1);
                }
            }
        };

        this.scroller.handleScroll(this.scrollRange, closeMin, closeMax, inRange);
    }
}
