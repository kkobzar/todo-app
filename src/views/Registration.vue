<template>
    <div id="registration">
        <h1>Registration</h1>
<!--        <div v-if="error">{{error.message}}</div>-->
        <form v-if="!this.isLogged" @submit.prevent="pressed">
<!--            <input name="name" type="text" placeholder="NAME">-->
            <input name="email" v-model="email" type="email" placeholder="EMAIL">
            <input name="pass" v-model="password" type="password" placeholder="PASSWORD">
<!--            <input name="pass2" type="password" placeholder="REPEAT PASSWORD">-->
            <button class="btn" type="submit">Register</button>
        </form>
        <div>        <router-link to="/login">Log in</router-link>
        </div>
        <!--        <div v-else>-->
<!--            <span>Registred</span>-->
<!--        </div>-->
    </div>
</template>

<script>
    import firebase from 'firebase/app';
    import 'firebase/auth';
    import Swal from "sweetalert2";
    export default {
        methods:{
            async pressed(){
                try {
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
                    const user = firebase.auth().createUserWithEmailAndPassword(this.email, this.password);
                    await this.$router.replace({name: 'Home'})
                    console.log(user)
                }catch (e) {
                    await Swal.fire({
                        title: 'Error!',
                        text: e,
                        icon: 'error',
                    })
                }
            }
        },
        data:function () {
          return {
              email:'',
              password:'',
          }
        },
        name: "Registration"
    }
</script>

<style scoped>
    #registration{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    form{
        width: 30%;
    }
</style>