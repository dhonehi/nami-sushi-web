import Vue from 'vue';
import Vuex from 'vuex';
import pages from './modules/pages'
import user from './modules/user'
import products from './modules/products'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        pages, user, products
    }
})