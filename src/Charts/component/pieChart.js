import React, { PureComponent } from "react";
import { PieChart, Pie, Cell } from "recharts";
import "../../Assets/recharts.css";

const COLORS = ["#0088FE", "#F65F3F", "#0088FE", "#BA7C09","#0A7B25","#0000ff"];
const RADIAN = Math.PI / 180;


export default class Chart extends PureComponent {

    state={
        array:[]
    }
	
  

	componentDidMount(){
			let obj =["open","accepted","inprogress","review","resolved","done"];
			let s = Object.values(this.props.data);
			delete s[6];
			
			const dummy = s.map((key,index) => { return { value :s[index],name:obj[index]}});
				this.setState({array :dummy});
		}
    
    renderCustomizedLabel = ({
		cx, cy, midAngle, innerRadius, outerRadius, value,name
	}) => {
		const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
		const x = cx + radius * Math.cos(-midAngle * RADIAN);
		const y = cy + radius * Math.sin(-midAngle * RADIAN);
	
		return (
			<text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
				{`${value}`}
			</text>
		);
	};
	
	render() {
		
		return (
            <>
			
			<PieChart width={500} height={300}>
			<h3>Piechart </h3>
			<Pie
				
				data={this.state.array}
				cx={300}
				cy={200}
				labelLine={false}
				label={this.renderCustomizedLabel}
				outerRadius={80}
				fill="#8884d8"
				dataKey="value"
			>
				{
					this.state.array.map((entry, index) =>
					<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} ></Cell>)
				}
			</Pie>
		</PieChart> 
	 </>
		);
	}
}