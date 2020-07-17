<template>
    <div class="header">
        <img src="../assets/img/logo.svg" alt="Logo">
        <div style="margin-right: 20px;" >
            <a v-if="this.$root.isLogged" class="logout-btn" @click.prevent="logout" href="#">
                <i class="fas fa-sign-out-alt"></i>
            </a>
        </div>
    </div>
</template>

<script>
    import firebase from "firebase";
    import Swal from 'sweetalert2'

    export default {
        name: "Header",
        methods: {
            logout: async function () {
                Swal.fire({
                    title:'Are you sure?',
                    showCancelButton: true,
                    icon: 'question'
                }).then((res)=>{
                    if (res.isConfirmed){
                        firebase.auth().signOut().then(function () {
                            Swal.fire('Signed out','','success')
                        }, function (error) {
                            Swal.fire({
                                title: error,
                                icon: 'error',
                            })
                            alert(error)
                        })
                        this.$router.replace({name: "Login"})
                    }
                })
            }
        },
    }
</script>

<style scoped>
    .header {
        background: linear-gradient(0deg, rgba(148,243,180,.5) 0%, rgba(186,242,187,.5) 25%, rgba(186,242,187,.5) 75%, rgba(148,243,180,.5) 100%);
        height: 69px;
        max-width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px 60px;
        /*border-bottom: 1px #615D6C solid;*/
        -webkit-box-shadow: 0px 0px 20px -7px #615D6C;
        -moz-box-shadow: 0px 0px 20px -7px #615D6C;
        box-shadow: 0px 0px 20px -7px rgba(97, 93, 108, 0.41);
        top: 0;
        left: 0;
        right: 0;
        position: fixed;
    }
    .logout-btn{
        text-decoration: none;
        font-size: 40px;
    }

    .header a {
        display: flex;
        align-items: center;
    }
</style>