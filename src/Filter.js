
import React,{PureComponent} from 'react'
import './Filter.css'
import Button from './Component/Button'
import axios from 'axios'




class Filter extends PureComponent{

    state={
        year:[2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020],
        launch_success:false,
        land_success:false,
        yearSelect:false,
        yearActive:[].fill(false,0,15),
        data:[]
    }

    clickHandlerYear=(x,i)=>{
      //console.log(x,i)
     // console.log('clicking')
      let temp=[...this.state.yearActive.fill(false)]
      temp[i]=true
      this.setState({yearSelect:x,yearActive:[...temp]})
      //console.log(this.state.yearActive)
        //  this.setState({yearSelect:x})
    }

    clickHandlerLaunch=(x)=>{
      this.setState({launch_success:true})
    }

    clickHandlerLand=(x)=>{
      this.setState({land_success:true})
    }
    
    componentDidUpdate(){
      // this.setState({ launch_success:false,
      //   land_success:false,
      //   yearSelect:false,
      //   yearActive:this.state.yearActive.fill(false)
      // })
      //console.log("Hello")
      let url="https://api.spaceXdata.com/v3/launches?limit=100"
     if(this.state.launch_success)
     url=url+"&launch_success=true"
     if(this.state.land_success)
     url=url+"&land_success=true"
     if(this.state.yearSelect)
     {
       let temp=this.state.yearSelect
     url=url+`&launch_year=${temp}`
     }
     console.log(url)
     axios.get(url)
     .then(response=>{
       //console.log(response.data)
       //console.log(response.data[0])
       this.setState({data:response.data})})

    

    }

    componentDidMount(){

      let url="https://api.spaceXdata.com/v3/launches?limit=100"
     
      axios.get(url)
      .then(response=>{
        this.setState({data:response.data})})

    }



  render(){
    

   return(
     <div className="Main-block" >
    <div className="Filter">
    <p><strong>Filters</strong></p>
    <p className="Para">Launch Year</p>
    <div className="Yearbox">
    {this.state.year.map((x,i)=>(<Button name={x} key={i} Isactive={this.state.yearActive[i]} clicked={()=>this.clickHandlerYear(x,i)}/>))}
   
    </div>
    <p className="Para">Successful Launch</p>
    <div className="Yearbox">
    <Button name="True"  clicked={(name)=>this.clickHandlerLaunch(name)}/>
    <Button name="False" clicked={(name)=>this.clickHandlerLaunch(name)}/>

    </div>
    <p className="Para">Successful Landing</p>
    <div className="Yearbox">
    <Button name="True" clicked={(name)=>this.clickHandlerLand(name)} />
    <Button name="False" clicked={(name)=>this.clickHandlerLand(name)}/>

    </div>
    </div>
    <div>
    <div className="imag">

{this.state.data.map((x,i)=>(
<div className="imagbox" key={i}>
<img src={x.links.mission_patch} alt={x.flight_number} width='70%' height="50%"/>
<p>{x.mission_name}#{x.flight_number}</p>
<p>Mission Ids: {x.mission_id}</p>
<p>Launch Year:{x.launch_year} </p>
<p>Launch Success: {x.launch_success}</p>
<p>Land Success: {this.state.land_success}</p>
</div>

))}

    </div>
 
    </div>
    </div>
   )

  }
}

export default Filter