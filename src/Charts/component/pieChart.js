import React, { PureComponent } from "react";
import { PieChart, Pie,Sector } from "recharts";
import "../../Assets/recharts.css";

export default class Chart extends PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			array : [],
			activeIndex : 0,
			loading : false
		}
	}
   
	onPieEnter = (data, index) => {
		this.setState({
		  activeIndex: index,
		});
	  };

	componentDidMount(){
		
			let obj =["open","accepted","inprogress","review","resolved","done"];
			let s = Object.values(this.props.data);
			delete s[6];
			const dummy = s.map((key,index) => { return { value :s[index],name:obj[index]}});
				this.setState({array :dummy});
				
		}
    
   
		renderActiveShape = (props) => {
			const RADIAN = Math.PI / 180;
			const {
			  cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
			  fill, payload, value,
			} = props;
			const sin = Math.sin(-RADIAN * midAngle);
			const cos = Math.cos(-RADIAN * midAngle);
			const sx = cx + (outerRadius + 10) * cos;
			const sy = cy + (outerRadius + 10) * sin;
			const mx = cx + (outerRadius + 30) * cos;
			const my = cy + (outerRadius + 30) * sin;
			const ex = mx + (cos >= 0 ? 1 : -1) * 22;
			const ey = my;
			const textAnchor = cos >= 0 ? 'start' : 'end';
		  
			return (
			  <g>
				<text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
				<Sector
				  cx={cx}
				  cy={cy}
				  innerRadius={innerRadius}
				  outerRadius={outerRadius}
				  startAngle={startAngle}
				  endAngle={endAngle}
				  fill={fill}
				/>
				<Sector
				  cx={cx}
				  cy={cy}
				  startAngle={startAngle}
				  endAngle={endAngle}
				  innerRadius={outerRadius + 6}
				  outerRadius={outerRadius + 10}
				  fill={fill}
				/>
				<path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
				<circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
				<text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{` ${value}`}</text>
				<text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
				  
				</text>
			  </g>
			);
		  };
		  
	
	render() {
		
		return (
           
			<div className="piechart-styling">
				
				<h3>Pie Chart of the table</h3>
				<PieChart width={400} height={400}>
				<Pie
				activeIndex={this.state.activeIndex}
				activeShape={this.renderActiveShape}
				data={this.state.array}
				cx={200}
				cy={200}
				innerRadius={60}
				outerRadius={80}
				fill="#8884d8"
				dataKey="value"
				onMouseEnter={this.onPieEnter}
				/>
			</PieChart>
				</div>
	
		);
	}
}