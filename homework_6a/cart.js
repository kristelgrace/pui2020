// Global variables

var priceOrig = 5 // price per original cinnamon roll
var numRolls = 1 // initial number of rolls set
var numBoxes = 1 // initial number of boxes set
var itemCount = 0 // initial number of items in cart


// retrieve data on glaze, roll, and boxes when submitting form + update bag item count
function getOrder() {
	var originalGlaze = document.getElementById("glaze");
	var selectedGlaze = originalGlaze.options[originalGlaze.selectedIndex].text;

	var originalRoll = document.getElementById("roll");
	var selectedRoll = originalRoll.options[originalRoll.selectedIndex].text;

	var originalBox = document.getElementById("boxOrder");
	var selectedBox = originalBox.value

	itemCount = itemCount+1
	document.getElementById("shoppingCart").textContent = "shopping cart (" + itemCount +")"
};


// change picture when selecting different glazes
function updateGlaze() {
	var originalGlaze = document.getElementById("glaze");
	var selectedGlaze = originalGlaze.options[originalGlaze.selectedIndex].text;
	var currentPicture = document.getElementById("origImage");

	if (selectedGlaze=="none") 
	{
		currentPicture.src="none.png";
	}
	else if (selectedGlaze=="vanilla-milk")
	{
		currentPicture.src="vanilla.png";
	}
	else if (selectedGlaze=="sugar-milk")
	{
		currentPicture.src="sugar.png";
	}
	else if (selectedGlaze=="double-chocolate")
	{
		currentPicture.src="choco.png";
	}
}

// change price when selecting different quantities
function updateRoll () {
	var originalRoll = document.getElementById("roll");
	var selectedRoll = originalRoll.options[originalRoll.selectedIndex].text;
	numRolls = parseInt(selectedRoll)
	document.getElementById("priceOriginal").textContent = "$" + numBoxes*numRolls*priceOrig + ".00"
}

// change price when selecting different quantities
function updateBox () {
	var originalBox = document.getElementById("boxOrder");
	var selectedBox = originalBox.value
	numBoxes = parseInt(selectedBox)
	document.getElementById("priceOriginal").textContent = "$" + numBoxes*numRolls*priceOrig + ".00"
}