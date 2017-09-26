import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import TodoListView from './components/TodoListView';
import store from './stores/store';

ReactDOM.render(
    <Provider todoList={store.todoList}>
        <TodoListView />
    </Provider>,
    document.getElementById('content')
);
