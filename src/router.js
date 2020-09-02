import Vue from 'vue'
import Router from 'vue-router'
import FormAuthentication from "./components/FormAuthentication";
import FormRegistration from "./components/FormRegistration";
import MainPage from "@/components/MainPage";
import Profile from "@/components/Profile";
import Pages from "@/components/Pages";
import Cart from "./components/Cart";
import Fav from "@/components/Fav";

Vue.use(Router)

const router = new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			redirect: '/main',
			component: Pages,
			children: [
				{
					path: '/main',
					component: MainPage
				}
				,
				{
					path: '/profile',
					component: Profile
				},
				{
					path: '/cart',
					component: Cart
				},
				{
					path: '/fav',
					component: Fav
				}
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

/*router.beforeEach((to, from, next) => {
	console.log('ok');
	next();
})*/

export default router;

/*
export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/main',
            component: Pages1,
            children: [
                {
                    path: '/main',
                    component: MainPage1
                },
                {
                    path: '/profile',
                    component: Profile
                },
                {
                    path: '/cart',
                    component: Cart
                },
                {
                    path: '/fav',
                    component: Fav
                }
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
})*/
