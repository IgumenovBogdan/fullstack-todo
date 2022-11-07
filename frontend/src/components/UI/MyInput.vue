<template>
  <div class="input-group rounded">
    <input :value="modelValue"
           @input="updateInput"
           type="search"
           class="form-control rounded"
           aria-describedby="search-addon"
           placeholder="Search..."
    />
  </div>
</template>

<script>
export default {
  name: "MyInput",
  props: {
    modelValue: [String, Number]
  },
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style scoped>
.input {
  width: 100%;
  border: 1px solid teal;
  padding: 10px 15px;
  margin-top: 15px;
}
</style>