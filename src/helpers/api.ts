import { UserType } from "@/global/store";

export const handleUserSignup = async (userInput: {
  email: string;
  password: string;
  username: string;
}): Promise<UserType> => {
  const response = await fetch("/api/generateHash", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInput),
  });
  const result = await response.json();

  const { email, username } = userInput;
  const userData: UserType = {
    email: email,
    displayName: username,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    likedProblems: [],
    dislikedProblems: [],
    solvedProblems: [],
    starredProblems: [],
    solution: {},
  };

  const users = JSON.parse((localStorage.getItem("users") as string) || "{}");
  users[result.token] = userData;

  localStorage.setItem("users", JSON.stringify(users));
  sessionStorage.setItem("current-user", result.token);

  return userData;
};

export const handleLogin = async (userData: {
  email: string;
  password: string;
}): Promise<UserType | null> => {
  const response = await fetch("/api/generateHash", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  const result = await response.json();
  const users = localStorage.getItem("users");
  if (!users) return null;
  const currentUser = JSON.parse(users)[result.token] as UserType;
  if (JSON.parse(users)[result.token]) {
    sessionStorage.setItem("current-user", result.token);
    return currentUser;
  } else {
    return null;
  }
};

export const handleUserUpdate = (updatedUserData: any) => {
  const currentUserToken = sessionStorage.getItem("current-user") as string;
  const users = JSON.parse(localStorage.getItem("users") as string);
  users[currentUserToken] = updatedUserData;
  localStorage.setItem("users", JSON.stringify(users));
};

export const handleGetUserDetails = () => {
  const currentUserToken = sessionStorage.getItem("current-user") as string;
  const users = JSON.parse(localStorage.getItem("users") as string);
  return users[currentUserToken];
};

export const handleLogout = () => {
  sessionStorage.removeItem("current-user");
};
