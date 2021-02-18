import '../styles/main.scss';

import { TScrollMsg } from './@types/main';
import ScrollHandler from './scroll';
import Banners from './banner';

let scrollHandler: ScrollHandler;
let banners: Banners;

window.addEventListener('load', () => {
    window.scrollTo({ top: 0 });

    banners = new Banners();

    const objMap = {
        'banner-primary': banners,
        'footer': null
    };
    scrollHandler = new ScrollHandler((message: TScrollMsg) => {
        if (message.area === 'inside') {
            const target = objMap[message.target];
            if (target !== null)
                (objMap[message.target] as { scrollUpdate: () => void }).scrollUpdate();
        } else {
            const entering = objMap[message.entering];
            if (entering !== null)
                (objMap[message.entering] as { scrollUpdate: () => void }).scrollUpdate();
            const exiting = objMap[message.exiting];
            if (exiting !== null)
                (objMap[message.exiting] as { scrollUpdate: () => void }).scrollUpdate();
        }
    });

    banners.scrollRange = scrollHandler.getRange('banner-primary');
});
