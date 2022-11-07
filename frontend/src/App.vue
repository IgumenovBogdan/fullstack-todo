<template>
  <Navbar
      v-if="auth"
      :user="user"
  />
  <div class="app">
    <router-view></router-view>
  </div>
  <ErrorNotification :error="error" />
</template>

<script>
import Navbar from "@/components/Navbar";
import {mapActions, mapState} from "vuex";
import {UserNotificationError} from "@/error";
import ErrorNotification from "@/components/Notification";
export default {
  name: "App",
  components: {ErrorNotification, Navbar},
  data() {
    return {
      error: {},
    }
  },
  errorCaptured(err) {
    if(err instanceof UserNotificationError) {
      this.error = { message: err.message };
    }
    return false;
  },
  methods: {
    ...mapActions({
      checkAuth: 'auth/checkAuth'
    })
  },
  computed: {
    ...mapState({
      auth: state => state.auth.auth,
      user: state => state.auth.user
    })
  },
  mounted() {
    if (localStorage.getItem('token')) {
      this.checkAuth()
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.app {
  padding: 20px;
}
</style>