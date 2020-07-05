<template>
    <div >
        <button @click.prevent="logout">Log out</button>
    </div>
</template>

<script>
    import firebase from 'firebase/app';
    import 'firebase/auth';
    export default {
        name: "Logout",
        methods:{
            logout: async function () {
                firebase.auth().signOut().then(function () {
                    alert('Signed out')
                }, function (error) {
                    alert(error)
                })
            }
        }
    }
</script>

<style scoped>

</style>