import Vue from 'vue'
import App from './App.vue'
import TaskList from './components/TaskList.vue'
import Pagination from './components/Pagination.vue'
import EditTask from './components/EditTask'
import router from './router'
import store from './store'
import firebase from 'firebase'

Vue.config.productionTip = false

var config = {
  apiKey: "AIzaSyD8Wg_OAbsje-iedUn9I4Y2P5yctfyDWIk",
  authDomain: "my-working-to-do-list.firebaseapp.com",
  databaseURL: "https://my-working-to-do-list.firebaseio.com",
  projectId: "my-working-to-do-list",
  storageBucket: "my-working-to-do-list.appspot.com",
  messagingSenderId: "381481715589",
  appId: "1:381481715589:web:3704088292ca8aed8ee6ec",
  measurementId: "G-QW1TV063G5"
};

firebase.initializeApp(config)

export const db = firebase.firestore()

Vue.component('task-list', TaskList)
Vue.component('pagination', Pagination)
Vue.component('edit-task', EditTask)

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
