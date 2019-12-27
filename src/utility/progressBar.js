import React from 'react';

export default{

    displayProgressBar: (props) => {
        return (<td key={props.aValue}><span className="underLine-name">{props.aValue}</span>&nbsp;&nbsp;
              <div class="progress">
                     <div class="inside underLine-name" style={{width:`${props.bar}` + 'px',backgroundColor:`${props.colors}`}}></div>  &nbsp;&nbsp;                
                      </div>&nbsp;&nbsp;{props.bar+'%'}
                    </td>)


    },
   
}
