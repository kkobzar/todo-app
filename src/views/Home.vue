<template>
  <div id="home">
      <Todo/>
    <div v-if="this.$root.isLogged"><span>Logged in</span>
      <span v-if="this.$root.isAccount"> as {{this.$root.user.email}}</span>
      <span v-else> anonymously</span>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Todo from "../components/Todo";
export default {
  name: 'Home',
  components: {
    Todo,
  }
}
</script>
<style>
  #home,#login{
    min-height: calc(100vh - 80px);
  }
</style>