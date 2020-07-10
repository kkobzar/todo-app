import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import firebase from "firebase/app"
import 'firebase/auth'
import 'firebase/database'
import router from './router'
import $ from 'jquery'
//import TodoItem from "./components/TodoItem";

Vue.prototype.$axios = axios
Vue.prototype.$jQuery = $
Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyCGwPJqP0r9EaPK90oo0rek9ZF2-jkajFI",
  authDomain: "todo-8e7f6.firebaseapp.com",
  databaseURL: "https://todo-8e7f6.firebaseio.com",
  projectId: "todo-8e7f6",
  storageBucket: "todo-8e7f6.appspot.com",
  messagingSenderId: "926848589931",
  appId: "1:926848589931:web:218c793b9403a51739912e",
  measurementId: "G-DK0TVZ6R29"
};
firebase.initializeApp(firebaseConfig)
const app = new Vue({
  data: function(){
    return{
      isLogged: false,
      user: null,
      user_id: '',
      isAccount: true,
      todo_list:{},
      edit:'',
    }
  },
  methods:{
    updateToDo:function () {
      updateList()
    },
  },
  router,
  render: h => h(App)
}).$mount('#app')
const database = firebase.database().ref()
Vue.prototype.$database = database
firebase.auth().onAuthStateChanged(function (user) {
    if (user){
      updateList()
      app.isLogged = true;
      app.user = user;
      app.isAccount = !user.isAnonymous;
      app.user_id = user.uid;
    }else {
      app.isLogged = false;
      app.user = '';
      app.isAccount = true;
      app.user_id = '';
    }
  if (!app.isLogged){
    router.replace({name: 'Login'})
  }else
    router.replace({name: 'Home'})
})

function updateList() {
  if (firebase.auth().currentUser !== null){
    firebase.database().ref('/users/' + firebase.auth().currentUser.uid).once('value').then( (snapshot) => {
      app.todo_list = snapshot.val()
    })
  }
}
updateList()

document.onclick = function (e) {
  if (e.target.className === ''){
    app.edit = ''
  }
}

var changeTimer = false;

$("input.edit-item").on("change",function(){
  if(changeTimer !== false) clearTimeout(changeTimer);
  changeTimer = setTimeout(function(){
    changeTimer = false;
  },300);
});