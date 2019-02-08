import React from 'react'
import Card from './Card/ConnectedComponent.js'

class Wrapper extends React.Component{
  render(){
    return (
      <div className="card-wrapper">
        <Card />
      </div>
    )
  }
}


export default Wrapper;
