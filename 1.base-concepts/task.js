"use strict"

function solveEquation(a, b, c) {
  let arr = [];
  let d = Math.pow(b, 2) - 4*a*c;
  if (d < 0) {
    return arr;
  } else if (d === 0) {
    let x = -b/(2*a);
    arr.push(x);
  } else {
    let x = (-b + Math.sqrt(d))/(2*a);
    let y = (-b - Math.sqrt(d))/(2*a);
    arr.push(x, y);
  }
  return arr;
}

function calculateTotalMortgage(percent, contribution, amount, countMonths) {
  let P = percent/100/12;
  let S = amount - contribution;
  let n = countMonths;

  let summPerMonth = S * (P + (P / (((1 + P)**n) - 1)));
  let total = +(summPerMonth*countMonths).toFixed(2);
  return total;
}
