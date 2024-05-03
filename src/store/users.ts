import { atom } from 'recoil';
export const atomUserList = atom<{id: string}[]>({
    key: 'userListInClass',
    default: [],
});

export const atomUserInfo = atom<{id: string} | null>({
    key: 'userInfo',
    default: null,
});