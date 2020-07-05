<template>
    <div id="login">
        <div><h1>Login</h1></div>
        <form @submit.prevent="login" id="login-form">
            <input v-model="email" required type="email"  placeholder="EMAIL">
            <input v-model="password" required type="password" placeholder="PASSWORD">
            <div>
                <router-link v-if="email.toString() === ''" class="btn" to="/registration">Register</router-link>
                <button :class="{w100: email.toString()}" class="btn" type="submit">Log in</button>
            </div>
        </form>
        <div><a @click.prevent="loginAnon" href="#">Continue without account</a></div>
    </div>
</template>

<script>
    import firebase from 'firebase/app'
    import Swal from 'sweetalert2'
    import 'firebase/auth'
    export default {
        name: "Login",
        data: function(){
          return{
              email: '',
              password: '',
          }
        },
        methods: {
           login:async function () {
               if (this.email === ''){
                   await Swal.fire({
                       title: 'Error!',
                       text: 'Email field is empty!',
                       icon: 'error',
                   })
                   return
               }else if(this.password === ''){
                   await Swal.fire({
                       title: 'Error!',
                       text: 'Password field is empty!',
                       icon: 'error',
                   })
                   return
               }
              firebase.auth().signInWithEmailAndPassword(this.email.toString(),this.password).then(()=>{
                  this.$root.updateToDo()
                  this.$router.replace({name: 'Home'})
              }).catch(function (error) {
                    Swal.fire({
                        title: 'Error!',
                        text: error,
                        icon: 'error',
                    })
              })
            },
            loginAnon: async function(){
               await firebase.auth().signInAnonymously()
                await this.$router.replace({name: 'Home'})
            }
        },
    }
</script>

<style>
    .w100{
        width: 100% !important;
    }
    #login > div{
        flex: 1;
    }

    #login-form{
        max-height: 25vh;
        width: 30%;
        flex: 2;

    }
    #login-form > div{
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
    #login-form .btn{
        width: 45%;
    }

</style>