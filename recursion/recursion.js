function tripleSteps(n, hash) {
  if (hash[n] !== "undefined") {
    debugger
    return hash[n];
  } else {
    console.log("wtf");
    // return (tripleSteps(n-1, hash) + tripleSteps(n-2, hash) + tripleSteps(n-3, hash));
  }
}

console.log(tripleSteps(2, {1: 1, 0: 1, '-1': 0, '-2': 0}));
