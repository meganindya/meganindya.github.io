import markdown from '@wcj/markdown-to-html';

import projects from './projects.json';

export async function getProfileHTML(): Promise<string> {
    const profile = import.meta.env['VITE_PROFILE'] as string;

    let md = '';

    try {
        const res = await fetch(
            `https://raw.githubusercontent.com/${profile}/${profile}/main/README.md`
        );

        if (res.status === 200) {
            md = await res.text();
        }
    } catch (e) {
        // do nothing
    }

    const html = markdown(md) as string;

    return html;
}

export function getProjects(): { title: string; desc: string; images: string[] }[] {
    return projects;
}
