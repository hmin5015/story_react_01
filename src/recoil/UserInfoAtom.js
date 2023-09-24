import { atom, selector } from "recoil";

export const UserInfoAtom = atom({
  key: "UserInfoAtom",
  default: false,
});

export const UserInfoSelector = selector({
  key: "UserInfoSelector",
  get: ({ get }) => {
    const isUserInfoOpen = get(UserInfoAtom);
    return isUserInfoOpen;
  },
});
