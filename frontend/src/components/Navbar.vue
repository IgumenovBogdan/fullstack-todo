<template>
  <nav class="navbar navbar-dark bg-dark">
    <a class="navbar-brand"><div @click="$router.push('/')">{{user.name}}</div></a>
    <div class="navbar__btns">
      <button type="button" class="btn btn-secondary" @click="logout">Logout</button>
    </div>
  </nav>
</template>

<script>
import MyButton from "@/components/UI/MyButton";
import {mapActions} from "vuex";
export default {
  name: "Navbar",
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  components: {MyButton},
  methods: {
    ...mapActions({
      logout: 'auth/logout'
    })
  }
}
</script>

<style scoped>
.navbar {
  height: 50px;
  background-color: lightblue;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 0 15px;
}
.navbar__btns {
  margin-left: auto;
}
</style>