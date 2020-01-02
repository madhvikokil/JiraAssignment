import React from "react";
import "../../Assets/recharts.css";
import { BarChart, XAxis, YAxis, Bar } from "recharts";


class BarGraph extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
				arrays:[],
				loading : false
			}
		}
		
	
    
	componentDidMount(){
		const { arrays } = this.state;
		console.log("this.state.arrays : ",arrays);
	   	this.setState({loading : true})
		let obj =["open","accepted","inprog","review","resolved","done"];
			let s = Object.values(this.props.data);
			delete s[6];
			const dummy = s.map((key,index) => { return { value :s[index],name:obj[index]}});
				this.setState({arrays : dummy});
				
				
        }
	
     render(){
         return(<div className="bargraph-styling">
             <h3>Bar Graph of the table</h3>
			
				<BarChart
				width={500}
				height={300}
				data={this.state.arrays}
				margin={{
					top: 5, right: 30, left: 20, bottom: 5,
				}}
				>
				<XAxis dataKey="name" />
				<div className="editValue">
				<XAxis dataKey="value" /></div>
				<YAxis />
				<Bar dataKey="value" fill="#82ca9d" />
				
			</BarChart></div>
         )  
     }
 }


export default BarGraph;