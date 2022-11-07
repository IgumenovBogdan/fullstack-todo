<template>
  <transition name="bounce">
    <div v-if="show"
         class="alert alert-danger"
         style="position: fixed; left: 1rem; top: 1rem;"
    >
      {{ error.message }}
    </div>
  </transition>
</template>

<script>
export default {
  name: "ErrorNotification",
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      show: false,
      timeout: 0,
    };
  },
  watch: {
    error() {
      this.show = true;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.show = false;
      }, 3000);
    }
  }
}
</script>

<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>