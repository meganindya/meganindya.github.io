import '../styles/main.scss';

import { TScrollMsg } from './@types/main';
import { ScrollHandler, Scroller } from './scroll';
import Intro from './components/intro';
import Ambition from './components/ambition';
import Exploration from './components/exploration';
import Programming from './components/programming';
import Projects from './components/projects';

window.addEventListener('load', () => {
    const scroller = new Scroller();
    const intro = new Intro(scroller);
    const ambition = new Ambition(scroller);
    const exploration = new Exploration(scroller);
    const programming = new Programming(scroller);
    const projects = new Projects(scroller);

    const objMap: { [key: string]: { scrollUpdate: () => void } | null } = {
        intro,
        ambition,
        exploration,
        programming,
        projects,
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
    ambition.scrollRange = scrollHandler.getRange('ambition');
    exploration.scrollRange = scrollHandler.getRange('exploration');
    programming.scrollRange = scrollHandler.getRange('programming');
    projects.scrollRange = scrollHandler.getRange('projects');
});
