<template>
    <div id="todo" >
        <TodoItem/>
        <div>        <button @click.prevent="addToDo" class="btn">Add Task</button>
        </div>
    </div>
</template>

<script>
    import 'firebase/database'
    import Swal from 'sweetalert2'
    import TodoItem from "./TodoItem";
    export default {
        name: "Todo",
        components: {TodoItem},
        methods:{
            addToDo: async function () {
                Swal.fire({
                    title: 'Enter your task',
                    input: 'text',
                    inputPlaceholder: 'Enter your todo',
                    inputAttributes: {
                        maxlength: 10,
                        autocapitalize: 'off',
                        autocorrect: 'off'
                    }
                }).then((todo)=>{
                    if (todo.value !== ''){
                        this.$database.child('/users/' + this.$root.user_id).push().set({
                            todo_text: todo.value,
                            isChecked: false,
                        });
                        this.$root.updateToDo()
                    }
                })
            },
            /*cancelEdit:function(){
                TodoItem.data(function(){return{edit: '',}})
            },*/
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