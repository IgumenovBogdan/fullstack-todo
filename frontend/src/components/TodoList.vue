<template>
  <div v-if="todos.length > 0">
    <h3>Your todos</h3>
      <ul class="list-group list-group-flush">
        <transition-group name="todo-list">
          <TodoItem
              v-for="todo in todos"
              :todo="todo"
              :key="todo.id"
              @toggle="$emit('toggle', todo)"
              @delete="$emit('delete', todo)"
          />
        </transition-group>
      </ul>
  </div>
  <h2 v-else>No todos</h2>
</template>

<script>
import TodoItem from "@/components/TodoItem";

export default {
  name: "TodoList",
  components: {TodoItem},
  props: {
    todos: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.todo-list {
  display: inline-block;
  margin-right: 10px;
}
.todo-list-enter-active,
.todo-list-leave-active {
  transition: all 0.4s ease;
}
.todo-list-enter-from,
.todo-list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}
.todo-list-move {
  transition: transform 0.8s ease;
}
</style>