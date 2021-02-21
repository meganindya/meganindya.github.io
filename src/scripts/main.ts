import '../styles/main.scss';

import { TScrollMsg } from './@types/main';
import { ScrollHandler, Scroller } from './scroll';
import Intro from './components/intro';

window.addEventListener('load', () => {
    const scroller = new Scroller();
    const intro = new Intro(scroller);

    const objMap: { [key: string]: { scrollUpdate: () => void } | null } = {
        intro,
        footer: null
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

    intro.scrollRange = scrollHandler.getRange('intro');
});
