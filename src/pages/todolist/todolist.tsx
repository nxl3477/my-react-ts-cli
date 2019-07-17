import * as React from 'react'
import { observable, action } from "mobx";
import { observer } from "mobx-react";
import TodoItem from './todoItem/todoItem'
import './todolist.scss'
@observer
class TodoList extends React.PureComponent {
  @observable a:number = 1
  @observable b:number = 2
  @observable public TodoList:string[] = []

  @action
  pushThing():void {
    this.TodoList = [ ...this.TodoList, '哈哈哈哈']
  }

  render() {

    return (
      <div className="wrap">
       <div>{this.a + this.b}</div>
       {
         this.TodoList.map((ele, index) => (
            <TodoItem thing={ele} arr={this.TodoList} key={index}  />
         ))
       }
       <button onClick={ () => this.pushThing() }>加量</button>
      </div>
    )
  }
}

export default TodoList