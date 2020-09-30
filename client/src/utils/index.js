
export const logout = () => {
    localStorage.removeItem("login-accesstoken");
    
}
export const isLogin = () => {
    if (localStorage.getItem("login-accesstoken")) {
        return true;
    }
    return false;
}
 
