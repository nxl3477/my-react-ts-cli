import * as React from 'react'

interface TstestProps {
  name: String,
  age: number
}

export default class Tstest extends React.Component<TstestProps> {
  render() {
    console.log(this.props)
    return (
      <div>
        Hello worldasdasd
      </div>
    )
  }
}
