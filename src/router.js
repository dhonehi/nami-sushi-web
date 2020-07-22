import Vue from 'vue'
import Router from 'vue-router'
import FormAuthentication from "./components/FormAuthentication";
import FormRegistration from "./components/FormRegistration";
import MainPage1 from "@/components/MainPage1";
import Profile from "@/components/Profile";
import Pages from "@/components/Pages";

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/main',
            component: Pages,
            children: [
                {
                    path: '/main',
                    component: MainPage1
                },
                {
                    path: '/profile',
                    component: Profile
                },
            ]
        },
        {
            path: '/login',
            component: FormAuthentication
        },
        {
            path: '/registration',
            component: FormRegistration
        },
    ]
})