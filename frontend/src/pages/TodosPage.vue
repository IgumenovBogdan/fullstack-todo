<template>
  <div class="container" v-if="!isTodosLoading">
    <h1>Todos page</h1>
    <MyInput
        :model-value="searchQuery"
        @update:model-value="setSearchQuery"
        v-focus
        placeholder="Search..."
        v-debounce:300="fetchTodos"
    />
    <div class="app__btns">
      <button
          type="button"
          class="btn btn-success"
          @click="showModal"
      >
        Create todo
      </button>
      <MySelect
          :model-value="selectedSort"
          @update:model-value="setSelectedCort"
          @change="fetchTodos"
          :options="sortOptions"
      />
    </div>
    <TodoList
        @delete="deleteTodo"
        @toggle="toggleTodo"
        :todos="todos"
    />
<!--    <div-->
<!--        v-if="todos.length > 15"-->
<!--        v-intersection="loadMoreTodos"-->
<!--        class="observer"></div>-->
  </div>
  <div v-else class="d-flex justify-content-center">
    <div class="spinner-border m-5" role="status">
      <span class="sr-only"></span>
    </div>
  </div>
  <MyModal v-model:show="modalVisible">
    <TodoForm
        @create="createTodo"
    />
  </MyModal>
</template>

<script>
import MyInput from "@/components/UI/MyInput";
import MySelect from "@/components/UI/MySelect";
import MyButton from "@/components/UI/MyButton";
import MyModal from "@/components/UI/MyModal";
import {mapActions, mapMutations, mapState} from "vuex";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import { vue3Debounce } from 'vue-debounce'

export default {
  name: "TodosPage",
  components: {TodoList, TodoForm, MyInput, MySelect, MyButton, MyModal},
  directives: {
    debounce: vue3Debounce({ lock: true })
  },
  data() {
    return {
      modalVisible: false,
    }
  },
  methods: {
    ...mapMutations({
      setPage: 'todo/setPage',
      setSearchQuery: 'todo/setSearchQuery',
      setSelectedCort: 'todo/setSelectedSort'
    }),
    ...mapActions({
      loadMoreTodos: 'todo/loadMoreTodos',
      fetchTodos: 'todo/fetchTodos',
      createTodo: 'todo/createTodo',
      deleteTodo: 'todo/deleteTodo',
      toggleTodo: 'todo/toggleTodo'
    }),

    showModal() {
      this.modalVisible = true;
    },
  },
  mounted() {
    this.fetchTodos();
  },
  computed: {
    ...mapState({
      todos: state => state.todo.todos,
      isTodosLoading: state => state.todo.isTodosLoading,
      selectedSort: state => state.todo.selectedSort,
      searchQuery: state => state.todo.searchQuery,
      page: state => state.todo.page,
      limit: state => state.todo.limit,
      totalPages: state => state.todo.totalPages,
      sortOptions: state => state.todo.sortOptions
    }),
  },
}
</script>

<style>
.app__btns {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
}
</style>