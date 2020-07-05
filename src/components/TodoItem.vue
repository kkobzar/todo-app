<template>
    <div class="todo-list-box" v-if="this.$root.todo_list !== 'null'">
        <div class="todo-list" :class="{edit:$root.edit===index}"  v-for="(item, index) in this.$root.todo_list" :key="item.index" :data-index="index">
            <Task :item="item" :index="index"/>
            <div style="" class="subtasks">
                <div class="new-subtask">
                    <label v-if="addedSubtask == true && $root.edit === index" >Add subtask: </label>
                    <input class="new-subtask-input" v-if="addedSubtask == true && $root.edit === index" @change="addSubTask(index)" type="text" :data-index="index">
                    <button v-if="addedSubtask == false && $root.edit === index" @click.prevent="toggleSubTask" type="submit"><i class="fas fa-plus-circle"></i></button>
                </div>
                <div v-for="(t,i) in item" class="subtask-box" :key="t.index">
                    <div class="subtask-item" v-if="typeof t  === 'object'">
                        <div class="checkbox" @click.prevent="toggleSubToDo(t, index,i)" :class="{active:t.isChecked ==='true'}" :data-index="i">
                            <img src="../assets/img/icon-checkmark.svg" alt=""></div>
                        <label class="task-text">{{t.todo_text}}</label>
                        <input class="edit-item subtask" type="text" @change="editSubtask(index,i,t)" :data-index="i" :value="t.todo_text">
                        <button class="delete-todo" @click.prevent="deleteSubtask(index, i,e)"><i class="fas fa-times"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Swal from "sweetalert2";
    import Task from "./Task";

    export default {
        name: "TodoItem",
        components: {Task},
        data:function(){
            return {
                addedSubtask: false,
            }
        },
        methods:{
            toggleSubTask: function(){
                this.addedSubtask = !this.addedSubtask
            },
            addSubTask: function(todo_index){
                let val = this.$jQuery(`.new-subtask input.new-subtask-input[data-index="${todo_index}"]`).val().toLocaleString()

                this.$jQuery(`.new-subtask input.new-subtask-input[data-index="${todo_index}"]`).val('')
                console.log(val)
                this.$database.child(`/users/${this.$root.user_id}/${todo_index}`).push().set({
                    todo_text:val,
                    isChecked:false,
                })
                this.addedSubtask = false;
                this.$root.updateToDo()

            },
            editSubtask: function(todo_index,subtask_index,val){
                let str = this.$jQuery(`input.edit-item[data-index="${subtask_index}"]`).val().toString()
                this.$database.child(`/users/${this.$root.user_id}/${todo_index}/${subtask_index}`).set({
                    todo_text: str,
                    isChecked: val.isChecked,
                })
                this.$root.updateToDo()
            },
            editTask:function(index){
                this.$database.child(`/users/${this.$root.user_id}/${index}/todo_text`).set(this.$jQuery(`input.edit-item[data-index="${index}"]`).val().toString())
                this.$root.updateToDo()
            },

            toggleSubToDo: async function (item,index_root,index) {
                this.$jQuery('.checkbox[data-index="'+index+'"]').toggleClass('active')
                this.$database.child('/users/' + this.$root.user_id + '/' + index_root + '/'+index).set({
                    todo_text: item.todo_text,
                    isChecked: item.isChecked === 'true'? 'false':'true',
                }).then( ()=> {
                    this.$root.updateToDo()
                })
            },
            deleteSubtask: async function(todo_index, subtask_index){
                Swal.fire({
                    title:'Are you sure?',
                    showCancelButton: true,
                    icon: 'question'
                }).then((res)=>{
                    if (res.isConfirmed){
                        this.$database.child('/users/' + this.$root.user_id + '/' + todo_index + '/'+subtask_index).set(null)
                        this.$root.updateToDo()
                    }
                })
            },
        },
    }
</script>

<style>
    .task-descr{
        width: 100%;
        font-size: .9em;
        padding: 0 0 0 20px;
        margin-bottom: 10px;
        color: rgba(97, 93, 108, 0.8);
    }
    .subtask-item{
        display: flex;
        padding: 5px 20px;
    }
    .edit-todo,.delete-todo{
        color: #615d6c;
        font-size: 1rem;
        display: none;
        margin-left: auto;
        transition: .1s;
    }
    .todo-list.edit .delete-todo, .todo-list.edit .edit-item{
        display: block;
    }
    .todo-list.edit .edit-todo, .edit-item,.todo-list.edit .task-text{
        display: none;
    }
    .todo-list:not(.edit):hover .edit-todo{
        display: block;
    }
    .edit-item, .new-subtask-input{
        border: none;
        border-bottom: 2px solid #2c3e50;
        padding: 0 5px;
    }
</style>