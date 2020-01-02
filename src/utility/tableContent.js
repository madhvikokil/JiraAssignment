import React from 'react';
import FetchBody from './tableRows';
import '../Assets/tableData.css';
import '../Assets/tableEdit.css';
export default {

    tableHeader: (props) => {
        const headerLabelColor={
            0:"#7a864a",
            1:"#42526e",
            2:"#42526e",
            3:"#0747a6",
            4:"#0747a6",
            5:"#006644",
            6:"#006644",
            7:"#0052cc"
        }

        const headerLabelBackgroundColor = {
            5:"#e3fcef",
            6:"#e3fcef",
            3:"#deebff",
            4:"#deebff"
        }
        
        const o = Object.keys(props[0]);
        return o.map((key,index)=>{
            if(key === "open" || key === "accepted" || key === "in_Progress" || key === "review" || key === "resolved" || key === "done" ){
                const ReplacedKey = key.replace(/_/g, ' ');
                return <th key={key} ><td class="headerBox" style={{color:`${headerLabelColor[index]}`,backgroundColor:`${headerLabelBackgroundColor[index]}`}}>{ReplacedKey.toUpperCase()}</td></th>
            }
            if(key === "total"){
                const ReplacedKey = key.replace(/_/g, ' ');
                return <th key={key} style={{color:'#0747a6',backgroundColor:'rgb(244,245,247)',fontWeight:'800'}}>{ReplacedKey.toUpperCase()}</th>
            }
            else{
                const ReplacedKey = key.replace(/_/g, ' ');
                return <th className = "alignField" key={key}>{ReplacedKey.toUpperCase()}</th>
            }
        
        })
    },
    
    tableRow: (props,props2) =>{
                  
        const items = props;
        const item2 = props2;
        const keys = Object.keys(props[0]);
        if(item2){
            return items.map((row, index)=>{
            return <tr class="editRow" key={index}><FetchBody.RenderProgressRow key={index} data={row} keys={keys} item={item2} /></tr>
            })
        }
        return items.map((row, index)=>{
        return <tr  key={index} ><FetchBody.RenderRow key={index} data={row} keys={keys} /></tr>
        })
    },

    tableFooter: (props,p) =>{
        const colorObject={
            0:'#42526e',
            1:'#42526e',
            2:'#654982',
            3:"#f15c75",
            4:"#14892c"
        }
        const o = Object.values(props);
        if(p){
           
         return o.map((key,index)=>(
                   
         <td class="editRow" key={key}><b>{key}</b>&nbsp;
                <div class="progress">
                <div class="inside" style={{width:100+'px',backgroundColor:`${colorObject[index]}`}} ></div>&nbsp;
                </div><b>100%</b>
        </td>))
        }

        else{
            return o.map((key)=>(
            <td class="editRow" key={key}><b>{key}</b></td>))
        }
    }
 }
