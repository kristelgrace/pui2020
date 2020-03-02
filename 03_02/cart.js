function Original(glaze, rolls, boxes) {
	this.glaze = glaze;
	this.rolls = rolls;
	this.boxes = boxes;
	this.type = "Original";
}

function getOrder() {
	document.getElementById("originalForm").submit()
}