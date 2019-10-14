<template>
 <div class="buttons-container">
      <button 
        :disabled="id === 1 ? true : false" 
        @click="editCurrent(-1)" 
        class="editCurrent"
      >&lt;</button>
      <button 
        :disabled="tasks.length <= (id * 10) ? true : false" 
        @click="editCurrent(+1)" 
        class="editCurrent"
      >&gt;</button>
    </div>
</template>

<script>
import { db } from '@/main'

export default {
  data() {
    return{
      id: +(this.$router.currentRoute.params["id"]),
    }
  },
  computed: {
    tasks(){
      return (this.$store.getters.getItems)
    }
  },
  methods: {
    editCurrent(num){
      this.id += num
      this.$router.push('/tasks/' + this.id)
    }
  },
  watch: {
    $route(toR, fromR) {
      this.id = +(toR.params["id"])
    }
  }
}
</script>

<style>
</style>