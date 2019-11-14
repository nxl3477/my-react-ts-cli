import * as React from 'react'
import { Button } from 'antd';

interface HellpProps {
  name:string,
  age: number;
}

export default class Hello extends React.Component<HellpProps> {
  
  render() {
    return (
      <div>
        Hello world React-ts
        <Button >asdasdasd</Button>
      </div>
    )
  }
}
