<template>
  <div class="background-block">
    <div class="background-block__app-container">
      <div class="app-container__title">
        <h1 class="title__name">Задачи</h1>
        <div class="buttons-container">
          <button class="title__pagination"><</button>
          <button class="title__pagination">></button>
        </div>
        <button class="title__settings-button" @click="showTitleSettings = !showTitleSettings">
          <img src="./assets/ellipsis.png" alt="">
        </button>
        <div v-if="showTitleSettings" class="title__settings">
          <button @click="reverseList()" class="settings__reverseList" :class="settingTitle">Обратная сортировка</button>
        </div>
      </div>
      <div class="app-container__task-list">
        <div class="task-list__task " v-for="(task, index) in tasks" :key="index">
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
          @focus="error = false"
        ></textarea>
        <div v-if="error" class="add-task__error">Введите текст!</div>
        <div class="add-task__buttons">
          <button class="add-task__add-card-button" @click="addToDo">Add Card</button>
          <button @click="showBottomSettings = !showBottomSettings" class="add-task__settings">
            <img src="./assets/ellipsis.png" alt="">
          </button>
          <div v-if="showBottomSettings" class="buttons__settings">
            <button @click="selectPosition()" class="add-task__reverseList" :class="settingBottom">Добавлять в начало</button>
          </div>
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
        myTodo: '',
        error: false,
        showTitleSettings: false,
        reverseSort: false,
        showBottomSettings: false,
        addingInStart: false,
        settingTitle: 'settingOff',
        settingBottom: 'settingOff'
    }
  },
  computed:{
    tasks(){
      return (this.$store.getters.getItems)
    },
    number(){
      if (this.tasks.length == 0) {
        return 1
      } else if (this.addingInStart === false) {
        return (this.tasks.length - 1) +1
      } else {
        return this.tasks[0].number - 1
      }
    }
  },
  methods: {
    addToDo: function () {
      if (this.reverseSort == true){
        this.reverseList()
      }
      if (this.myTodo !== '') {
        db.collection('items').add({
          title: this.myTodo,
          created_at: Date.now(),
          number: this.number
        }).then((response) => {
          if (response) {
            this.myTodo = ''
          }
        })    
      } else {
        this.error = true
      }
    },
    deleteItem: function (id) {
      if (id) {
        db.collection("items").doc(id).delete()
      }
    },
    reverseList(){
      this.tasks.reverse()
      this.reverseSort = !this.reverseSort

      if (this.settingTitle !== 'settingOff') {
        this.settingTitle = 'settingOff'
      } else  if (this.settingTitle !== 'settingOn') {
        this.settingTitle = 'settingOn'
      }

      setTimeout(() => this.showTitleSettings = false, 500)
    },
    selectPosition(){
      this.addingInStart = !this.addingInStart

      if (this.settingBottom !== 'settingOff') {
        this.settingBottom = 'settingOff'
      } else  if (this.settingBottom !== 'settingOn') {
        this.settingBottom = 'settingOn'
      }

      setTimeout(() => this.showBottomSettings = false, 500)
    }
  }
}
</script>

<style scoped>
  html{
    min-height: 100%;
  }
  button {
    background: none;
    border: none;
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
    position: relative;
    font-weight: bold;
    font-size: 30px;
    display: flex;
    margin-bottom: 10px;
  }

  .title__settings-button img,
  .add-task__settings img {
    width: 30px;
  }
  
  .title__settings {
    padding: 0;
    margin: 0;
    position: absolute;
    top: 30px;
    right: 0;
    padding: 5px;
    border-radius: 5px;
  }
  
  .settings__reverseList {
    margin: 0;
    background: blue;
    color: #fff;
    font-size: 15px;
    padding: 5px;
    border-radius: 5px;
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

  .add-task__input-field{
    box-sizing: border-box;
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
    resize: none;
    box-shadow: 0 1px 0 0 #B0B8BE;
  }

  .add-task__error {
    color: #fff;
    background-color: red;
    border-radius: 5px;
    padding: 5px;
    margin-bottom: 10px;
    font-weight: bold;
  }

  .add-task__buttons {
    position: relative;
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

  .buttons__settings{
    position: absolute;
    bottom: 40px;
    right: 0;
  }

  .add-task__reverseList{
    margin: 0;
    background-color: #9C9EA0;
    color: #fff;
    font-size: 15px;
    padding: 5px;
    border-radius: 5px;
  }

  .settingOn {
    background: linear-gradient(to right, #6ED55E 50%, #9C9EA0 50%)
  }

  .settingOff {
    background: linear-gradient(to right, #9C9EA0 50%, #FF5959 50%)
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

    .title__settings-button,
    .add-task__settings{
      border: none;
      background: none;
    }

    .title__settings-button img,
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

    .title__settings-button,
    .add-task__settings{
      border: none;
      background: none;
    }

    .title__settings-button img,
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
