import React from 'react'
import asyncComponent from './asyncComponent/async'
const Card = asyncComponent(() =>
     import('./Card').then(module => module.default)
);

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
