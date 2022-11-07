<template>
  <form @submit.prevent>
    <h4>Create todo</h4>
    <MyInput
        v-model="todo.title"
        v-focus
        type="text"
        placeholder="Title" />
    <MyButton
        style="align-self: flex-end; margin-top: 15px"
        @click="createTodo"
    >
      Create
    </MyButton>
  </form>
</template>

<script>
export default {
  name: "TodoForm",
  data() {
    return {
      todo: {
        title: ''
      }
    }
  },
  methods: {
    createTodo() {
      this.$emit('create', this.todo)
      this.todo = {
        title: ''
      }
    }
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
</style>