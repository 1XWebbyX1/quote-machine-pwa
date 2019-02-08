import React from 'react'
import Wrapper from './Wrapper/Wrapper.js'

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
