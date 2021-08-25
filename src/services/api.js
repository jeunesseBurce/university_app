import config from '../constants/serverConfig';

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

const getAllUniversities = async () => {
    const response = await fetch('http://universities.hipolabs.com/' + 'search', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
    });

    return response.json(); 
}

export {
    isLoggedIn,
    login,
    logout,
    setLoggedIn,
    getAllUniversities
}