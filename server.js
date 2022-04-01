var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3002);

matrix = [];
grassArr =[]
grassEaterArr =[]
parasiteArr =[]
predatorArr =[]
robotArr =[]


var n = 50;


function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

for (let i = 0; i < n; i++) {
    matrix[i] = [];
    for (let j = 0; j < n; j++) {
        matrix[i][j] = Math.floor(rand(0, 6))
        
    }  
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


function xax(){
    for (i in grassArr){
        grassArr[i].mul()

    }
    io.sockets.emit("send matrix", matrix)
}
setInterval(xax,100);

io.on('connection', function (socket) {
    // createMatrix(50,50)
    createObjectsMatrix()
})


