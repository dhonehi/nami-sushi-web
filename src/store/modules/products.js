import axios from 'axios'

const state = () => ({
    products: [{
        _id: '',
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
        categories: {
            _id: '',
            name: ''
        },
    }],
    categories: [{
        _id: '',
        name: ''
    }]
})

const getters = {
    products(state) {
        state.products.forEach(product => {
            product.images[0] = 'http://95.216.143.170:9000/image/' + product.images[0];
            if (product.on_sale) product.price = product.sale_price;
        })
        return state.products;
    },
    categories(state) {
        return state.categories;
    }
}

const mutations = {
    saveData(state, data) {
        state.products = data[0].data;
        state.categories = data[1].data;
    }
}

const actions = {
    async loadData({commit}) {

        const products = axios.get('http://95.216.143.170:9000/products')
        const categories = axios.get('http://95.216.143.170:9000/categories')

        return Promise.all([products, categories]).then(response => {
            if (response[0].status && response[1].status === 200) {
                commit('saveData', response);
                return 200;
            } else
                return 401;
        }).catch(error => {
            return error.response.status;
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