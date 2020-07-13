import Vue from 'vue'
import Router from 'vue-router'
import FormAuthentication from "./components/FormAuthentication";
import FormRegistration from "./components/FormRegistration";

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/login',
            component: FormAuthentication
        },
        {
            path: '/registration',
            component: FormRegistration
        }
    ]
})