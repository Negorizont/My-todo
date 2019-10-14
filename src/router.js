import Vue from 'vue'
import Router from 'vue-router'
import App from './App'
import TaskList from './components/TaskList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      component: App,
      redirect: '/tasks/1',
      children: [
        {
          path: '/tasks/:id',
          component: TaskList,
          name: 'tasks'
        }
      ]
    },
    {
      path: '/tasks/',
      component: App,
      redirect: '/tasks/1'
    }
  ]
})
