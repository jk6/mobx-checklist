import axios from 'axios';
import { action, observable, computed } from 'mobx';

class TodoList {
    @observable todos = [];    

    @action loadTodos (url){
        axios.get(url)
            .then(response => this.todos = response.data)            
            .catch(err => console.log(err.toString()));
    }

    @action resetTodos (){
        this.todos.map(todo => todo.finished = false);
    }
    
    @computed get unfinishedTodoCount () {
        return this.todos.filter(todo => !todo.finished).length || 0;        
    }
}

export default TodoList;