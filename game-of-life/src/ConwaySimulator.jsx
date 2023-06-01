import React, { useState, useEffect } from 'react';
import Cell from './cell';

const ConwaySimulator = () => {
  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

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
        row.push(Math.random() < 0.5);
      }
      newGrid.push(row);
    }
    setGrid(newGrid);
  };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [cellSize, gridRatio]);

  const handleToggleCell = (rowIndex, columnIndex) => {
    const newGrid = [...grid];
    newGrid[rowIndex][columnIndex] = !newGrid[rowIndex][columnIndex];
    setGrid(newGrid);
  }

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
  
  // run simulateGeneration() every 500ms and toggle it on and off


  // Render the grid of cells
  return (
    <div>
      <button onClick={simulateGeneration}>Simulate Generation</button>
      <button onClick={clearGrid}>Clear Grid</button>
      <button onClick={console.log("Simulate Generations")}>Start/Stop</button>
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
    </div>
  );
};

export default ConwaySimulator;
