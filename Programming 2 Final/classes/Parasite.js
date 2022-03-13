class Parasite extends LivingCreature{

    constructor(x, y, id, matrix, objectMatrix) {
        super(x,y,id)
        this.matrix = matrix;
        this.objectMatrix = objectMatrix;
        this.energy = 5;
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

    

    multiply() {
        let targetCells = this.chooseCells(3);
        let newCell = random(targetCells)

        if (this.energy >= 7 && newCell) {
            let newX = newCell[0];
            let newY = newCell[1];

            this.matrix[newY][newX] = this.id;
            let newParasite = new Parasite(newX, newY, this.id, this.matrix, this.objectMatrix);
            this.objectMatrix[newY][newX] = newParasite;
            this.energy -= 2;
        }
    }

    move() {
        let targetCells = this.chooseCells(0);
        let newCell = random(targetCells);

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
        let targetCells = this.chooseCells(3);
        let newCell = random(targetCells);

        if (this.energy > 0 && newCell) {
            let targetX = newCell[0];
            let targetY = newCell[1];

            this.objectMatrix[targetY][targetX].energy-=3;

            this.energy+=2;

            this.multiply();
        }else{
            this.move();
        }
        
    }

    die() {
        if (this.energy <= 0) {
            this.matrix[this.y][this.x] = 0;
            this.objectMatrix[this.y][this.x] = null;

            const targetCells = this.chooseCells(3);
            const deadPredator = random(targetCells);

            if(deadPredator){
                const predX = deadPredator[0];
                const predY = deadPredator[1];

                this.matrix[predY][predX] = 0;
                this.objectMatrix[predY][predX] = null;
            }
        }
    }

    update(){
        this.eat();
    }
}