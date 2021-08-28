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
        setEmail(data.email);
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

const searchByName = async (params) => {
    let searchParams = {};
    let { name } = params;
    if (name) searchParams.name = name;

    const response = await fetch('http://universities.hipolabs.com/' + 'search?' 
    + new URLSearchParams(searchParams), {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
    });

    return response.json(); 
}

const searchByCountry = async (params) => {
    let searchParams = {};
    let { country } = params;
    if (country) searchParams.country = country;

    const response = await fetch('http://universities.hipolabs.com/' + 'search?'
    + new URLSearchParams(searchParams), {
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
    getAllUniversities,
    searchByName,
    searchByCountry
}