var socket = io()
const side = 20;

function setup() {
    createCanvas(50 * side, 50 * side);
    background("grey");
    // frameRate(30);
}




function drawMatrix(matrix) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] === 1) {
                fill("green");
            }
            else if (matrix[y][x] === 2) {
                fill("yellow");
            }
            else if (matrix[y][x] === 3) {
                fill("red");
            }
            else if (matrix[y][x] === 4) {
                fill("blue");
            }
            else if (matrix[y][x] === 5) {
                fill("orange");
            }
            else {
                fill("grey")
            }
            rect(x * side, y * side, side, side)
        }
    }
}
socket.on("send matrix", drawMatrix)


// function updateObjectsMatrix(objectMatrix) {
//     for (let y = 0; y < objectMatrix.length; y++) {
//         for (let x = 0; x < objectMatrix[y].length; x++) {
//             const object = objectMatrix[y][x];
//             if (object) {
//                 object.update();
//             }
//         }
//     }
// }