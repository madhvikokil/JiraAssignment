import React from "react";
import "../../Assets/recharts.css";
import { BarChart, XAxis, YAxis, Bar,Legend } from "recharts";
class Chart2 extends React.Component{

    state ={
        array:[]
    }
    

	componentDidMount(){
       

        let obj =["open","accepted","inprogress","review","resolved","done"];
			let s = Object.values(this.props.data);
			delete s[6];
			
			const dummy = s.map((key,index) => { return { value :s[index],name:obj[index]}});
				this.setState({array : dummy});
        }
	
     render(){
         return(<>
             {/* <h3>Bar Graph of the the table</h3> */}
            <BarChart
		width={500}
		height={300}
		data={this.state.array}
		margin={{
			top: 5, right: 30, left: 20, bottom: 5,
		}}
	>
        <XAxis dataKey="name" />
		{/* <XAxis dataKey="value" /> */}
		<YAxis />
		<Legend />
		
		<br /><br /><Bar dataKey="value" fill="#82ca9d" />
	</BarChart></>
         )  
     }
 }


export default Chart2;