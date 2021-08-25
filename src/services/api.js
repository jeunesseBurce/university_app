const setLoggedIn = isLoggedIn => localStorage.setItem('isLoggedIn', isLoggedIn);
const clearLoggedIn = () => localStorage.removeItem('isLoggedIn');
const setEmail = email => localStorage.setItem('email', email);
const clearEmail = () => localStorage.removeItem('email');



const isLoggedIn = () => {
   let status = localStorage.getItem('isLoggedIn');

   return status;
};

const login = (data) => {
    if (data.email && data.password) {
        setLoggedIn(true);
    } 
}

const logout = () => {
    clearLoggedIn();
    clearEmail();
}

export {
    isLoggedIn,
    login,
    logout,
    setLoggedIn
}