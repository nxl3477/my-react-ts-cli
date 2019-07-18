import * as React from 'react'
import TodoItem from './components/todoItem/todoItem'
import './todolist.scss'


class TodoList extends React.PureComponent {
  readonly state = { 
    todoList: [
     '喝可乐', 
     '打游戏'
    ]
  }

  constructor(props) {
    super(props)
    
  } 
  


  // shouldComponentUpdate(nextProps, nextState) {
  //   if( this.state.todoList != nextState.todoList ) {
  //     console.log('两次不一致， 同意更新')
  //     return true
  //   }
  //   console.log('更新前后todolist 一致， 所以不更新')
  //   return false
  // }

  concatHandle() {
    let todoList = this.state.todoList
    const rd = Math.random() * 30
    todoList = todoList.concat([ `concat操作: ${rd}` ])
    this.setState(() => ({
      todoList
    }))
  }

  pushHandle() {
    let todoList:any = this.state.todoList
    const rd = Math.random() * 30
    todoList.push( `push操作:${rd}` )
    this.setState(() => ({
      todoList
    }))
  }



  addThing() {
    console.log('触发setState')
    let todoList:any = this.state.todoList
    const rd = Math.random() * 30
    // todoList = todoList.concat([ `搞事情:${rd}` ])
    todoList.push([ `搞事情:${rd}` ])

    this.setState(() => ({
      todoList
    }))
    // todoList.push({
    //   thing: `事情:${rd}`
    // })
    // todoList.splice(3, 0, {
    //   thing: `事情:${rd}`
    // })

    // todoList = todoList.map(i => ({...i}))
    // todoList = JSON.parse( JSON.stringify(todoList) )

    // todoList.map(i => {
    //   i[rd] = rd
    // })

    // todoList = todoList.map(i => {
    //   i[rd] = rd
    //   i['id'] = rd
    //   return { ...i }
    // })


  }
  noChange() {
    console.log('修改前', this.state)
    let todoList:any = this.state.todoList
    const rd = Math.random() * 30
    todoList.push({
      thing: `${rd}`
    })
    console.log('触发setState')
    this.setState(() => ({
      todoList
    }))

    console.log('修改后', this.state)
  }


  render() {
    const { todoList } = this.state
    console.log('🚀', this)
    return (
      <div className="wrap">
        <button onClick={() => this.pushHandle()}>Push操作</button>
        <button onClick={() => this.concatHandle()}>concat操作</button>
        {/* <button onClick={() => this.noChange()}>没有变化的setState</button> */}
        {/* 省略基础代码 */}
        {
          todoList.map( (item,index) => <TodoItem key={index}  thing={item} /> )
        }
      </div>
    )
  }
}

export default TodoList