class GrassEater {

    constructor(x, y, id, matrix, objectMatrix) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.matrix = matrix;
        this.objectMatrix = objectMatrix;
        this.energy = 10;
        this.updateCoordinates();
    }

    updateCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(characterId) {
        this.updateCoordinates();
        super.chooseCell(characterId)
    }

    multiply() {
        let emptyCells = this.chooseCell(0);
        let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        if (this.energy >= 12 && newCell) {
            let newX = newCell[0];
            let newY = newCell[1];

            this.matrix[newY][newX] = this.id;
            let newGrassEater = new GrassEater(newX, newY, this.id, this.matrix, this.objectMatrix);
            this.objectMatrix[newY][newX] = newGrassEater;
            this.energy -= 4;
        }
    }

    move() {
        let emptyCells = this.chooseCell(0);

        let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        if (this.energy > 0 && newCell) {
            let newX = newCell[0];
            let newY = newCell[1];

            this.matrix[this.y][this.x] = 0;
            this.matrix[newY][newX] = this.id;

            this.objectMatrix[newY][newX] = this;
            this.objectMatrix[this.y][this.x] = null;

            this.x = newX;
            this.y = newY;

            this.energy--;
        }
        this.die();
    }

    eat() {
        let emptyCells = this.chooseCell(1);
        let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (this.energy > 0 && newCell) {
            let newX = newCell[0];
            let newY = newCell[1];

            this.matrix[this.y][this.x] = 0;
            this.matrix[newY][newX] = this.id;

            this.objectMatrix[newY][newX] = this;
            this.objectMatrix[this.y][this.x] = null;

            this.x = newX;
            this.y = newY;

            this.energy++;

            this.multiply();
        }else{
            this.move();
        }
        
    }

    die() {
        if (this.energy <= 0) {
            this.matrix[this.y][this.x] = 0;
            this.objectMatrix[this.y][this.x] = null;
        }
    }

    update(){
        this.eat();
    }
}