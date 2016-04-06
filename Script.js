var canvas = document.getElementById("canvasContainer");
//Le canvas permet de gérer les dessins d'image
var ctx = canvas.getContext('2d');
//La console affiche une erreur à ce moment-là, mais on est obligé de mettre cette ligne ici.
var cw = canvas.width;
var ch = canvas.height;
canvas.addEventListener("mousedown", clickHandler);
//On ajoute un Listener sur le canvas pour gérer les clicks

//casesList est une Array de Case
var casesList = new Array([1,2,3],[4,5,6],[7,8,9]);
//Tableau 2D format 3x3 : les valeurs sont les positions hypothétiques des cases.

var compteurTours = 0;

var rows = 3;
var cols = 3;

var displayPos = [
    {col:0,row:0},
    {col:1,row:0},
    {col:2,row:0},
    {col:0,row:1},
    {col:1,row:1},
    {col:2,row:1},
    {col:0,row:2},
    {col:1,row:2},
    {col:2,row:2},
]
//displayPos contient des valeurs qui permettent de calculer les parties à découper de l'image.

var img=new Image();
resize(img);
//Appelle de la fonction start(); qui appelle d'autres fonctions.
img.onload=start;
img.src="Images\\android.jpg";
//On crée l'image

var iw=canvas.width=img.width;
var ih=canvas.height=img.height;
var pieceWidth=iw/cols;
var pieceHeight=ih/rows;



function resize(img){
    //On change les dimensions de l'image
    img.width = 450; // Set new width
    img.height = 450;  // Set new height
};


function start(){
    shuffleList(casesList);
    //On mélange les positions des cases.
    display();
    //On affiche les cases.
    victoryCheck();
    //On vérifie si les cases sont toutes à la bonne place (cas rare, mais ça peut arriver)
}

//La fonction de mélange
function shuffleList(casesList){
    for(var compteur = 0; compteur < (5 + Math.floor(Math.random() * 20)); compteur++){
        //On effectue au moins 5 changements.
        var posX = -1;
        var posY = -1;
        //permet de trouver la position de la case qui doit se trouver en 9
        for(var i = 0; i < 3; i++){
            for(var j = 0; j < 3; j++){
                if(casesList[i][j] == 9){
                    posX = j;
                    posY = i;
                    //On sauvegarde les indices de la case qui devrait se trouver en 9
                }
            }
        }
        changeYorX = Math.floor(Math.random()*2);
        //Un random pour savoir si on déplace la case horizontalement ou verticalement.
        PlusOrMinus = Math.floor(Math.random()*2);
        //Un random pour savoir (dans le cas où la case à déplace a l'indice qui va changer en position 1) si on augmente ou diminue l'indice.

        if(changeYorX == 0){
            //Les cas où on change le X (colonne)
            if(posX == 0 || posX == 2){
                //Le cas où la case est sur un des côtés
                casesList[posY][posX] = casesList[posY][1];
                casesList[posY][1] = 9;
            }
            else{
                //Le cas où la case 9 était sur la colonne du milieu
                casesList[posY][posX] = casesList[posY][0 + 2 * PlusOrMinus];
                casesList[posY][0 + 2 * PlusOrMinus] = 9;
            }
        }

        else{
            //Les cas où on change le Y (ligne)
            if(posY == 0 || posY == 2){
                //Le cas où la case est sur la ligne du haut ou du bas
                casesList[posY][posX] = casesList[1][posX];
                casesList[1][posX] = 9;
            }
            else{
                //Le cas où la case est sur la ligne du milieu
                casesList[posY][posX] = casesList[0 + 2 * PlusOrMinus][posX];
                casesList[0 + 2 * PlusOrMinus][posX] = 9;
            }
        }
    }
}

//La fonction d'affichage
function display(){

    //On parcourt le tableau 2D
    for(var y=0;y<rows;y++){
        for(var x=0;x<cols;x++){
            if(casesList[y][x] == 9){
                //Si la position hypothétique de la case est 9, on remplace le morceau de l'image par un carré blanc
                ctx.fillStyle="rgba(255, 255, 255, 128)";
                ctx.fillRect(x*pieceWidth, y*pieceHeight, pieceWidth, pieceHeight);
                ctx.strokeStyle = "#000";
                ctx.lineWidth = 1;
                ctx.strokeRect(x*pieceWidth, y*pieceHeight, pieceWidth, pieceHeight);
            }else{
                ctx.drawImage(
                img,
                // On "clip" la bonne partie de l'image
                displayPos[casesList[y][x] - 1].col*pieceWidth, displayPos[casesList[y][x] - 1].row*pieceHeight, pieceWidth, pieceHeight,
                // Coordonnées de l'endroit où le morceau clippé sera
                x*pieceWidth, y*pieceHeight, pieceWidth, pieceHeight
              );
            }
        }
    }



}

//La fonction qui récupère la position des clics de souris
function clickHandler(event){
    if (event.x != undefined && event.y != undefined){
          x = event.x;
          y = event.y;
    }
    else{
        //Il existe une méthode plus simple, mais cette dernière ne fonctionne pas sous Firefox
        //Donc, on utilise la méthode suivante.
      x = event.clientX + document.body.scrollLeft +
          document.documentElement.scrollLeft;
      y = event.clientY + document.body.scrollTop +
          document.documentElement.scrollTop;
    }

    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;

    indexX = Math.trunc(x/150);
    indexY = Math.trunc(y/150);

    //On appelle la fonction qui gère les déplacements en lui envoyant les indices de la case sur laquelle on a cliqué
    moveCases(indexX,indexY);

    //On vérifie si l'utilisateur a gagné
    victoryCheck();
}

//Fonction de gestion des déplacements
function moveCases(x, y){
    var posX = -1;
    var posY = -1;
    //permet de trouver la position de la case qui doit se trouver en 9
    for(var i = 0; i < 3; i++){
        for(var j = 0; j < 3; j++){
            if(casesList[i][j] == 9){
                posX = j;
                posY = i;
                //On sauvegarde les indices de la case 9 pour les comparer à ceux de la case cliquée.
            }
        }
    }
    if((x - posX == 1) && (x >= 1) && (y == posY)){
        //Clic à droite de la case 9/blanche
        casesList[posY][posX] = casesList[y][x];
        casesList[y][x] = 9;
        compteurTours++;
    }

    if((posX - x == 1) && (x <= 1) && (y == posY)){
        //Clic à gauche de la case 9/blanche
        casesList[posY][posX] = casesList[y][x];
        casesList[y][x] = 9;
        compteurTours++;
    }

    if((y - posY == 1) && (y >= 1) && (x == posX)){
        //Clic en-dessous de la case 9/blanche
        casesList[posY][posX] = casesList[y][x];
        casesList[y][x] = 9;
        compteurTours++;
    }

    if((posY - y == 1) && (y <= 1) && (x == posX)){
        //Clic au-dessus de la case 9/blanche
        casesList[posY][posX] = casesList[y][x];
        casesList[y][x] = 9;
        compteurTours++;
    }

    display();
    //Mise à jour de l'affichage
}

function victoryCheck(){
    varTest = 1;
    //varTest correspond à la position hypothétique de chaque case (on l'incrémente), si les valeurs sont différentes, gameIsWon passe à false
    gameIsWon = true;
    for(var i = 0; i < 3; i++){
        for(var j = 0; j < 3; j++){
            //On parcourt le tableau
            if(casesList[i][j] != varTest){
                gameIsWon = false;
            }
            varTest++;
        }
    }
    if(gameIsWon == true){
        ctx.drawImage(img, 2*pieceWidth, 2*pieceHeight, pieceWidth, pieceHeight, 2*pieceWidth, 2*pieceHeight, pieceWidth, pieceHeight);
        alert("BRAVO ! Vous avez réussi ! Nombre de coups : " + compteurTours);
        //On affiche un message de victoire
        compteurTours = 0;

    }
}

function restart(){
    shuffleList(casesList);
    //On mélange les positions des cases.
    display();
    //On affiche les cases.
    victoryCheck();
    //On vérifie si les cases sont toutes à la bonne place (cas rare, mais ça peut arriver)
}

