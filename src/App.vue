<template>
  <div id="app">
    <Header/>
    <router-view/>
  </div>
</template>

<script>
  import Header from "./components/Header";
  export default {
    name: "App",
    components: { Header}
  }
</script>
<style>
  @import "assets/css/styles.css";
  @import "~@fortawesome/fontawesome-free/css/all.css";
  @font-face {
    font-family: "Nutino";
    src: url('assets/fonts/Nunito_Sans/NunitoSans-Regular.ttf') format("truetype");
    font-weight: 400;
    font-style: normal;
  }
#app {
  font-family:"Nutino", Avenir, Helvetica, Arial, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #615D6C;
  background-color: #E9FBF1;
}
#app{
  padding-top: 69px;
  min-height: 100vh;
}
  #app input {
    font-family:"Nutino", Avenir, Helvetica, Arial, sans-serif !important;
    color: #2c3e50;
  }
</style>
