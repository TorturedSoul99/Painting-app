const canvas = document.getElementById("canvas");
canvas.width = 400;
canvas.height = 400;

let context = canvas.getContext("2d");
let start_background_color = "rgba(0,0,0,0)"
context.fillStyle = start_background_color;
context.fillRect(0, 0, canvas.width, canvas.height);

let image = new Image();
image.onload = function() {
	context.drawImage(image, 0, 0);
};

let brush = document.getElementById("brush-icon");
let draw_color = "#000000";
let draw_width = "2";
let is_drawing = false;

function change_color(element) {
	draw_color = element.style.background;
	brush.style.color = draw_color;
}


canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);

canvas.addEventListener("touchend", stop, false);
canvas.addEventListener("mouseup", stop, false);
canvas.addEventListener("mouseout", stop, false);


function start(event) {
	is_drawing = true;
	context.beginPath();
	context.moveTo(event.clientX - canvas.offsetLeft, 
				   event.clientY - canvas.offsetTop);
	event.preventDefault();
}

function draw(event) {
	if ( is_drawing) {
		context.lineTo(event.clientX - canvas.offsetLeft, 
				       event.clientY - canvas.offsetTop);
		context.strokeStyle = draw_color;
		context.lineWidth = draw_width;
		context.lineCap = "round";
		context.lineJoin = "round";
		context.stroke();
	}
	event.preventDefault();
}

function stop(event) {
	if ( is_drawing ) {
		context.stroke();
		context.closePath();
		is_drawing = false;
		context.drawImage(image, 0, 0);
	}
	event.preventDefault();
}

function clear_canvas() {
	context.fillStyle = start_background_color;
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.drawImage(image, 0, 0);
}

function Save() {
	let img = canvas.toDataURL('image/png').replace("image/png", "image/octet-stream");
	let newImg = document.createElement("img");
	newImg.src = img;
	newImg.alt = "sticker";
	newImg.style.position = "absolute";
	document.body.appendChild(newImg);
}

function change_image(element) {
	image.crossOrigin = "Anonymous";
	image.src = element.src;
	clear_canvas();
}















