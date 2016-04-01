var canvas = document.getElementById("canvasContainer");
var ctx = canvas.getContext('2d');
var cw = canvas.width;
var ch = canvas.height;

var rows = 3;
var cols = 3;

var img=new Image();
resize(img);
img.onload=start;
img.src="Images\\turtle.jpg";

var blank = new Image();
blank.onload=start;
blank.src="Image\\blank.jpg"


function resize(img){
    //On change les dimensions de l'image
    img.width = 450; // Set new width
    img.height = 450;  // Set new height
};

function start(){

  var iw=canvas.width=img.width;
  var ih=canvas.height=img.height;
  var pieceWidth=iw/cols;
  var pieceHeight=ih/rows;

  var pieces = [
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
    shuffle(pieces);

    var i=0;
    for(var y=0;y<rows;y++){
        for(var x=0;x<cols;x++){
            var p=pieces[i++];
            if(i == 9){
                ctx.drawImage(blank,x*pieceWidth, y*pieceHeight, pieceWidth, pieceHeight,
                p.col*pieceWidth, p.row*pieceHeight, pieceWidth, pieceHeight);

            }else{
                ctx.drawImage(
                img,
                // take the next x,y piece
                x*pieceWidth, y*pieceHeight, pieceWidth, pieceHeight,
                // draw it on canvas based on the shuffled pieces[] array
                p.col*pieceWidth, p.row*pieceHeight, pieceWidth, pieceHeight
              );
            }
        }
    }


}

function shuffle(a){
  for(var j, x, i = a.length; i; j = Math.floor(Math.random() * i), x = a[--i], a[i] = a[j], a[j] = x);
  return a;
};
