var imageWidth = 0;
var imageHeight = 0;

$(document).ready(function(){
	var img = $('#imageContainer');
    img.attr('src', "Images\\image1.jpg").load(function(){
        imageWidth = this.width;
        console.log("Largeur de l'image : " + imageWidth);
        imageHeight = this.height;
        console.log("Hauteur de l'image : " + imageHeight);
    });
    resize(img);
});

function resize(img) {
    console.log(imageWidth);
    var maxWidth = 100; // Max width for the image
    var maxHeight = 100;    // Max height for the image
    var ratio = 0;  // Used for aspect ratio

    // Check if the current width is larger than the max
    if(imageWidth > maxWidth){
        ratio = maxWidth / imageWidth;   // get ratio for scaling image
        console.log(ratio);
        img.attr("width", maxWidth); // Set new width
        img.attr("height", imageHeight * ratio);  // Scale height based on ratio
        imageHeight = imageHeight * ratio;    // Reset height to match scaled image
    }

    // Check if current height is larger than max
    if(imageHeight > maxHeight){
        ratio = maxHeight / imageHeight; // get ratio for scaling image
        console.log(ratio);
        img.attr("height", maxHeight);   // Set new height
        img.attr("width", imageWidth * ratio);    // Scale width based on ratio
        imageWidth = imageWidth * ratio;    // Reset width to match scaled image
    }
};
