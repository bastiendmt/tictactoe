import { expect, test } from 'vitest';
import {
  Grid,
  checkDiagonalDirection,
  checkHorizontal,
  checkVertical,
} from './App';

/**
 * Dynamically creates a grid with a vertical or horizontal winning configuration
 * @param gridSize Size of the Grid (X by X)
 * @param winningDirection Direction of the winning grid
 * @param validIndex Index of the column to put 'X'
 */
function createVerticalValidGrid(
  gridSize: number,
  winningDirection: 'horizontal' | 'vertical',
  validIndex = -1
): Grid {
  const grid: Grid = [];

  for (let i = 0; i < gridSize; i++) {
    const row: string[] = [];
    for (let j = 0; j < gridSize; j++) {
      // Set the value of each cell in the column to columnValue
      const incrementChar = String.fromCharCode(
        'a'.charCodeAt(0) + i * gridSize + j
      );
      const isVertical = winningDirection === 'vertical';
      const isVerticalMatch = isVertical && j === validIndex;
      const isHorizontalMatch = !isVertical && i === validIndex;

      const cellValue =
        isVerticalMatch || isHorizontalMatch ? 'X' : incrementChar;

      row.push(cellValue);
    }
    grid.push(row);
  }

  return grid;
}

test('horizontal function', () => {
  const standardGrid = createVerticalValidGrid(4, 'horizontal');
  expect(checkHorizontal(standardGrid)).toBe(false);
  const winningGrid = createVerticalValidGrid(4, 'horizontal', 2);
  expect(checkHorizontal(winningGrid)).toBeTruthy();
});

test('vertical function', () => {
  const standardGrid = createVerticalValidGrid(4, 'vertical');
  expect(checkVertical(standardGrid)).toBe(false);
  const winningGrid = createVerticalValidGrid(4, 'vertical', 2);
  expect(checkVertical(winningGrid)).toBeTruthy();
});

test('diagonal function', () => {
  const baseGrid: Grid = [
    ['a', 'b', 'c'],
    ['d', 'e', 'f'],
    ['g', 'h', 'i'],
  ];

  const LTRWinningGrid: Grid = [
    ['X', 'b', 'c'],
    ['d', 'X', 'f'],
    ['g', 'h', 'X'],
  ];
  const RTLWinningGrid: Grid = [
    ['a', 'b', 'X'],
    ['d', 'X', 'f'],
    ['X', 'h', 'i'],
  ];

  expect(checkDiagonalDirection(baseGrid, 'leftToRight')).toBe(false);
  expect(checkDiagonalDirection(LTRWinningGrid, 'leftToRight')).toBeTruthy();
  expect(checkDiagonalDirection(RTLWinningGrid, 'rightToLeft')).toBeTruthy();
});
