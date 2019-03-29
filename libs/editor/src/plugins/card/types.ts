export type CardAppearance = 'inline' | 'block';
export type CardType = 'smart-card' | 'custom' | 'unsupported';

export interface CardProvider {
    resolve(url: string, appearance: CardAppearance): Promise<any>;
}

export interface CardOptions {
    provider?: Promise<CardProvider>;
}

export interface Request {
    pos: number;
    url: string;
    appearance: CardAppearance;
}

export interface CardPluginState {
    requests: Request[];
    provider: CardProvider | null;
}

// actions
export interface SetProvider {
    type: 'SET_PROVIDER';
    provider: CardProvider | null;
}

export interface Queue {
    type: 'QUEUE';
    requests: Request[];
}

export interface Resolve {
    type: 'RESOLVE';
    url: string;
}

export type CardPluginAction = SetProvider | Queue | Resolve;
