<template>
  <form @submit.prevent>

    <div class="d-flex align-items-center mb-3 pb-1">
      <i class="bi bi-card-checklist bi-2x me-3 me-3" style="color: #ff6219; font-size: 30px"></i>
      <span class="h1 fw-bold mb-0">Todo List</span>
    </div>

    <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Register your account</h5>

    <div class="form-outline mb-4">
      <input type="text"
             class="form-control form-control-lg"
             v-model="user.name"
             v-focus
             placeholder="name"
      />
    </div>

    <div class="form-outline mb-4">
      <input type="email"
             class="form-control form-control-lg"
             v-model="user.email"
             placeholder="email"
      />
    </div>

    <div class="form-outline mb-4">
      <input type="password"
             class="form-control form-control-lg"
             v-model="user.password"
             placeholder="password"
      />
    </div>

    <div class="pt-1 mb-4">
      <button class="btn btn-dark btn-lg btn-block"
              @click="register"
      >
        Registration
      </button>
    </div>

    <p class="mb-5 pb-lg-2">Already have an account? <a href="#!"
                                                                                @click="$router.push('/login')"
                                                                                style="color: #393f81;">Log in here</a></p>
    <a href="#!" class="small text-muted">Terms of use.</a>
    <a href="#!" class="small text-muted">Privacy policy</a>
  </form>
</template>

<script>
export default {
  name: "RegisterForm",
  data() {
    return {
      user: {
        email: '',
        password: '',
        name: ''
      }
    }
  },
  methods: {
    register() {
      this.$emit('register', this.user)
      this.user = {
        email: '',
        password: ''
      }
    }
  }
}
</script>

<style scoped>

</style>