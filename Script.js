$(document).ready(function(){
	var img = $('#imageContainer');
    img.attr('src', "Images\\image1.jpg");
    resize(img);
});

function resize(img) {
    img.attr("width", 500); // Set new width
    img.attr("height", 500);  // Scale height based on ratio
};
