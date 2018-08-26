let str = 'What does the fox say?';
let strArray = str.split('');
let frequency = {};

strArray.forEach(letter => {
    if (letter in frequency) {
        frequency[letter] = frequency[letter] + 1;
    } else {
        frequency[letter] = 1;
    }
});

console.log(frequency);

let allKeys = Object.keys(frequency); console.log(allKeys)
let allValues = Object.values(frequency); console.log(allValues)
let sortedCharsArray = [];
let sortedChars = [];
let maxIndex;

for (let ii = 0; ii < Object.keys(frequency).length; ii++) {
    let max = Math.max(...allValues);
    for (let jj = 0; jj < Object.keys(frequency).length; jj++) {
        if (allValues[jj] == max && jj !== maxIndex) {
            maxIndex = jj;
            allValues[jj] = 0;
            break;
        }
    }
    sortedChars.push(allKeys[maxIndex]);    
};

console.log(sortedChars);

let formula = {};
let first = false;
let zeroes = '0';

sortedChars.forEach((letter, index) => {
    // if (index == sortedChars.length - 1) {
    //     formula[letter] = zeroes;
    // }
    if (first) {
        formula[letter] = zeroes + 1;
        zeroes = zeroes + '0';
    } else {
        first = true;
        formula[letter] = '1';
    }
});

console.log(formula);

let compressed = '';

strArray.forEach((letter) => {
    compressed = compressed + formula[letter];
});


console.log(compressed)

let decrypt = compressed.split('1'); console.log(decrypt)
let newString = '';
let formulaValues = Object.values(formula); console.log(formulaValues)
let formulaKeys = Object.keys(formula); console.log(formulaKeys)

decrypt.forEach((char, index) => {
    if (index < (decrypt.length -1)) {
        char = char + '1'; 
        index = formulaValues.indexOf(char); 
        newString += formulaKeys[index];
    }
});

console.log(str);
console.log(compressed);
console.log(newString);