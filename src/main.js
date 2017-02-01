import React from 'react';
import ReactDOM from 'react-dom';
import TodoListView from './components/TodoListView';
import Todo from './Todo';
import TodoList from './TodoList';
import data from '../data/data';

const store = new TodoList();

data.map((item) => store.todos.push(new Todo(item.title)));

ReactDOM.render(<TodoListView todoList={store} />, document.getElementById('content'));
