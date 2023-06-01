import React from "react";

import "./cell.css";

const Cell = ({isAlive, onClick, onEnter, onMouseDown, onMouseUp}) => {
    return (
        <div
        className={`cell ${isAlive ? "cell-alive" : ""}`}
        onClick={onClick}
        onMouseEnter={onEnter}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        ></div>
    );
};

export default Cell;