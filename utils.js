// 交换
function swap(arr, i, j) {
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}

//  产生部分有序数据
function getTestData({dataSize = 10000, hasNegative = false}) {
    const arr = [];
    const onePartSize = dataSize * 0.1;
    const midData = dataSize / 2;
    for(let i = 0; i < dataSize; i++) {
        if(i < onePartSize) {
            arr[i] = hasNegative ? onePartSize - i - midData : onePartSize - i;
        } else {
            arr[i] = hasNegative ? i - midData : i;
        }
    }
    return arr;
}

// 产生完全无序的数据
function shakeData(arr) {
    const size = arr.length;
    for(let i = 0; i < size; i++) {
        const randomIndex = Math.floor(Math.random() * size);
        const safeRandomIndex = randomIndex ? randomIndex - 1 : randomIndex;
        swap(arr, safeRandomIndex, safeRandomIndex + 1);
    }
}

// 运行算法函数，检测算法性能
function run({
    sortFunc,
    dataSize = 50000,
    showSortedArr = false,
    funcArgs = [],
    hasNegative = false
}) {
    const arr = getTestData({dataSize, hasNegative});
    // console.log('data: ', arr);
    let start = Date.now();

    // 调用目标函数处理部分有序数据
    sortFunc(arr, ...funcArgs);

    let cost =  Date.now() - start;
    console.log(`部分有序，${sortFunc.name} 用时 ${cost}`);
    shakeData(arr);
    // console.log('shakeData: ', arr);
    start = Date.now();

    // 调用目标函数处理完全无序数据
    sortFunc(arr, ...funcArgs);

    cost =  Date.now() - start;
    console.log(`完全无序，${sortFunc.name} 用时 ${cost}`);

    if (showSortedArr) {
        console.log(arr);
    }
}

window.swap = swap;
window.getTestData = getTestData;
window.shakeData = shakeData;
window.run = run;