import React from 'react';
import './DetailAmmunition.css';

export default function DetailAmmunition(props) {  
  return (
    <div className="details-ammunition-inner">
      <h2>{ props.ammunition.name }</h2>
      <table>
        <tbody>
          <tr>
            <td>Price:</td>
            <td className="details-ammunition-value">${props.ammunition.price}</td>
          </tr>
          <tr>
            <td>Package size:</td>
            <td className="details-ammunition-value">{ props.ammunition.packageSize }</td>
          </tr>
        </tbody>
      </table>
      <p>{ props.ammunition.description }</p>
    </div>
  ); 
}