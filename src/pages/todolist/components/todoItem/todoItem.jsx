import React, { Component } from 'react'
class TodoItem extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log('ok')
    return (
      <div>
        { this.props.thing }
      </div>
    )
  }
}

export default TodoItem