var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

matrix = [];
grassArr =[]
grassEaterArr =[]
parasiteArr =[]
predatorArr =[]
robotArr =[]



function createMatrix(horizontalLength, verticalLength) {
    for (let y = 0; y < verticalLength; y++) {
        matrix[y] = [];
        for (let x = 0; x < horizontalLength; x++) {
            const randomSectionCursor = Math.floor(Math.random()*100);
            if (randomSectionCursor < 45) {
                matrix[y][x] = 1;
            }
            else if (randomSectionCursor < 70) {
                matrix[y][x] = 2;
            }
            else if (randomSectionCursor < 85) {
                matrix[y][x] = 3;
            }
            else if (randomSectionCursor < 87.5) {
                matrix[y][x] = 4;
            }
            else if (randomSectionCursor > 99.7) {
                matrix[y][x] = 5;
            }
            else {
                matrix[y][x] = 0
            }
        }
    }
    // return newMatrix;
}
io.sockets.emit("send matrix", matrix)

function createObjectsMatrix(){
    
    for(let y = 0;y<matrix[0].length;y++){
        matrix[y]=[];
        for(let x = 0;x<matrix[y].length;x++){
            if(matrix[y][x]===1){
                grassArr.push(new Grass(x,y,1,matrix,newObjectsMatrix));
              
            }
            else if(matrix[y][x]===2){
                 
                grassEaterArr.push(new GrassEater(x,y,2,matrix,newObjectsMatrix));
            }
            else if(matrix[y][x]===3){
                predatorArr.push(new Predator(x,y,3,matrix,newObjectsMatrix));
                
            }
            else if(matrix[y][x]===4){
                parasiteArr.push(new Parasite(x,y,4,matrix,newObjectsMatrix));
                
            }
            else if(matrix[y][x]===5){
                robotArr.push(new Robot(x,y,5,matrix,newObjectsMatrix));
                
            }    
            else{
                newObjectsMatrix[y][x]=null;
            }

        }
    }
io.sockets.emit("send matrix", matrix)}


io.on('connection', function (socket) {
    createMatrix(50,50)
    createObjectsMatrix()
})


