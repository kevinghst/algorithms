function NumberSwapper() {
  a = a + b;
  b = a - b;
  a = a - b;
}

function wordFrequencies(array, word, hash) {
  if (hash === null) {
    let hash = [];
    for(i=0; i<array.length; i++) {
      if (hash[array[i]]) {
        hash[array[i]] += 1;
      } else {
        hash[array[i]] = 1;
      }
    }
    return [hash[word], hash];
  } else {
    return hash[word];
  }
}

let array = ["bear", "ate", "the", "child", "bear", "damn", "the"];

console.log(wordFrequencies(array, "bear", null));
