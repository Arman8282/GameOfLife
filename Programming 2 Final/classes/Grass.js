class Grass extends LivingCreature {

    constructor(x, y, id, matrix, objectMatrix) {
       super(x,y,id)
        this.matrix = matrix;
        this.objectMatrix = objectMatrix;
        this.energy = 0;

    }


    multiply(){
        this.energy++;
        let targetCells = this.chooseCells(0);
        let newCell = random(targetCells)

        if(this.energy == 8 && newCell){
            let newX = newCell[0];
            let newY = newCell[1];

            this.matrix[newY][newX] = this.id;
            let newGrass = new Grass(newX,newY,this.id,this.matrix,this.objectMatrix);
            this.objectMatrix[newY][newX]=newGrass;
            this.energy = 0;
        }
    }

    update(){
        this.multiply();
    }
}