import React from 'react';
import '../../Assets/recharts.css';
import { BarChart, XAxis, YAxis, Bar,Legend } from 'recharts';
 class Chart2 extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            array:[]
        }
        this.state ={
            names : []
        }
    }

	componentDidMount(){
          
		let s = Object.keys(this.props.data);
			this.setState({array : s.map((key) => { return { value :this.props.data[key] }})});
        }
	
     render(){
         return(
             
            <BarChart
		width={500}
		height={300}
		data={this.state.array}
		margin={{
			top: 5, right: 30, left: 20, bottom: 5,
		}}
	>
		<XAxis dataKey="value" />
		<YAxis />
		<Legend />
		
		<Bar dataKey="value" fill="#82ca9d" />
	</BarChart>
         )  
     }
 }


export default Chart2;