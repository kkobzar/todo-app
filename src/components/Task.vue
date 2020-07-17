<template>
    <div class="todo-list-body">
        <div class="checkbox" @click.prevent="toggleToDo(item, index)" :class="{active:item.isChecked ==='true'}" :data-index="index">
            <img src="../assets/img/icon-checkmark.svg" alt=""></div>
        <div class="task-text">{{item.todo_text}}</div>
        <div class="edit-item-box">
            <input class="edit-item" @change="editTask(index,item)" type="text" :data-index="index" :value="item.todo_text">
            <span class="separator"></span>
        </div>
        <button class="delete-todo" @click.prevent="deleteToDo(index)"><i class="fas fa-times"></i></button>
        <button class="edit-todo" @click.prevent="editToDo(index)"><i class="far fa-edit"></i></button>
        <div v-if=" typeof item.todo_descr !== 'undefined'" class="task-descr">{{item.todo_descr}}</div>
    </div>
</template>

<script>
    import Swal from "sweetalert2";

    export default {
        name: "Task",
        props: ['item','index'],
        methods:{
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
            editToDo: function(todo_index){
                this.$root.edit = todo_index;
            },
            toggleToDo: async function (item,index) {
                this.$jQuery(`.checkbox[data-index="${index}"]`).toggleClass('active')
                this.$database.child(`/users/${this.$root.user_id}/${index}/isChecked`).set(item.isChecked === 'true'? 'false':'true')
                .then( ()=> {
                    this.$root.updateToDo()
                })
            },
            deleteToDo: async function (index) {
                Swal.fire({
                    title:'Are you sure?',
                    showCancelButton: true,
                    icon: 'question'
                }).then((res)=>{
                    if (res.isConfirmed){
                        this.$database.child('/users/' + this.$root.user_id + '/' + index).set(null)
                        this.$root.updateToDo()
                    }
                })

            },

        },
    }
</script>

<style scoped>

</style>