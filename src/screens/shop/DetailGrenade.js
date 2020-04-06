import React from 'react';
import './DetailGrenade.css';

export default function DetailGrenade(props) {  
  return (
    <div className="details-grenade-inner">
      <h2>{ props.grenade.name }</h2>
      <table>
        <tbody>
         <tr>
            <td>Price:</td>
            <td className="details-grenade-value">{props.grenade.price}</td>                    
            <td className="details-grenade-spacer" />                    
            <td>Package size:</td>
            <td className="details-grenade-value">{ props.grenade.packageSize }</td>
          </tr>
          <tr>
            <td>Range:</td>
            <td className="details-grenade-value">{ props.grenade.range }</td>
            <td className="details-grenade-spacer" />
            <td>Radius:</td>
            <td className="details-grenade-value">{ props.grenade.radius }</td>
          </tr>
        </tbody>
      </table>
      <p>{ props.grenade.description }</p>
    </div>
  ); 
}