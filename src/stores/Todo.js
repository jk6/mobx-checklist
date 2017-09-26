import { observable } from 'mobx';

class Todo {
    id = Math.random();
    @observable title;
    @observable finished = false;
    
    constructor(title) {
        this.title = title;
        this.reset = this.reset.bind(this);
    }
    /*reset (){
        this.finished = false;
    }*/
}

export default Todo;