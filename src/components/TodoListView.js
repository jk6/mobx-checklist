import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { action, inject, observer } from 'mobx-react';
import TodoView from './TodoView';
import 'bootstrap/dist/css/bootstrap.css';

@inject('todoList') @observer
class TodoListView extends Component { 
    constructor (props){
        super (props);

        this.loadData = this.loadData.bind(this);
        this.resetAllTheThings = this.resetAllTheThings.bind(this);
    } 

    resetAllTheThings (){
        this.props.todoList.resetTodos();
    }

    loadData (){
        this.props.todoList.loadTodos('http://localhost:3001/todos');
    }

    componentDidMount (){
        this.loadData();
    }
    render() {
        const { unfinishedTodoCount, data, todos } = this.props.todoList;
        
        const todosDisplay = todos.map(todo => {
            return (
                <TodoView 
                    key={todo.id} 
                    todo={todo}                      
                />
            );
        });

        return (
            <div style={styles.app}>
                <Grid>
                    <Row mdOffset={3}>
                        <Col md={8}>
                            {unfinishedTodoCount == 0 ?                    
                                <span>
                                    <h3>All tasks are complete!&nbsp;
                                    <i className="glyphicon glyphicon-ok" 
                                        style={{color: 'green', fontSize: 24}}></i>
                                    </h3><hr />
                                </span>                                                                            
                                :
                                <span>
                                    <h3>Tasks left&nbsp;
                                        <span 
                                            className="label label-default label-as-badge" 
                                            style={{fontSize: 24}}
                                        >
                                            {unfinishedTodoCount}
                                        </span> 
                                    </h3><hr />
                                </span>
                            }
                            </Col>                    
                        </Row>
                    <Row>
                        <Col md={8}>
                            <ul className="list-group">
                                {todosDisplay}
                            </ul>
                            
                            <br />
                            <button 
                                className="btn btn-primary btn-block"                                 
                                onClick={this.resetAllTheThings}
                                style={{fontSize: 20}}
                            >                                               
                                Reset&nbsp;&nbsp;
                                <i className="glyphicon glyphicon-refresh" style={{fontSize: 20}}></i>
                            </button>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

const styles = {
    app: {
        verticalAlign: 'middle'
    }
};

export default TodoListView;