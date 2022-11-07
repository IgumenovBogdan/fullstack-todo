<template>
  <LoginPage v-if="!auth" />
  <TodosPage v-else/>
</template>

<script>
import {mapState} from "vuex";
import LoginForm from "@/components/LoginForm";
import LoginPage from "@/pages/LoginPage";
import TodosPage from "@/pages/TodosPage";

export default {
  name: "Main",
  components: {TodosPage, LoginPage, LoginForm},
  computed: {
    ...mapState({
      auth: state => state.auth.auth
    })
  }
}
</script>

<style scoped>

</style>