export const getCurrentUserFromStorage = () => {
    const currentUserId  = sessionStorage.getItem("current-user") as string;
    const users = JSON.parse(localStorage.getItem("users") || "{}")
    return users[currentUserId] || null
}