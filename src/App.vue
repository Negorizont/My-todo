<template>
  <div class="background-block">
    <div class="background-block__app-container">
      <div class="app-container__title">
        <h1 class="title__name">Задачи</h1>
        <div class="buttons-container">
          <button class="title__pagination"><</button>
          <button class="title__pagination">></button>
        </div>
        <button class="title__settings">
          <img src="./assets/ellipsis.png" alt="">
        </button>
      </div>
      <div class="app-container__task-list">
        <div class="task-list__task " v-for="(task, index) in this.$store.getters.getItems" :key="index">
          <span>{{ index+1 }}) {{ task.title }}</span>
          <div class="task__buttons">
            <button class="task__button">🖊️</button>
            <button class="task__button" @click="deleteItem(task.id)">✖️</button>
          </div>
        </div>
      </div>
      <div class="app-container__add-task">
        <textarea 
          class="add-task__input-field" 
          rows="3" 
          placeholder="Enter a title for this card..."
          v-model="myTodo"
        ></textarea>
        <div class="add-task__buttons">
          <button class="add-task__add-card-button" @click="addToDo">Add Card</button>
          <button class="add-task__settings">
            <img src="./assets/ellipsis.png" alt="">
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '@/main'

export default {
  beforeCreate: function () {
    this.$store.dispatch('setItems')
  },
  data() {
    return {
        myTodo: ''
    }
  },
  methods: {
    addToDo: function () {
      this.errors = ''

      if (this.myTodo !== '') {
        db.collection('items').add({
          title: this.myTodo,
          created_at: Date.now()
        }).then((response) => {
          if (response) {
            this.myTodo = ''
          }
        }).catch((error) => {
          this.errors = error
        })
      } else {
        this.errors = 'Please enter some text'
      }
    },
    deleteItem: function (id) {
      if (id) {
        db.collection("items").doc(id).delete().then(function() {
          console.log('Document successfully deleted')
        }).catch(function(error) {
          this.error = error
        })
      } else {
        this.error = 'Invalid ID'
      }
    }
  }
}
</script>

<style scoped>
  html{
    min-height: 100%;
  }

  .background-block {
    background: url(./assets/bg-mobile.jpg) no-repeat;
    background-size: cover;
    background-attachment: fixed;
    box-sizing: border-box;	
    width: 100%;
    min-height: 100vh;
    height: 100%;
    padding: 10px;
  }

  .background-block__app-container {
    border-radius: 5px;
    background-color: #e0e3e6;
    color: #243849;
    padding: 10px 10px 15px;
    font-family: "Montserrat", sans-serif;
  }

  .app-container__title {
    font-weight: bold;
    font-size: 30px;
    display: flex;
    margin-bottom: 10px;
  }

  .title__settings,
  .add-task__settings{
    border: none;
    background: none;
  }

  .title__settings img,
  .add-task__settings img {
    width: 30px;
  }

  .buttons-container{
    margin: 0 auto;
  }

  .title__pagination {
    border: none;
    background: none;
    cursor: pointer;
  }

  .task-list__task {
    display: flex;
    align-items: center;
    padding: 10px 0 10px 10px;
    background-color: #FFFFFF;
    border: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
    box-shadow: 0 2px 0 0 #B0B8BE;
  }

  .task__buttons {
    visibility: hidden;
    margin-left: auto;
  }

  .task-list__task:hover .task__buttons {
    visibility: visible;
  }

  .task-list__task:hover {
    background-color: #F5F6F7;
  }

  .task__button {
    border: none;
    background: none;
  }

  .add-task__input-field{
    box-sizing: border-box;
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
    resize: none;
    box-shadow: 0 1px 0 0 #B0B8BE;
  }

  .add-task__buttons {
    display: flex;
    justify-content: space-between;
  }

  .add-task__add-card-button{
    border: none;
    background-color: #9BD12D;
    color: #fff;
    font-weight: bold;
    padding: 10px; 
    border-radius: 5px;
    box-shadow: 0 2px 0 0 #2B4D0E;
  }
  
  .add-task__add-card-button:active {
    background-color: #8CBE29;
  }

  @media screen and (min-width: 700px){
    .background-block {
      background: url(./assets/bg-mobile.jpg) no-repeat;
      background-size: cover;
      background-attachment: fixed;
      box-sizing: border-box;	
      width: 100%;
      min-height: 100vh;
      height: 100%;
      padding: 50px 0 0;
    }

    .background-block__app-container {
      width: 600px;
      margin: 0 auto;
      border-radius: 5px;
      background-color: #e0e3e6;
      color: #243849;
      padding: 10px 10px 15px;
      font-family: "Montserrat", sans-serif;
    }

    .app-container__title {
      font-weight: bold;
      font-size: 40px;
      display: flex;
      margin-bottom: 10px;
    }

    .title__settings,
    .add-task__settings{
      border: none;
      background: none;
    }

    .title__settings img,
    .add-task__settings img {
      width: 40px;
    }

    .buttons-container{
      margin: 0 auto;
    }

    .title__pagination {
      border: none;
      background: none;
      cursor: pointer;
    }

    .task-list__task {
      font-size: 20px;
      display: flex;
      align-items: center;
      padding: 10px 0 10px 10px;
      background-color: #FFFFFF;
      border: 10px;
      border-radius: 5px;
      margin-bottom: 10px;
      box-shadow: 0 2px 0 0 #B0B8BE;
    }

    .task__buttons {
      visibility: hidden;
      margin-left: auto;
    }

    .task-list__task:hover .task__buttons {
      visibility: visible;
    }

    .task-list__task:hover {
      background-color: #F5F6F7;
    }

    .task__button {
      border: none;
      background: none;
    }

    .add-task__input-field{
      box-sizing: border-box;
      width: 100%;
      padding: 10px;
      border-radius: 5px;
      margin-bottom: 10px;
      resize: none;
      box-shadow: 0 1px 0 0 #B0B8BE;
    }

    .add-task__buttons {
      display: flex;
      justify-content: space-between;
    }

    .add-task__add-card-button{
      border: none;
      background-color: #9BD12D;
      font-size: 20px;
      color: #fff;
      font-weight: bold;
      padding: 15px; 
      border-radius: 5px;
      box-shadow: 0 2px 0 0 #2B4D0E;
    }
  }

  @media screen and (min-width: 1024px){
    .background-block {
      background: url(./assets/bg-descktop.jpg) no-repeat;
      background-size: cover;
      background-attachment: fixed;
      box-sizing: border-box;	
      width: 100%;
      min-height: 100vh;
      height: 100%;
      padding: 50px 0 0;
    }
  }

  @media screen and (min-width: 1500px){
    .background-block {
      background: url(./assets/bg-mobile.jpg) no-repeat;
      background-size: cover;
      background-attachment: fixed;
      box-sizing: border-box;	
      width: 100%;
      min-height: 100vh;
      height: 100%;
      padding: 50px 0 0;
    }

    .background-block__app-container {
      width: 1000px;
      margin: 0 auto;
      border-radius: 5px;
      background-color: #e0e3e6;
      color: #243849;
      padding: 10px 10px 15px;
      font-family: "Montserrat", sans-serif;
    }

    .app-container__title {
      font-weight: bold;
      font-size: 50px;
      display: flex;
      margin-bottom: 10px;
    }

    .title__settings,
    .add-task__settings{
      border: none;
      background: none;
    }

    .title__settings img,
    .add-task__settings img {
      width: 50px;
    }

    .buttons-container{
      margin: 0 auto;
    }

    .title__pagination {
      border: none;
      background: none;
      cursor: pointer;
    }

    .task-list__task {
      font-size: 30px;
      display: flex;
      align-items: center;
      padding: 10px 0 10px 10px;
      background-color: #FFFFFF;
      border: 10px;
      border-radius: 5px;
      margin-bottom: 15px;
      box-shadow: 0 2px 0 0 #B0B8BE;
    }

    .task__buttons {
      visibility: hidden;
      margin-left: auto;
    }

    .task-list__task:hover .task__buttons {
      visibility: visible;
    }

    .task-list__task:hover {
      background-color: #F5F6F7;
    }

    .task__button {
      border: none;
      background: none;
    }

    .add-task__input-field{
      font-size: 30px;
      box-sizing: border-box;
      width: 100%;
      padding: 10px;
      border-radius: 5px;
      margin-bottom: 20px;
      resize: none;
      box-shadow: 0 1px 0 0 #B0B8BE;
    }

    .add-task__buttons {
      display: flex;
      justify-content: space-between;
    }

    .add-task__add-card-button{
      border: none;
      background-color: #9BD12D;
      font-size: 30px;
      color: #fff;
      font-weight: bold;
      padding: 20px; 
      border-radius: 5px;
      box-shadow: 0 2px 0 0 #2B4D0E;
    }
  }
</style>
