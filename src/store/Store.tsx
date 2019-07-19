import {createStore} from 'redux';
import reducer from './Reducer'
export interface IState {
  todoList: string[],
  map: Function
}

export type Action = {
  type: 'ADD_TODO';
  payload: String;
}| {
  type: 'LESS_TODO',
  payload: any[]
}

export function makeStore() {
  return createStore(reducer, {
    todoList: [
      'Make the fire!',
      'Fix the breakfast!',
      'Wash the dishes!',
      'Do the mopping!',
    ],
  });
}
