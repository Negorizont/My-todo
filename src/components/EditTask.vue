<template>
  <div class="edit-task">
    <h1 class="edit-task__name">Изменить задачу</h1>
      <textarea 
        class="edit-task__input-field" 
        rows="3" 
        placeholder="Enter a title for this card..."
        v-model="myTodo"
        @focus="error = false"
      ></textarea>
      <div v-if="error" class="edit-task__error">Введите текст!</div>
      <div class="edit-task__buttons">
        <button class="buttons__edit-card" @click="editTask(docId)">Изменить</button>
        <button class="buttons__cancel" @click="undoСhanges()">Отменить</button>
      </div>
  </div>
</template>

<script>
import { db } from '@/main'
export default {
  props: ['docId'],
  data(){
    return {
      myTodo: '',
      error: false
    }
  },
  methods: {
    editTask(id) {
      if (this.myTodo !== '') {
        db.collection('items').doc(id).update({
          title: this.myTodo
        }).then((response) => {
          this.myTodo = '';
          this.$store.commit('showEditBlock')
        })    
      } else {
        this.error = true
      }
    },
    undoСhanges(){
      this.$store.commit('showEditBlock')
    }
  }
}
</script>

<style scoped>
  .edit-task{
    display: block;
    position: absolute;
    top: 0;
    height: 100%;
    background-color: #E0E3E6;
    width: 100%;
    box-sizing: border-box;
    text-align: center;
    border: 2px solid #9BD12D;
  }

  .edit-task__name{
    margin: 5px 0 10px;
  }

  .edit-task__input-field{
    box-sizing: border-box;
    width: 50%;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 1px 0 0 #B0B8BE;
    resize: none;
    margin-bottom: 5px;
  }
  
  .edit-task__buttons{
    display: flex;
    justify-content: space-between;
    width: 40%;
    margin: 0 auto;
  }

  .buttons__edit-card{
    background-color: #9BD12D;
    border-radius: 5px;
    color: #fff;
    box-shadow: 0 1px 0 0 #78A323;
    padding: 5px;
    cursor: pointer;
  }

  .buttons__cancel{
    background-color: #DE3636;
    border-radius: 5px;
    color: #fff;
    box-shadow: 0 1px 0 0 #B22B2B;
    cursor: pointer;
    padding: 5px;
  }

  .edit-task__error{
    font-size: 15px;
    color:red;
    width: 40%;
    margin: 0 auto 5px;
  }
</style>