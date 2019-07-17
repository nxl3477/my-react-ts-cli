import * as React from 'react'
import Todo from '../module/Todo'
import { action } from "mobx";

export default class TodoItem extends React.PureComponent<Todo.item> {

  childrenAddFn() {
    this.props.arr.push('xxx')
  }


  render() {
    console.log('🍉', this)
    return (
      <div>
        { this.props.thing }
        <button onClick={ () => this.childrenAddFn() }>子组件的添加</button>
      </div>
    )
  }
}


