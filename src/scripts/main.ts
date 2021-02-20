import '../styles/main.scss';

import { TScrollMsg } from './@types/main';
import { ScrollHandler, Scroller } from './scroll';
import { BannerPrimary, BannerSecondary } from './banner';

window.addEventListener('load', () => {
    const scroller = new Scroller();
    const bannerPrimary = new BannerPrimary(scroller);
    const bannerSecondary = new BannerSecondary(scroller);

    const objMap: { [key: string]: { scrollUpdate: () => void } | null } = {
        'banner-primary': bannerPrimary,
        'banner-secondary': bannerSecondary,
        'footer': null
    };

    const scrollHandler = new ScrollHandler((message: TScrollMsg) => {
        if (message.area === 'inside') {
            const target = objMap[message.target];
            if (target !== null) target.scrollUpdate();
        } else {
            const entering = objMap[message.entering];
            if (entering !== null) entering.scrollUpdate();
            const exiting = objMap[message.exiting];
            if (exiting !== null) exiting.scrollUpdate();
        }
    });

    bannerPrimary.scrollRange = scrollHandler.getRange('banner-primary');
    bannerSecondary.scrollRange = scrollHandler.getRange('banner-secondary');
});
