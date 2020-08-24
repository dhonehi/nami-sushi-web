const state = () => ({
    topBarActive: {
        path: '/main',
        index: 0
    }

});
const mutations = {
    setTopBarActive(state, page) {
        state.topBarActive = page
    }
};
export default {
    namespaced: true,
    state,
    mutations
};
