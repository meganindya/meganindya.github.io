export type TRange = {
    min: number;
    max: number;
};

export type TTarget = 'intro' | 'ambition' | 'exploration' | 'footer';

export type TScrollMsg =
    | { area: 'inside'; target: TTarget }
    | { area: 'moving'; entering: TTarget; exiting: TTarget };
// eslint-disable-next-line no-unused-vars
export type TScrollHandler = (message: TScrollMsg) => void;
