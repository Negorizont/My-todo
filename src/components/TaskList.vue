<template>
  <div class="app-container__task-list">
    <div 
      class="task-list__task " 
      v-for="(task, index) in paginateList" 
      :key="index"
      :class="task.status"
      @dblclick="completeTask(task.status, task.id)" 
    >
      <span>{{ (index+1) + listNumeration }}) {{ task.title }}</span>
      <div class="task__buttons">
        <button class="task__button" @click="editTask(task.id)">🖊️</button>
        <button class="task__button" @click="deleteItem(task.id)">✖️</button>
      </div>
    </div>

    <edit-task :docId="editId" v-if="editBlock"></edit-task>
  </div>
</template>

<script>
import { db } from '@/main'
export default {
  data(){
    return {
      id: +(this.$router.currentRoute.params["id"]),
      editId: 0
    }
  },
  computed: {
    editBlock(){
      return this.$store.state.editBlock
    },
    listNumeration(){
      return this.id * 10 - 10
    },
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
        this.$store.commit('checkController');
        db.collection("items").doc(id).delete()
      }
    },
    completeTask(style, id) {
      if (style == 'completeTask') {
        db.collection('items').doc(id).update({
          status: ''
        })
      } else{
        db.collection('items').doc(id).update({
            status: 'completeTask'
        })
      }  
    },
    editTask(id){
      this.editId = id
      this.$store.commit('showEditBlock')
    }
  },
  watch: {
    $route(toR, fromR) {
      this.id = toR.params["id"]
    },
  }
}
</script>

<style>
  .completeTask{
    background-color: #6ED55E;
    color: #fff;
  }

  .completeTask:hover{
    background-color: #64C156;
  }

  .app-container__task-list{
    position: relative;
    min-height: 185px;
  }
</style>