
import React from 'react'
import './App.css';
import Filter from './Filter'



class App extends React.PureComponent{


  render(){


   return(
    <div className="main">
    <h1>SpaceX Launch Programs</h1>
    <Filter/>




    </div>
   )

  }
}

export default App