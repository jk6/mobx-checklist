import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { observer } from 'mobx-react';
import TodoView from './TodoView';
import 'bootstrap/dist/css/bootstrap.css';

@observer
class TodoListView extends Component {  
    resetAllTheThings (todos){        
        todos.map(todo => todo.reset());
    }  
    render() {
        const { unfinishedTodoCount, todos } = this.props.todoList;
        return (
            <div style={appStyle}>
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
                                {todos.map(todo => {
                                    return (
                                        <TodoView 
                                            key={todo.id} 
                                            todo={todo} 
                                            style={style} 
                                        />
                                    );
                                })}
                            </ul>
                            
                            <br />
                            <button 
                                className="btn btn-primary btn-block" 
                                disabled={unfinishedTodoCount > 0}
                                onClick={this.resetAllTheThings.bind(this, todos)}
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

const style = {
    listStyle: 'none'
};
const appStyle = {
    verticalAlign: 'middle'
};

export default TodoListView;