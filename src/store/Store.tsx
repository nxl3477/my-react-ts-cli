import {createStore} from 'redux';
import reducer from './Reducer'
export interface IState {
  todoList: string[]
}

export type Action = {
  type: 'ADD_TODO';
  payload: String;
}| {
  type: 'LESS_TODO',
  payload: any[]
}


export const store = createStore(reducer, {
  todoList: [
    'Make the fire!',
    'Fix the breakfast!',
    'Wash the dishes!',
    'Do the mopping!',
  ],
});
