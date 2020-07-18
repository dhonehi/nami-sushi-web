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
        return state.products;
    },
    productsByCategory: state => (category = 'Все категории') => {
        if (category === 'Все категории')
            return state.products;
        else
            return state.products.filter(product =>
                product.categories.some(item => item.name === category)
            )
    },
    categories(state) {
        state.categories.unshift({_id: 'all', name: 'Все категории'})
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
     loadData({commit}) {

        const products = axios.get('http://95.216.143.170:9000/products')
        const categories = axios.get('http://95.216.143.170:9000/categories')

        return Promise.all([products, categories]).then(response => {
            response[0].data.forEach(product => {
                product.images[0] = 'http://95.216.143.170:9000/image/' + product.images[0];
                if (product.on_sale) product.price = product.sale_price;
            })
            commit('saveData', response);
            return 200;
        }).catch(() => {
            return 401
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