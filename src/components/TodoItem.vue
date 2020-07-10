<template>
    <div class="todo-list-box" v-if="this.$root.todo_list !== 'null'">
        <div class="new-todo todo-list">
            <div class="edit-item-box" >
                <input autofocus class="edit-item" id="add-todo" style="display: block; width: 100%;" @change="addTodo()" type="text">
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
</template>

<script>
    import Task from "./Task";
    import Subtask from "./Subtask";

    export default {
        name: "TodoItem",
        components: {Subtask, Task},
        methods: {
            addTodo: function () {

            }
        },
    }
</script>