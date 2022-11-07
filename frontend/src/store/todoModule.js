import $axios from "@/http";
import {UserNotificationError} from "@/error";

export const todoModule = {
    state: () => ({
        todos: [],
        isTodosLoading: false,
        selectedSort: '',
        searchQuery: '',
        page: 1,
        limit: 20,
        totalPages: 0,
        sortOptions: [
            {
                value: 'title',
                name: 'By name'
            },
            {
                value: 'is_completed',
                name: 'By complete'
            }
        ]
    }),
    mutations: {
        setTodos(state, todos) {
            state.todos = todos;
        },
        setLoading(state, bool) {
            state.isTodosLoading = bool;
        },
        setPage(state, page) {
            state.page = page;
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort;
        },
        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery;
        },
        deleteTodo(state, id) {
            const index = state.todos.findIndex(todo => todo.id === id);
            state.todos.splice(index, 1);
        },
        createTodo(state, todo) {
            state.todos.push(todo)
        }
    },
    actions: {
        async fetchTodos({state, commit}) {
            try {
                commit('setLoading', true);
                const response = await $axios.get('http://localhost:85/api/todos', {
                    params: {
                        page: 1,
                        limit: state.limit,
                        s: state.searchQuery,
                        orderBy: state.selectedSort
                    }
                });
                commit('setTodos', response.data.data);
            } catch (e) {
                throw new UserNotificationError(e.response.data.message, e.code)
            } finally {
                commit('setLoading', false);
            }
        },
        async loadMoreTodos({state, commit}) {
            try {
                commit('setPage', state.page + 1);
                const response = await $axios.get('http://localhost:85/api/todos', {
                    params: {
                        page: state.page,
                        limit: state.limit
                    },
                });
                commit('setTodos', [...state.todos, ...response.data.data]);
            } catch (e) {
                throw new UserNotificationError(e.response.data.message, e.code)
            }
        },
        async createTodo({state, commit}, todo) {
            try {
                const response = await $axios.post('http://localhost:85/api/todos', {
                    title: todo.title
                });
                commit('createTodo', response.data.data)
            } catch (e) {
                throw new UserNotificationError(e.response.data.message, e.code)
            }
        },
        async deleteTodo({commit}, todo) {
            try {
                const response = await $axios.delete('http://localhost:85/api/todos/' + todo.id);
                if(response.status === 200) {
                    commit('deleteTodo', todo.id);
                }
            } catch (e) {
                throw new UserNotificationError(e.response.data.message, e.code)
            }
        },
        async toggleTodo({commit}, todo) {
            try {
                const response = await $axios.put('http://localhost:85/api/todos/' + todo.id + '/toggle');
            } catch (e) {
                throw new UserNotificationError(e.response.data.message, e.code)
            }
        }
    },
    namespaced: true
}