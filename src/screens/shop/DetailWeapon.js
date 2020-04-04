import React from 'react';
import './DetailWeapon.css';

export default function DetailWeapon(props) {  
    return (
        <div className="details-inner">
            <h2>{ props.weapon.name }</h2>
            <table>
                <tbody>
                <tr>
                    <td>Range:</td>
                    <td className="details-value">{ props.weapon.range } m</td>
                    <td className="details-spacer" />
                    <td>Speed:</td>
                    <td className="details-value">{ props.weapon.speed } m</td>
                </tr>
                <tr>
                    <td>Ammo:</td>
                    <td className="details-value">{ props.weapon.ammo }</td>
                    <td className="details-spacer" />
                    <td>Length:</td>
                    <td className="details-value">{ props.weapon.length }</td>
                </tr>
                <tr>
                    <td>Price:</td>
                    <td className="details-value">${props.weapon.price}</td>
                    <td className="details-spacer" />
                    <td>Weight:</td>
                    <td className="details-value">{ props.weapon.weight }</td>
                </tr>
                </tbody>
            </table>
            <p>{ props.weapon.description }</p>
        </div>
    ); 
}