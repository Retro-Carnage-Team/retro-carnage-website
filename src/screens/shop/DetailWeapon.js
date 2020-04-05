import React from 'react';
import './DetailWeapon.css';

export default function DetailWeapon(props) {  
    return (
        <div className="details-weapon-inner">
            <h2>{ props.weapon.name }</h2>
            <table>
                <tbody>
                    <tr>
                        <td>Price:</td>
                        <td className="details-weapon-value">{props.weapon.price}</td>                    
                        <td className="details-weapon-spacer" />                    
                        <td>Speed:</td>
                        <td className="details-weapon-value">{ props.weapon.speed }</td>
                    </tr>
                    <tr>
                        <td>Ammo:</td>
                        <td className="details-weapon-value">{ props.weapon.ammo }</td>
                        <td className="details-weapon-spacer" />
                        <td>Range:</td>
                        <td className="details-weapon-value">{ props.weapon.range } m</td>                    
                    </tr>
                    <tr>
                    <td>Length:</td>
                        <td className="details-weapon-value">{ props.weapon.length }</td>
                        <td className="details-weapon-spacer" />
                        <td>Weight:</td>
                        <td className="details-weapon-value">{ props.weapon.weight }</td>
                    </tr>
                </tbody>
            </table>
            <p>{ props.weapon.description }</p>
        </div>
    ); 
}