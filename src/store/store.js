import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        sideBarActive: 'main'
    },
    mutations: {
        setSideBarActive: function (state, active) {
            state.sideBarActive = active
        }
    },
    actions: {

    },
    modules: {

    }
})