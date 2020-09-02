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
		cart: [],
		fav: []
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
		let isAdded = false
		state.user.cart.forEach((item, index) => {
			if (item.name === product.name) {
				state.user.cart[index].count++;
				isAdded = true;
			}
		})
		if (!isAdded) state.user.cart.push({...product, count: 1});
	},
	addToFav(state, product) {
		if (!state.user.fav.includes(product))
			state.user.fav.push(product);
	},
	removeFromCart(state, product) {
		state.user.cart.forEach((item, index) => {
			if (item.name === product.name) {
				if (item.count === 1) state.user.cart.splice(index, 1);
				else state.user.cart[index].count--;
			}
		})
	},
	removeFromFav(state, product) {
		state.user.fav.forEach((item, index) => {
			if (item.name === product.name) {
				state.user.fav.splice(index, 1);
			}
		})
	},
	removeCompletely(state, product) {
		state.user.cart.forEach((item, index) => {
			if (item.name === product.name) {
				state.user.cart.splice(index, 1)
			}
		})
	},
	clearUserCart(state) {
		state.user.cart.splice(0);
	}
};

const getters = {
	lengthUserCart(state) {
		return state.user.cart.reduce((accumulator, current) =>
			accumulator + current.count,
			0
		);
	},
	userCart(state) {
		return state.user.cart;
	},
	userFav(state) {
		return state.user.fav;
	},
	lengthUserFav(state) {
		return state.user.fav.length;
	},
	isAddedToCart: state => product => {
		for (let i = 0; i < state.user.cart.length; ++i)
			if (product.name === state.user.cart[i].name) return true;

		return false;
	},
	isAddedToFav: state => product => {
		return state.user.fav.includes(product);
	},
	amountOfProduct: state => product => {
		for (let i = 0; i < state.user.cart.length; ++i)
			if (state.user.cart[i].name === product.name) return state.user.cart[i].count;

		return 0;
	},

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
