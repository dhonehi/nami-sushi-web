import axios from 'axios'

const state = () => ({
    products: [{
        _id: '',
        active: true,
        name: '',
        featured: false,
        description: '',
        short_description: '',
        price: 0,
        regular_price: 0,
        sale_price: 0,
        price_html: '',
        on_sale: false,
        images: [],
        /*categories: {
            _id: '',
            name: ''
        },*/
        categories: []
    }],
    categories: []
})

const getters = {
    products(state) {
        return state.products;
    },
    productsByCategory: state => category => {
        return state.products.filter(product =>
            product.categories.some(item => item.name === category)
        )
    },
    productsByPrice: state => priceArray => {
        return state.products.filter(product =>
            product.price >= priceArray[0] && product.price <= priceArray[1]
        )
    },
    categories(state) {
        return state.categories;
    }
}

const mutations = {
    saveData(state, data) {
        state.products = data[0].data;
        state.categories = data[1].data;
    },
    saveDataL(state, data) {
        state.products = data[0];
        state.categories = data[1];
    }
}

const actions = {
    loadData({commit}) {
        const products = axios.get(`${this.state.host}/products`)
        const categories = axios.get(`${this.state.host}/categories`)

        return Promise.all([products, categories]).then(response => {
            response[0].data.forEach(product => {
                if (product.on_sale) product.regular_price = product.sale_price;
            })
            commit('saveData', response);
            return 200;
        }).catch(() => {
            return 401
        })
    },
    loadDataL({commit}) {
        const products = require('../../assets/data/products.json');
        const categories = require('../../assets/data/categories.json');

        products.forEach(product => {
            if (product.on_sale) product.regular_price = product.sale_price
        })

        return new Promise((resolve => {
            resolve()
        })).then(() => {
            commit('saveDataL', [products, categories])
            return 200;
        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}