import * as React from 'react'
import TodoItem from './components/todoItem/todoItem'
import { useDispatch, useMappedState } from "redux-react-hook";
import './todolist.scss'





const TodoList = () => {
  const [ count, setCount ] = React.useState(10)
  const [ name, setName ] = React.useState('xiaoming')
  const callback = React.useCallback((value) => {
    console.log('xxxxxxxxxxxxxx')
    console.log(value, count, name)
    console.log('xxxxxxxxxxxxxx')
  }, [count])


  const changeName = () => {
    setName(name + 'x')
  }

  return (
    <div className="wrap">
      <button onClick={ callback }>callback{count}</button>
      <button onClick={ changeName }>改变名字： {name}</button>
    </div>
  )
}

export default TodoList