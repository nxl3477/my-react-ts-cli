import * as React from 'react'
import TodoItem from './components/todoItem/todoItem'
import { useDispatch, useMappedState } from "redux-react-hook";
import './todolist.scss'
import {IState} from '../../store/Store'

const mapState = ( state: IState ) => {
  console.log('🍉Pin', state)
  return {
    todoList: state.todoList
  }
}


const TodoLists = () => {
  const [ count, setCount ] = React.useState(10)
  const [ name, setName ] = React.useState('xiaoming')
  const { todoList } = useMappedState(mapState)
  console.log('🍉🔥', todoList)

  const callback = React.useCallback((value) => {
    console.log('xxxxxxxxxxxxxx')
    console.log(value, count, name)
    console.log('xxxxxxxxxxxxxx')
  }, [count])

  const changeName = () => {
    setName(name + 'x')
  }

  const dispatch = useDispatch();
  const listAdd = React.useCallback(() => dispatch({ type: 'ADD_TODO', payload: '哈哈哈'+Math.random() }), [] )

  return (
    <div className="wrap">
      <button onClick={ callback }>callback{count}</button>
      <button onClick={ changeName }>改变名字： {name}</button>
      <p></p>
      以下是列表:
      {
        todoList.map((ele, index) => (
          <TodoItem thing={ele} key={ele} index={index} />
        ))
      }
      <p>-----------------------------------------</p>
      <button onClick={ listAdd }>list 增加按钮</button>
    </div>
  )
}

export default TodoLists