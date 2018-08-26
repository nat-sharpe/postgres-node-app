
let getFormula = (sortedChars) => {
    let formula = {};
    let first = false;
    let zeroes = '0';

    sortedChars.forEach((letter) => {
        if (first) {
            formula[letter] = zeroes + 1;
            zeroes = zeroes + '0';
        } else {
            first = true;
            formula[letter] = '1';
        }
    });
    return formula;
};

let sortHighLow = (frequency) => {
    let allKeys = Object.keys(frequency); 
    let allValues = Object.values(frequency);
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
    return getFormula(sortedChars);
};

let findFrequency = (strArray) => {
    let frequency = {};
    strArray.forEach(letter => {
        if (letter in frequency) {
            frequency[letter] = frequency[letter] + 1;
        } else {
            frequency[letter] = 1;
        }
    });
    return sortHighLow(frequency);
};

let writeBody = (strArray, formula) => {
    let compressed = '';
    strArray.forEach((letter) => {
        compressed = compressed + formula[letter];
    });
    return compressed;
};

let compress = (str) => {
    let strArray = str.split('');
    let formula = findFrequency(strArray);
    let body = writeBody(strArray, formula);
    return {body, formula};
};

let decompress = (body, formula) => {
    let strArray = body.split('1'); 
    let formulaValues = Object.values(formula); 
    let formulaKeys = Object.keys(formula);
    let decompressed = '';
    
    strArray.forEach((char, index) => {
        if (index < (strArray.length -1)) {
            index = formulaValues.indexOf(char + '1'); 
            decompressed += formulaKeys[index];
        }
    });

    return decompressed;
};

let test = (str) => {
    let compressed = compress(str);
    let decompressed = decompress(compressed.body, compressed.formula)
    console.log(compressed.body);
    console.log(compressed.formula);
    console.log(decompressed);
};

let message = 'The wind in the willows...'
test(message);