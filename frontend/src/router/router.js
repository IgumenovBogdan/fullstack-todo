import Main from "@/pages/Main";
import {createRouter, createWebHistory} from "vue-router";
import TodosPage from "@/pages/TodosPage";
import LoginPage from "@/pages/LoginPage";
import store from "@/store";
import RegisterPage from "@/pages/RegisterPage";


const routes = [
    {
        path: '/',
        name: 'Main',
        component: Main,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginPage,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: RegisterPage,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/todos',
        name: 'Todos',
        component: TodosPage,
        meta: {
            requiresAuth: true
        }
    },
]

function isAuthenticated() {
    return store.state.auth.auth;
}

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (isAuthenticated()) {
            next();
        } else {
            next("/");
        }
    } else {
        next();
    }
})

export default router;