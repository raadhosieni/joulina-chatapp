
export default function logout(authContext) {
    authContext.login = false;
    window.sessionStorage.removeItem('username');
    window.location = "/";
}