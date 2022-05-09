function GetWallLayout() {
    const empty = 0;
    const wall = 1;
    const hole = 2;
    return [
        [wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall],//1
        [wall, empty, empty, empty, wall, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, wall, empty, empty, empty, wall],//2
        [wall, empty, wall, empty, wall, empty, wall, wall, wall, wall, wall, empty, wall, wall, wall, wall, wall, empty, wall, empty, wall, empty, wall],//3
        [wall, empty, empty, empty, empty, empty, empty, empty, wall, empty, empty, empty, empty, empty, wall, empty, empty, empty, empty, empty, empty, empty, wall],//4
        [wall, wall, wall, empty, wall, empty, wall, empty, wall, empty, wall, wall, wall, empty, wall, empty, wall, empty, wall, empty, wall, wall, wall],//5
        [wall, empty, empty, empty, wall, empty, wall, empty, wall, empty, wall, hole, wall, empty, wall, empty, wall, empty, wall, empty, empty, empty, wall],//6
        [wall, empty, wall, empty, wall, empty, wall, empty, wall, empty, wall, wall, wall, empty, wall, empty, wall, empty, wall, empty, wall, empty, wall],//7
        [wall, empty, empty, empty, wall, empty, wall, empty, empty, empty, empty, empty, empty, empty, empty, empty, wall, empty, wall, empty, empty, empty, wall],//8
        [wall, wall, wall, wall, wall, empty, wall, empty, wall, wall, wall, wall, wall, wall, wall, empty, wall, empty, wall, wall, wall, wall, wall],//9
        [wall, empty, empty, empty, empty, empty, wall, empty, empty, empty, empty, empty, empty, empty, empty, empty, wall, empty, empty, empty, empty, empty, wall],//10
        [wall, empty, wall, wall, wall, wall, wall, empty, wall, wall, wall, empty, wall, wall, wall, empty, wall, wall, wall, wall, wall, empty, wall],//11
        [wall, empty, empty, empty, empty, empty, empty, empty, wall, empty, empty, empty, empty, empty, wall, empty, empty, empty, empty, empty, empty, empty, wall],//12
        [wall, empty, wall, wall, wall, wall, wall, empty, wall, wall, wall, wall, wall, wall, wall, empty, wall, wall, wall, wall, wall, empty, wall],//13
        [wall, empty, empty, empty, empty, empty, wall, empty, empty, empty, empty, empty, empty, empty, empty, empty, wall, empty, empty, empty, empty, empty, wall],//14
        [wall, wall, wall, wall, wall, empty, wall, empty, wall, wall, wall, wall, wall, wall, wall, empty, wall, empty, wall, wall, wall, wall, wall],//15
        [wall, empty, empty, empty, wall, empty, wall, empty, empty, empty, empty, empty, empty, empty, empty, empty, wall, empty, wall, empty, empty, empty, wall],//16
        [wall, empty, wall, empty, wall, empty, wall, empty, wall, empty, wall, wall, wall, empty, wall, empty, wall, empty, wall, empty, wall, empty, wall],//17
        [wall, empty, empty, empty, wall, empty, wall, empty, wall, empty, wall, hole, wall, empty, wall, empty, wall, empty, wall, empty, empty, empty, wall],//18
        [wall, wall, wall, empty, wall, empty, wall, empty, wall, empty, wall, wall, wall, empty, wall, empty, wall, empty, wall, empty, wall, wall, wall],//19
        [wall, empty, empty, empty, empty, empty, empty, empty, wall, empty, empty, empty, empty, empty, wall, empty, empty, empty, empty, empty, empty, empty, wall],//20
        [wall, empty, wall, empty, wall, empty, wall, wall, wall, wall, wall, empty, wall, wall, wall, wall, wall, empty, wall, empty, wall, empty, wall],//21
        [wall, empty, empty, empty, wall, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, wall, empty, empty, empty, wall],//22
        [wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall]//23
    ];
}

function GetFreeIndexesArray(board) {
    let free_indexes = [];
    for (let i = 0; i < board[0].length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (board[i][j] == 0)
                free_indexes.push({x: j, y: i});
        }
    }
    return free_indexes;
}

function RemoveAndReturnRandomItemFromArray(arr) {
    let index = Math.floor(Math.random() * arr.length);
    let val = arr[index];
    arr.splice(index, 1);
    return val
}

export {GetWallLayout, GetFreeIndexesArray, RemoveAndReturnRandomItemFromArray};
