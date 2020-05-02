import React from 'react';
import './InventoryStatusbar.css';

export default function InventoryStatusbar(props) {
  const status = (0 === props.current) ? '0%' : `${props.current * 100 / props.max}%`;
  return (
    <div className="inventory-statusbar">
      <div className="status" style={{ width: status }}/>
    </div>
  );
}
