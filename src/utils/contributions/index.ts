import data from './data.json';
import { drawContributions as draw } from './draw';

interface DataStructYear {
    year: string;
    total: number;
    range: {
        start: string;
        end: string;
    };
}

interface DataStructContribution {
    date: string;
    count: number;
    color: string;
    intensity: number;
}

interface DataStruct {
    years: DataStructYear[];
    contributions: DataStructContribution[];
}

let _data: DataStruct = data as unknown as DataStruct;

{
    const startDate = '2019-10-06';

    let { years, contributions } = data;

    years = years.filter(({ year }) => Number(year) >= 2019);

    years[years.length - 1].range.start = startDate;
    years[years.length - 1].total--;

    _data = {
        years,
        contributions: contributions.filter(
            ({ date }) => new Date(date) >= new Date(startDate)
        ) as unknown as DataStructContribution[]
    };
}

export function drawContributions(canvas: HTMLCanvasElement, theme: 'light' | 'dark'): void {
    draw(canvas, {
        data: _data,
        username: 'meganindya',
        themeName: theme
    });
}
