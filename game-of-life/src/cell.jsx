import React, {useState} from "react";

import "./cell.css";

const Cell = ({isAlive, onClick}) => {
    
    return (
        <div
        className={`cell ${isAlive ? "cell-alive" : ""}`}
        onClick={onClick}
        ></div>
    );
};

export default Cell;