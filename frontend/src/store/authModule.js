import $axios from "@/http";
import router from "@/router/router";
import {UserNotificationError} from "@/error";

export const authModule = {
    state: () => ({
        auth: false,
        isAuthLoading: false,
        user: {},
        error: ''
    }),
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setLoading(state, bool) {
            state.isAuthLoading = bool;
        },
        setAuth(state, bool) {
            state.auth = bool;
        },
        setError(state, error) {
            state.error = error
        }
    },
    actions: {
        async login({state, commit}, user) {
            try {
                commit('setLoading', true);
                const response = await $axios.post('http://localhost:85/api/login', {
                    email: user.email, password: user.password
                });
                localStorage.setItem('token', response.data.token);
                commit('setUser', response.data.user);
                commit('setAuth', true);
                commit('setLoading', false);
                await router.push('/todos');
            } catch (e) {
                commit('setError', e.response.data.message)
                throw new UserNotificationError(state.error, e.code)
            }
        },
        async register({state, commit}, user) {
            try {
                commit('setLoading', true);
                const response = await $axios.post('http://localhost:85/api/register', {
                    email: user.email, password: user.password, name: user.name
                });
                localStorage.setItem('token', response.data.token);
                commit('setUser', response.data.user);
                commit('setAuth', true);
                commit('setLoading', false);
                await router.push('/todos');
            } catch (e) {
                commit('setError', e.response.data.message)
                throw new UserNotificationError(state.error, e.code)
            }
        },
        async logout({commit}) {
            try {
                commit('setLoading', true);
                const response = await $axios.post('http://localhost:85/api/logout');
                localStorage.removeItem('token');
                commit('setUser', {});
                commit('setAuth', false);
                commit('setLoading', false);
                await router.push('/login')
            } catch (e) {
                commit('setError', e.response.data.message)
                throw new UserNotificationError(state.error, e.code)
            }
        },
        async checkAuth({commit}) {
            try {
                commit('setLoading', true);
                commit('setAuth', true);
                const response = await $axios.get('http://localhost:85/api/user');
                commit('setUser', response.data);
            } catch (e) {
                console.log('auth error')
                commit('setAuth', false);
            }
        }
    },
    namespaced: true
}