import React, { useState, useEffect } from 'react';
import Cell from './cell';
import "./ConwaySimulator.css";
import Slider from './Slider';

const ConwaySimulator = () => {
  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [percentAlive, setPercentAlive] = useState(30);

  const cellSize = 25; // Adjust this value as needed
  const gridRatio = 2 / 3; // Adjust the ratio as desired

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const gridWidth = Math.floor((screenWidth) / cellSize);
      const gridHeight = Math.floor((screenHeight * gridRatio) / cellSize);
      initializeGrid(gridWidth, gridHeight);
    };

    // Initialize the grid based on the current screen size
    const initializeGrid = (width, height) => {
      const newGrid = [];
      for (let i = 0; i < height; i++) {
        const row = [];
        for (let j = 0; j < width; j++) {
          row.push(Math.random() < 0.35);
        }
        newGrid.push(row);
      }
      setGrid(newGrid);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  },[cellSize, gridRatio]);
  
  // Toggle the state of a cell
  const handleToggleCell = (rowIndex, columnIndex) => {
    const newGrid = [...grid];
    newGrid[rowIndex][columnIndex] = !newGrid[rowIndex][columnIndex];
    setGrid(newGrid);
  }

  // Clear the grid entirely
  const clearGrid = () => {
    const newGrid = [];
    for (let i = 0; i < grid.length; i++) {
        const row = [];
        for (let j = 0; j < grid[i].length; j++) {
            row.push(false);
        }
        newGrid.push(row);
    }
    setGrid(newGrid);
  }

  function refreshPage() {
    window.location.reload(false);
  }

  // Simulate one generation of the game
  const simulateGeneration = () => {
    const newGrid = [];
    for (let i = 0; i < grid.length; i++) {
      const row = [];
      for (let j = 0; j < grid[i].length; j++) {
        const neighbors = countAliveNeighbors(i, j);
        const isAlive = grid[i][j];
  
        if (isAlive && (neighbors < 2 || neighbors > 3)) {
          row.push(false); // Cell dies due to underpopulation/overpopulation
        } else if (!isAlive && neighbors === 3) {
          row.push(true); // Cell becomes alive due to reproduction
        } else {
          row.push(isAlive); // Cell stays the same
        }
      }
      newGrid.push(row);
    }
    setGrid(newGrid);
  };
  
  // Count the number of alive neighbors around a given cell
  const countAliveNeighbors = (rowIndex, colIndex) => {
    let count = 0;
    const offsets = [-1, 0, 1];
  
    offsets.forEach((offsetRow) => {
      offsets.forEach((offsetCol) => {
        if (offsetRow === 0 && offsetCol === 0) return; // Exclude the current cell
  
        const neighborRow = rowIndex + offsetRow;
        const neighborCol = colIndex + offsetCol;
  
        if (
          neighborRow >= 0 &&
          neighborRow < grid.length &&
          neighborCol >= 0 &&
          neighborCol < grid[neighborRow].length &&
          grid[neighborRow][neighborCol]
        ) {
          count++;
        }
      });
    });
    return count;
  };

  // Render the grid of cells and simulate
  return (
    <div>
      <div className={"centerSection"}>
        <button className = {"button"} onClick={simulateGeneration}>Simulate Generation</button>
        <button className = {"button"} onClick={clearGrid}>Clear Grid</button>
        <button className = {"button"} onClick={refreshPage}>Randomize Grid</button>
      </div>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex' }}>
          {row.map((cell, colIndex) => (
            <Cell
              key={colIndex}
              isAlive={cell}
              onClick={() => {handleToggleCell(rowIndex, colIndex)}}
              onEnter={() => {if(mouseIsPressed) {handleToggleCell(rowIndex, colIndex)}}}
              onMouseDown={() => {setMouseIsPressed(true)}}
              onMouseUp={() => {setMouseIsPressed(false)}}
            />
          ))}
        </div>
      ))}
      <Slider>{percentAlive}</Slider>  
    </div>
  );
};

export default ConwaySimulator;
