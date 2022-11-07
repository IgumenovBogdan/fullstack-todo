<template>
  <li class="list-group-item d-flex justify-content-between">
    <div class="d-flex">
      <input class="form-check-input mx-3"
             type="checkbox"
             v-model="todo.completed"
             @change="$emit('toggle', todo)"
      >
      <label class="form-check-label" :class="todo.completed ? 'completed text-secondary' : '' ">
        {{todo.title}}
      </label>
    </div>
    <i class="bi bi-trash text-danger delete-button" @click="$emit('delete', todo)"></i>
  </li>
</template>

<script>
export default {
  name: "TodoItem",
  props: {
    todo: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.todo {
  padding: 15px;
  border: 2px solid teal;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.todo__btns {
  display: flex;
}
.completed {
  text-decoration: line-through;
}
.delete-button {
  cursor: pointer;
}
.delete-button:hover {
  transform: scale(1.5);
}
</style>