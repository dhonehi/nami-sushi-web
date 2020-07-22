import axios from 'axios'

let isLoggedIn;
let name = localStorage.getItem('name');
let phone = localStorage.getItem('phone')
let token = localStorage.getItem('token');
let email = localStorage.getItem('email');
if (email !== null || undefined) {
    isLoggedIn = true;
} else {
    isLoggedIn = false;
    name = null;
    phone = null;
    token = null;
    email = null;
}

const state = () => ({
    user: {
        isLoggedIn,
        name,
        phone,
        token,
        email,
        cart: []
    }
});
const mutations = {
    saveUser(state, {name, phone, token, email}) {
        localStorage.setItem('name', name);
        localStorage.setItem('phone', phone);
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);
        state.user.isLoggedIn = true;
        state.user.name = name;
        state.user.phone = phone;
        state.user.token = token;
        state.user.email = email;
    },
    logOut(state) {
        localStorage.removeItem('name');
        localStorage.removeItem('phone');
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        state.user.name = null;
        state.user.phone = null;
        state.user.token = null;
        state.user.email = null;
    },
    addToCart(state, product) {
        if (!state.user.cart.includes(product))
            state.user.cart.push(product)
    }
};

const getters = {
    userCart(state) {
        return state.user.cart
    }
};

const actions = {
    async logIn({commit}, userData) {
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            data: userData,
            url: 'http://95.216.143.170:9000/authenticate'
        };
        return axios(options).then(response => {
            commit('saveUser', {...response.data, email: userData.email})
            console.log(response.data)
            return response
        }).catch(error => {
            return error.response
        })

    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
