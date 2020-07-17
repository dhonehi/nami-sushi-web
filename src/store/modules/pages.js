const state = () => ({
    sideBarActive: 'main'
});
const mutations = {
    setSideBarActive(state, active) {
        state.sideBarActive = active
    }
};
const getters = {
    sideBarActive(state) {
        return state.sideBarActive
    }
};
export default {
    namespaced: true,
    state,
    getters,
    mutations
};
