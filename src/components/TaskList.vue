<template>
  <div class="app-container__task-list">
    <div class="task-list__task " v-for="(task, index) in paginateList" :key="index">
      <span>{{ index+1 }}) {{ task.title }}</span>
      <div class="task__buttons">
        <button class="task__button">🖊️</button>
        <button class="task__button" @click="deleteItem(task.id)">✖️</button>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '@/main'
export default {
  data(){
    return {
      id: +(this.$router.currentRoute.params["id"]),
    }
  },
  computed: {
    perPage(){
      return this.id * 10
    },
    startPage(){
      return this.perPage - 10
    },
    tasks(){
      return (this.$store.getters.getItems)
    },
    paginateList(){
      return this.tasks.slice(this.startPage, this.perPage)
    }
  },
  methods: {
    deleteItem: function (id) {
      if (id) {
        this.$store.state.controller = true
        db.collection("items").doc(id).delete()
      }
    }
  },
  watch: {
    $route(toR, fromR) {
      this.id = toR.params["id"]
    }
  }
}
</script>

<style>
</style>