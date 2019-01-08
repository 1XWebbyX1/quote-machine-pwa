import React from 'react'
import asyncComponent from './asyncComponent/async'

const Wrapper = asyncComponent(() =>
     import('./Wrapper').then(module => module.default)
);

class Container extends React.Component{
  render() {
    return(
        <div  id="container">
           <Wrapper id="quote-box" />
        </div>
    )
  }
}
export default Container;
