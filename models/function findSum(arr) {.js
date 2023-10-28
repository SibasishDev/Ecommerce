function findSum(arr) {
    return arr.reduce((sum, i) => +i.toString()[0] + +i.toString()[1] > 10 ? sum + +i.toString()[0] + +i.toString()[1] : sum + i , 0)
}

console.log(findSum([12, 32, 87, 21, 10, 96, 69, 99]));