const CalculationError = require("./error")

function getNums(req){
    const {nums} = req.query;
    if(!nums){
        return null;
    } 
    else {
        const split_nums =nums.split(",")
        let numbers = split_nums.map(function(num){
        return parseInt(num,10)
    })
    return numbers
    }
}

function handleNumberErrors(numbers){
    if(numbers === null){
        throw new CalculationError("numbers are required",400)
    } 
    
    for(let num of numbers){
        if(isNaN(num)){
            throw new CalculationError(`numbers only`,400)
        }
    } 
}

function getMean(arr){
    const sum = arr.reduce((a,b) => a + b, 0)
    return sum / arr.length;
}

function getMedian(arr){
    const arrSorted = arr.sort((a,b) => a - b);
    return arrSorted.length % 2 === 0 ? (arrSorted[arrSorted.length/2 - 1] + arrSorted[arrSorted.length/2]) / 2 : arrSorted[Math.floor(arrSorted.length/2)]
}

function getMode(arr){
    const frequencyTable = {};
    arr.forEach(elem => frequencyTable[elem] = frequencyTable[elem] + 1 || 1);

    let mode = [];
    let maxFrequency = 0;
    for(const key in frequencyTable){
        if(frequencyTable[key] > maxFrequency){
            mode = [Number(key)];
            maxFrequency = frequencyTable[key];
        }
        else if(frequencyTable[key] === maxFrequency){
            mode.push(Number(key));
        }
    }

    if(mode.length === Object.keys(frequencyTable).length) mode = [];
    return mode;
}


module.exports = {
    getNums,
    getMean,
    getMedian,
    getMode,
    handleNumberErrors
}