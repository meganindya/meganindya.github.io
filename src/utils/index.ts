import markdown from '@wcj/markdown-to-html';

import projects from './projects.json';

let _profileMD = '';
let _projects: { title: string; desc: string; images: string[] }[] = [];

export async function init(): Promise<void> {
    return new Promise((resolve) => {
        (async () => {
            const _profilePromise = fetch(
                'https://raw.githubusercontent.com/meganindya/meganindya/main/README.md'
            );

            const _projectPromises = projects.map(
                ({ images }) =>
                    new Promise<Response[]>((resolve) => {
                        const imagePromises = images.map((imagePath) => fetch(imagePath));
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
                    desc: projects[i].desc,
                    images: []
                };

                responses.forEach((response, j) => {
                    if (response.ok) {
                        (async () => {
                            const blob = await response.blob();

                            const reader = new FileReader();
                            reader.onload = (e) =>
                                (_projects[i].images[j] = e.target!.result as string);
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

export function getProjects(): { title: string; desc: string; images: string[] }[] {
    return _projects;
}
