/* 
  Written by:
        SHIVAJI CHAULAGAIN

  * I didn't find rbfinterpolation javascript library anywhere.
    I wrote this part from scratch for rbfinterpolation of any kind of function.

    This code's output has been tested with the output of scipy.interpolate.rbf in python.
    THis code gives the exact(same) output as output given by scipy.interpolate.rbf in python.

*/
//...........................................................................................

// Radial Basis Function (Gaussian)
function gaussianRBF(r, epsilon) {
  return Math.exp(-Math.pow(epsilon * r, 2));
}
function linearRBF(r) {
  return r;
}

// Radial Basis Function (Thin Plate Spline)
function thinPlateSplineRBF(r) {
  return r === 0 ? 0 : Math.pow(r, 2) * Math.log(r);
}

// Radial Basis Function (Quintic)
function quinticRBF(r) {
  return Math.pow(r, 5);
}

// Euclidean distance
function euclideanDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

// solving linear system of equation
function solveLinearSystem(A, b) {
  const n = A.length;
  // Augment matrix A with vector b
  for (let i = 0; i < n; i++) {
    A[i].push(b[i]);
  }
  // Forward elimination
  for (let i = 0; i < n; i++) {
    // Make the diagonal contain all 1's
    let maxEl = Math.abs(A[i][i]);
    let maxRow = i;
    for (let k = i + 1; k < n; k++) {
      if (Math.abs(A[k][i]) > maxEl) {
        maxEl = Math.abs(A[k][i]);
        maxRow = k;
      }
    }
    // Swap the maximum row with the current row
    [A[maxRow], A[i]] = [A[i], A[maxRow]];
    // Make all rows below this one 0 in the current column
    for (let k = i + 1; k < n; k++) {
      const c = -A[k][i] / A[i][i];
      for (let j = i; j < n + 1; j++) {
        if (i === j) {
          A[k][j] = 0;
        } else {
          A[k][j] += c * A[i][j];
        }
      }
    }
  }

  // Backward substitution
  const x = Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    x[i] = A[i][n] / A[i][i];
    for (let k = i - 1; k >= 0; k--) {
      A[k][n] -= A[k][i] * x[i];
    }
  }

  return x;
}

// Compute weights
function computeWeights(x, y, values, rbfFunc, epsilon) {
  const N = x.length;
  const A = new Array(N).fill(0).map(() => new Array(N).fill(0));

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const r = euclideanDistance(x[i], y[i], x[j], y[j]);
      A[i][j] = rbfFunc(r, epsilon);
    }
  }

  const weights = solveLinearSystem(A, values);
  return weights;
}

// perform rbfinterpolation
function rbfInterpolation(x, y, values, xFineGrid, yFineGrid, rbfFunc, epsilon) {
  const rows = xFineGrid.length;
  const cols = xFineGrid[0].length;
  const weights = computeWeights(x, y, values, rbfFunc, epsilon);
  const interpolatedData = Array.from({ length: rows }, () => Array(cols).fill(0));

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let sum = 0.0;
      for (let k = 0; k < x.length; k++) {
        const r = euclideanDistance(xFineGrid[i][j], yFineGrid[i][j], x[k], y[k]);
        sum += weights[k] * rbfFunc(r, epsilon);
      }
      interpolatedData[i][j] = sum;
    }
  }
  return interpolatedData;
}

// generate meshgrid 
function generateFineGrid(xRange, yRange, step) {
  const xFine = [];
  const yFine = [];
  
  const xStep = (xRange[1] - xRange[0]) / (step - 1);
  const yStep = (yRange[1] - yRange[0]) / (step - 1);

  for (let i = 0; i < step; i++) {
    const rowX = [];
    const rowY = [];
    for (let j = 0; j < step; j++) {
      let x = xRange[0] + j * xStep; 
      let y = yRange[0] + i * yStep;
      rowX.push(x);
      rowY.push(y);
    }
    xFine.push(rowX);
    yFine.push(rowY);
  }

  return { xFine, yFine };
}
