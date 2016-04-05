var canvas = document.getElementById("canvasContainer");
var ctx = canvas.getContext('2d');
var cw = canvas.width;
var ch = canvas.height;
canvas.addEventListener("mousedown", clickHandler);

//casesList est une Array de Case
var casesList = new Array([1,2,3],[4,5,6],[7,8,9]);

var rows = 3;
var cols = 3;

var displayPos = [
    {col:0,row:0}, //0
    {col:1,row:0}, //1
    {col:2,row:0}, //2
    {col:0,row:1}, //3
    {col:1,row:1}, //4
    {col:2,row:1}, //5
    {col:0,row:2}, //6
    {col:1,row:2}, //7
    {col:2,row:2}, //8
]

var img=new Image();
resize(img);
img.onload=start;
img.src="Images\\image4.jpg";



function resize(img){
    //On change les dimensions de l'image
    img.width = 450; // Set new width
    img.height = 450;  // Set new height
};


function start(){
    shuffleList(casesList);
    display();
    victoryCheck();
}

function shuffleList(casesList){
    for(var compteur = 0; compteur < (5 + Math.floor(Math.random() * 100)); compteur++){
        var posX = -1;
        var posY = -1;
        //permet de trouver la position de la case qui doit se trouver en 9
        for(var i = 0; i < 3; i++){
            for(var j = 0; j < 3; j++){
                if(casesList[i][j] == 9){
                    posX = j;
                    posY = i;
                }
            }
        }
        changeYorX = Math.floor(Math.random()*2);
        PlusOrMinus = Math.floor(Math.random()*2);

        if(changeYorX == 0){
            if(posX == 0 || posX == 2){
                casesList[posY][posX] = casesList[posY][1];
                casesList[posY][1] = 9;
            }
            else{
                casesList[posY][posX] = casesList[posY][0 + 2 * PlusOrMinus];
                casesList[posY][0 + 2 * PlusOrMinus] = 9;
            }
        }

        else{
            if(posY == 0 || posY == 2){
                casesList[posY][posX] = casesList[1][posX];
                casesList[1][posX] = 9;
            }
            else{
                casesList[posY][posX] = casesList[0 + 2 * PlusOrMinus][posX];
                casesList[0 + 2 * PlusOrMinus][posX] = 9;
            }
        }
    }
}

function display(){
    var iw=canvas.width=img.width;
    var ih=canvas.height=img.height;
    var pieceWidth=iw/cols;
    var pieceHeight=ih/rows;

    for(var y=0;y<rows;y++){
        for(var x=0;x<cols;x++){
            if(casesList[y][x] == 9){
                ctx.fillStyle="rgba(255, 255, 255, 128)";
                ctx.fillRect(x*pieceWidth, y*pieceHeight, pieceWidth, pieceHeight);
                ctx.strokeStyle = "#000";
                ctx.lineWidth = 1;
                ctx.strokeRect(x*pieceWidth, y*pieceHeight, pieceWidth, pieceHeight);
            }else{

                ctx.drawImage(
                img,
                // take the next x,y piece
                displayPos[casesList[y][x] - 1].col*pieceWidth, displayPos[casesList[y][x] - 1].row*pieceHeight, pieceWidth, pieceHeight,
                // draw it on canvas based on the shuffled pieces[] array
                x*pieceWidth, y*pieceHeight, pieceWidth, pieceHeight
              );
            }
        }
    }



}

function clickHandler(event){
    if (event.x != undefined && event.y != undefined){
          x = event.x;
          y = event.y;
    }
    else{
      x = event.clientX + document.body.scrollLeft +
          document.documentElement.scrollLeft;
      y = event.clientY + document.body.scrollTop +
          document.documentElement.scrollTop;
    }

    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;

    indexX = Math.trunc(x/150);
    indexY = Math.trunc(y/150);

    moveCases(indexX,indexY);

    victoryCheck();
}

function moveCases(x, y){
    var posX = -1;
    var posY = -1;
    //permet de trouver la position de la case qui doit se trouver en 9
    for(var i = 0; i < 3; i++){
        for(var j = 0; j < 3; j++){
            if(casesList[i][j] == 9){
                posX = j;
                posY = i;
            }
        }
    }
    if((x - posX == 1) && (x >= 1) && (y == posY)){
        casesList[posY][posX] = casesList[y][x];
        casesList[y][x] = 9;
    }

    if((posX - x == 1) && (x <= 1) && (y == posY)){
        casesList[posY][posX] = casesList[y][x];
        casesList[y][x] = 9;
    }

    if((y - posY == 1) && (y >= 1) && (x == posX)){
        casesList[posY][posX] = casesList[y][x];
        casesList[y][x] = 9;
    }

    if((posY - y == 1) && (y <= 1) && (x == posX)){
        casesList[posY][posX] = casesList[y][x];
        casesList[y][x] = 9;
    }

    display();
}

function victoryCheck(){
    varTest = 1;
    gameIsWon = true;
    for(var i = 0; i < 3; i++){
        for(var j = 0; j < 3; j++){
            if(casesList[i][j] != varTest){
                gameIsWon = false;
            }
            varTest++;
        }
    }
    if(gameIsWon == true){
        alert("BRAVO ! VOUS AVEZ REUSSI !");
        canvas.removeEventListener("mousedown", moveCases);

    }
}

