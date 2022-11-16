import markdown from '@wcj/markdown-to-html';

import projects from './projects.json';
import highlight from './highlight.md';

let _profileMD = '';
let _projects: {
    title: string;
    tech: Record<string, string>;
    repo?: string;
    summary: string;
    desc?: string;
    links: string[];
}[] = [];

export async function init(): Promise<void> {
    return new Promise((resolve) => {
        (async () => {
            const _profilePromise = fetch(
                'https://raw.githubusercontent.com/meganindya/meganindya/main/README.md'
            );

            // const _highlightPromise = import(`./${'highlight'}.md`);
            // _highlightPromise.then((res) => res.text()).then((res) => console.log(res));

            const _projectPromises = projects.map(
                ({ links }) =>
                    new Promise<Response[]>((resolve) => {
                        const imagePromises = links.map((link) => fetch(link));
                        (async () => {
                            resolve(await Promise.all(imagePromises));
                        })();
                    })
            );

            const [responseProfile, ...responseProjects] = await Promise.all([
                _profilePromise,
                ..._projectPromises
            ]);

            if (responseProfile.ok) {
                _profileMD = await responseProfile.text();
            }

            responseProjects.forEach((responses, i) => {
                _projects[i] = {
                    title: projects[i].title,
                    tech: projects[i].tech as unknown as Record<string, string>,
                    summary: projects[i].summary,
                    links: []
                };

                if ('repo' in projects[i]) _projects[i].repo = projects[i].repo;
                if ('desc' in projects[i]) _projects[i].desc = projects[i].desc;

                responses.forEach((response, j) => {
                    if (response.ok) {
                        (async () => {
                            const blob = await response.blob();

                            const reader = new FileReader();
                            reader.onload = (e) =>
                                (_projects[i].links[j] = e.target!.result as string);
                            reader.readAsDataURL(blob);
                        })();
                    }
                });
            });

            resolve();
        })();
    });
}

export function getProfileHTML(): string {
    return markdown(_profileMD) as string;
}

export function getProjects(): {
    title: string;
    tech: Record<string, string>;
    repo?: string;
    summary: string;
    desc?: string;
    links: string[];
}[] {
    return _projects;
}

export function getHighlightHTML(): string {
    return markdown(highlight) as string;
}

export function getMDToHTML(md: string): string {
    return markdown(md) as string;
}

export { drawContributions } from './contributions';
