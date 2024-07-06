const USER_ROLE = "idUser";
const TOKEN = "token";

export function setAuth(idUser, token) {
    sessionStorage.setItem(USER_ROLE, idUser);
    sessionStorage.setItem(TOKEN, token);
}

export function logOut() {
    sessionStorage.removeItem(USER_ROLE);
    sessionStorage.removeItem(TOKEN);
}

export function getAuth() {
    return sessionStorage.getItem("token");
}

export const isAuthenticated = () => {
    return !!sessionStorage.getItem("token");
};

export const getUserRole = () => {
    return sessionStorage.getItem(USER_ROLE);
};
