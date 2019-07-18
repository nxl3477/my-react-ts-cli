import { IState, Action } from './Store'


export default function reducer(
  state: IState | null | undefined,
  action: Action
) {
  if (!state) {
    return null;
  }

  switch(action.type) {
    case 'ADD_TODO':
      return { ...state, todoList: [ ...state.todoList, action.payload ] }
    case 'LESS_TODO':
      return { ...state, todoList: action.payload }
  }
}