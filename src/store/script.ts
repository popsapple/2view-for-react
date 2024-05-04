import { selector, atom } from 'recoil';
export type sentenceType = {
    sentence: string,
    unscramble: string,
    start: string,
    end: string,
    idx: number
};
export const selectorQueriedScriptInfo = selector<{url: string, scripts: sentenceType[]}>({
    key: 'queriedScriptInfo',
    get: async () => {
        const response = await fetch('/api/sripts');
        return await response.json();
    },
});

export const atomSelectedScript = atom<sentenceType[]>({
    key: 'selectedScript',
    default: [],
});