import React, { useState, useEffect } from 'react';
import Cell from './cell';

const Grid = () => {
  const [grid, setGrid] = useState([]);
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

  const simulateGeneration = () => {
    // Game logic implementation...
  };

  // Render the grid of cells
  return (
    <div>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex' }}>
          {row.map((cell, colIndex) => (
            <Cell
              key={colIndex}
              isAlive={cell}
              onClick={() => {
                const newGrid = [...grid];
                newGrid[rowIndex][colIndex] = !cell;
                setGrid(newGrid);
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
