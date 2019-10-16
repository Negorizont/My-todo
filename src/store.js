import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '@/main'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: [],
    controller: false,
    editBlock: false
  },
  getters: {
    getItems: state => {
      return state.items
    },
  },
  mutations: {
    setItems: state => {
      let items = []

      db.collection('items').orderBy('number').onSnapshot((snapshot) => {
        items = []
        snapshot.forEach((doc) => {
          items.push({ id: doc.id, title: doc.data().title, number:  doc.data().number, status:  doc.data().status})
        })

        state.items = items
      })
    },
    checkController: state => {
      state.controller = true
    },
    showEditBlock: state => {
      state.editBlock = !state.editBlock
    }
  },
  actions: {
    setItems: context => {
      context.commit('setItems')
    },
  }
})
