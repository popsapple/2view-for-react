import { atom } from 'recoil';
export const atomUserList = atom<{id: string}[]>({
    key: 'userListInClass',
    default: [],
});