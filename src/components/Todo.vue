<template>
    <div id="todo" >
        <div class="todo-list-box" v-if="this.$root.todo_list !== 'null'">
            <button v-show="!showInput" style="margin-bottom: 20px;" @click.prevent="toggleInput" class="btn">Add Task</button>
            <div v-show="showInput" class="new-todo todo-list">
                <div  class="edit-item-box" >
                    <input class="edit-item" id="add-todo" style="display: block; width: 100%;" @focusout="addToDo()" type="text">
                    <span class="separator"></span>
                </div>
            </div>
            <div class="todo-list" :class="{edit:$root.edit===index}"  v-for="(item, index) in this.$root.todo_list" :key="item.index" :data-index="index">
                <Task :item="item" :index="index"/>
                <Subtask :index="index" :item="item" />
            </div>
        </div>
        <div v-else>
            <h1><i class="fas fa-clipboard-check"></i> Add new task</h1>
        </div>
    </div>
</template>

<script>
    import 'firebase/database'
    import Swal from 'sweetalert2'
    import Task from "./Task";
    import Subtask from "./Subtask";
    export default {
        name: "Todo",
        data: function (){
            return{
                showInput: false,
            }
        },
        components: {Task,Subtask},
        methods:{
            toggleInput: function(){
                this.showInput = true
                document.getElementById("add-todo").focus();
            },
            addToDo: async function () {
                let str = this.$jQuery("#add-todo").val().toString()
                console.log(str)
                if (str === ''){
                    console.log('empty')
                    this.showInput = false
                    return
                }
                this.$database.child('/users/' + this.$root.user_id).push().set({
                    todo_text: str,
                    isChecked: false,
                }).then(()=>{
                    this.$root.updateToDo()
                });
                this.$jQuery("#add-todo").val('')
                this.showInput = false
                // this.$root.$jQuery(`input.edit-item[data-index="${key}"]`).focus()
            },
            addSubTask: function(todo_index){
                Swal.fire({
                    title: 'Enter your subtask',
                    input: 'text',
                    inputPlaceholder: 'Enter your subtask',
                    inputAttributes: {
                        maxlength: 10,
                        autocapitalize: 'off',
                        autocorrect: 'off'
                    }
                }).then(t=>{
                    this.$database.child('/users/'+ this.$root.user_id + '/' + todo_index).push().set({
                        todo_text:t.value,
                        isChecked:false,
                    })
                })

            },
        }
    }
</script>

<style scoped>
    #todo{
        min-height: 100%;
        display: flex;
        flex-direction: column;
    }

</style>