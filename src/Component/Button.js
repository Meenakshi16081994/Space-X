import React from 'react'
import './Button.css'


function Button(props){

     //console.log(props.Isactive)
    return(<button className={"btn"+(props.Isactive?" active":"")} onClick={props.clicked}>{props.name}</button>)


}

export default React.memo(Button)