import { atom } from "recoil";

type Solution = {
  [key: string]: string;
};

export interface UserType {
  email: string;
  displayName: string;
  createdAt: number;
  updatedAt: number;
  likedProblems: string[];
  dislikedProblems: string[];
  solvedProblems: string[];
  starredProblems: string[];
  solution: Solution;
}

interface UserStoreType {
  currentUser: null | UserType;
}

export const userStore = atom<UserStoreType>({
  key: "UserStore",
  default: {
    currentUser: null,
  },
});
