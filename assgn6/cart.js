// Global variables
var priceOrig = 5 // price per original cinnamon roll
var numRolls = 1 // initial number of rolls set
var numBoxes = 1 // initial number of boxes set

// keeping storage type to store more than strings, sourced from stackoverflow
Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}

// object constructors
function Original(glaze, roll, box, image, price) {
	this.glaze = glaze;
	this.roll = roll;
	this.box = box;
	this.image = image;
	this.price = price;
}

// function is called when user clicks add to cart in product detail page
function getOrder() {
	var originalGlaze = document.getElementById("glaze"); // retrieve the glaze options
	var selectedGlaze = originalGlaze.options[originalGlaze.selectedIndex].text; //retrieve selected glaze
	var glazeImage = "none.png" // set a sample image

  //update the selected image
	if (selectedGlaze=="none")
	{
		glazeImage="none.png";
	}
	else if (selectedGlaze=="vanilla-milk")
	{
		glazeImage="vanilla.png";
	}
	else if (selectedGlaze=="sugar-milk")
	{
		glazeImage="sugar.png";
	}
	else if (selectedGlaze=="double-chocolate")
	{
		glazeImage="choco.png";
	}

	var originalRoll = document.getElementById("roll"); // retrieve the roll options
	var selectedRoll = originalRoll.options[originalRoll.selectedIndex].text; //retrieve selected roll

	var originalBox = document.getElementById("boxOrder"); // retrieve the box options
	var selectedBox = originalBox.value; // retrieve the entered box quantity

	var currentPrice = document.getElementById("priceOriginal").textContent // retrieve the text displayed on page

	var itemsInBag = document.getElementById("itemCount").textContent; //retrieve items in bag count
	itemsInBag = parseInt(itemsInBag)+1; // add by one when add to cart is clicked
	document.getElementById("itemCount").textContent = itemsInBag; // set the displayed item count to new item count
  sessionStorage.setItem("itemsInBag", itemsInBag); //set item count in storage

	var itemAdded = new Original(selectedGlaze, selectedRoll, selectedBox, glazeImage, currentPrice); //create new object

  // adding the newest item to the array of items
	if (itemsInBag == 1)
	{
		//console.log(itemAdded)
		var cartItems = new Array(itemAdded); //create new array if first item
		sessionStorage.setObj("cartItems", cartItems); //save the array
	}
	else if (itemsInBag >= 2)
	{
		var cartItems = sessionStorage.getObj("cartItems") //retrieve array for more than one item in bag
		//console.log(itemAdded);
		cartItems.push(itemAdded); //add newest item to array
		sessionStorage.setObj("cartItems", cartItems); //save the new array
	}
}


// change picture when selecting different glazes
function updateGlaze() {
	var originalGlaze = document.getElementById("glaze"); //retrieve glaze options in product detail page
	var currentGlaze = originalGlaze.options[originalGlaze.selectedIndex].text; //retrieve selected glaze
	var currentPicture = document.getElementById("origImage"); //retrieve current displayed picture

  // change the displayed picture based on selected glaze
	if (currentGlaze=="none")
	{
		currentPicture.src="none.png";
	}
	else if (currentGlaze=="vanilla-milk")
	{
		currentPicture.src="vanilla.png";
	}
	else if (currentGlaze=="sugar-milk")
	{
		currentPicture.src="sugar.png";
	}
	else if (currentGlaze=="double-chocolate")
	{
		currentPicture.src="choco.png";
	}
}

// update price when selecting different quantities
function updateRoll () {
	var originalRoll = document.getElementById("roll"); //retrieve the roll options in product detail page
	var selectedRoll = originalRoll.options[originalRoll.selectedIndex].text; //retrieve the selected roll
	numRolls = parseInt(selectedRoll) //update the global variable to current selection
	document.getElementById("priceOriginal").textContent = "$" + numBoxes*numRolls*priceOrig + ".00" //update displayed price
}

// update price when selecting different quantities
function updateBox () {
	var originalBox = document.getElementById("boxOrder"); //retrieve the box options in product detail page
	var selectedBox = originalBox.value //retrieve the entered box quantity
	numBoxes = parseInt(selectedBox) //update the global variable to current selection
	document.getElementById("priceOriginal").textContent = "$" + numBoxes*numRolls*priceOrig + ".00" //update displayed price
}

//update price and stored value when selecting different quantities on cart page
function updateCartGlaze() {
  var cartItems = sessionStorage.getObj("cartItems"); // retrieve cart items
  for (var i = 0; i < cartItems.length; i++)
  {
  	var originalGlaze = document.getElementsByClassName("glaze2")[i]; //retrieve glaze options in cart page
  	var currentGlaze = originalGlaze.options[originalGlaze.selectedIndex].text; //retrieve selected page
  	var currentPicture = document.getElementsByClassName("itemImage")[i]; //retrieve displayed image

    // update displayed image of glaze
  	if (currentGlaze=="none")
  	{
  		currentPicture.src="smallnone.png";
  	}
  	else if (currentGlaze=="vanilla-milk")
  	{
  		currentPicture.src="smalloriginal.png";
  	}
  	else if (currentGlaze=="sugar-milk")
  	{
  		currentPicture.src="smallsugar.png";
  	}
  	else if (currentGlaze=="double-chocolate")
  	{
  		currentPicture.src="smallchoco.png";
  	}

  	//console.log(cartItems[0]);
  	cartItems[i].glaze = currentGlaze; // update current selected glaze
  	//console.log(cartItems[0].glaze)
  	//console.log(cartItems)
    cartItems[i].image = currentPicture.src // update current picture
  	sessionStorage.setObj("cartItems", cartItems) //save changes to array
  	//console.log(cartItems)
  }
}

function updateCartRoll () {
  var cartItems = sessionStorage.getObj("cartItems"); // retrieve cart items
  var subtotal = 0;
  for (var i = 0; i < cartItems.length; i++)
  {
  	// retrieving the displayed number of rolls on the cart page
  	var originalRoll = document.getElementsByClassName("roll2")[i];
  	var selectedRoll = originalRoll.options[originalRoll.selectedIndex].text;

  	cartItems[i].roll = selectedRoll; //retrieve rolls of first item and set to current selection

  	currentBoxes = cartItems[i].box // retrieve boxes of first item
  	currentPrice = parseInt(selectedRoll)*parseInt(currentBoxes)*priceOrig // compute new price
  	cartItems[i].price = "$" + currentPrice.toString() + ".00" //update saved price

  	document.getElementsByClassName("itemPrice")[i].textContent = cartItems[i].price // update displayed price
  	sessionStorage.setObj("cartItems", cartItems); //set this as new saved data

    subtotal += currentPrice // update price
    document.getElementsByClassName("bag-price")[0].textContent = "$" + subtotal + ".00" //update price display
    document.getElementsByClassName("bag-price")[1].textContent = "$" + subtotal + ".00" // update price display
  }
}

function updateCartBox () {
  var cartItems = sessionStorage.getObj("cartItems"); // retrieve cart items
  var subtotal = 0
  for (var i = 0; i < cartItems.length; i++)
  {
  	// retrieving the displayed number of boxes on the cart page
  	var selectedBox = document.getElementsByClassName("box2")[i].value;

  	cartItems[i].box = selectedBox; //retrieve boxes of first item and set to current selection

  	currentRolls = cartItems[i].roll // retrieve rolls of first item
  	currentPrice = parseInt(selectedBox)*parseInt(currentRolls)*priceOrig // compute new price
  	cartItems[i].price = "$" + currentPrice.toString() + ".00" //update saved price

  	document.getElementsByClassName("itemPrice")[i].textContent = cartItems[i].price //update displayed price
  	sessionStorage.setObj("cartItems", cartItems); //set this as new saved data

    subtotal += currentPrice // update price
    document.getElementsByClassName("bag-price")[0].textContent = "$" + subtotal + ".00" //update price display
    document.getElementsByClassName("bag-price")[1].textContent = "$" + subtotal + ".00" // update price display
  }
}

function removeItem () {
  var cartItems = sessionStorage.getObj("cartItems"); // retrieve cart items

  var removeIndex = document.querySelectorAll('.remove');
  var allItems = document.querySelectorAll('.item-1');

  var itemsInBag = document.getElementById("itemCount").textContent; //retrieve items in bag count
  console.log(removeIndex)

  removeIndex.forEach((item) => {
    {
      console.log(item)
      item.addEventListener('click', ((j) =>
      {
        console.log("clicked");
        console.log(item);
        console.log(cartItems);
        var index = Array.prototype.indexOf.call(removeIndex, item);
        console.log(index);
        cartItems.splice(index, 1);

        if (parseInt(itemsInBag) == 1)
        {
          allItems.item(index).innerHTML = "there are no items in your cart!" + "<br>" + "visit a store or check our menu to start ordering online";
      		allItems.item(index).style.display = "block";
      		allItems.item(index).style.textAlign = "center";
          console.log(cartItems);
        }
        else if (parseInt(itemsInBag) >= 2)
        {
          allItems.item(index).remove();
          console.log(cartItems);
        }

        sessionStorage.setObj("cartItems", cartItems);
        sessionStorage.setObj("allItems", allItems);
      	itemsInBag = parseInt(itemsInBag)-1; // add by one when add to cart is clicked
      	document.getElementById("itemCount").textContent = itemsInBag; // set the displayed item count to new item count
        sessionStorage.setItem("itemsInBag", itemsInBag); //set item count in storage
      }))
    }
  })
}


function onLoad () {
	var checkCount = sessionStorage.getItem("itemsInBag"); //retrieve stored count of items in bag
  var subtotal = 0

	if (checkCount==undefined)
	{
		checkCount = 0;
	}
	document.getElementById("itemCount").textContent = checkCount; //set displayed count to stored count

	var itemOne = document.getElementsByClassName("item-1")[0]; //get all elements within the class item-1
  //change the display of cart items when there are no items in cart
	if (itemOne !== undefined && checkCount<1)
	{
		itemOne.innerHTML = "there are no items in your cart!" + "<br>" + "visit a store or check our menu to start ordering online";
		itemOne.style.display = "block";
		itemOne.style.textAlign = "center";
	}

  var cartItems = sessionStorage.getObj("cartItems")
  //console.log(cartItems.length)
  if (cartItems !== null && cartItems.length > 1)
  {
    var cartItems = sessionStorage.getObj("cartItems", cartItems);
    for (var i = 0; i < (cartItems.length-1); i++)
    {
      //console.log(i)
      //console.log(cartItems[i])
      let boxes = document.getElementsByClassName("all-items")[0];
      //console.log(boxes)
      let clone = document.getElementsByClassName("item-1")[0];
      let newClone = clone.cloneNode([true])
      boxes.appendChild(newClone);
    }
    removeItem()
  }

  if (cartItems !== null && cartItems!== 0)
  {
    for (var i = 0; i < cartItems.length; i++)
    {
      var cartGlaze = document.getElementsByClassName("glaze2")[i]; //get the glaze options in cart page

      	if (cartGlaze !== null && cartGlaze!== undefined)
      	{
      		//console.log(cartGlaze);
      		var glazeCartIndex = cartGlaze.selectedIndex; //retrieve selected index of glaze
      		//console.log(glazeCartIndex)
      		var itemsInCart = sessionStorage.getObj("cartItems"); //retrieve the array of items in cart
      		//console.log(itemsInCart[0]);

      		var displayGlaze = itemsInCart[i].glaze; //retrieve the glaze in first item
      		var glazeDisplayIndex = 0; // set initial index number
      		//console.log(displayGlaze);

      		var currentPicture = document.getElementsByClassName("itemImage")[i]; // retrieve the small image in cart

          // update glaze display index and picture based on cart selection
      		if (displayGlaze == "none")
      		{
      			glazeDisplayIndex = 0;
      			currentPicture.src = "smallnone.png";
      		}
      		else if (displayGlaze == "sugar-milk")
      		{
      				glazeDisplayIndex = 1;
      				currentPicture.src = "smallsugar.png"
      		}
      		else if (displayGlaze == "vanilla-milk")
      		{
      				glazeDisplayIndex = 2;
      				currentPicture.src = "smalloriginal.png";
      		}
      		else if (displayGlaze == "double-chocolate")
      		{
      				glazeDisplayIndex = 3;
      				currentPicture.src = "smallchoco.png";
      		}
      		//console.log(glazeDisplayIndex)
      		cartGlaze.selectedIndex = glazeDisplayIndex
      	}

      	var cartRoll = document.getElementsByClassName("roll2")[i]; //retrieve the roll in first item

      	if (cartRoll !== null && cartRoll !== undefined)
      	{
      		//console.log(cartRoll);
      		var rollCartIndex = cartRoll.selectedIndex;
      		//console.log(rollCartIndex)
      		var itemsInCart = sessionStorage.getObj("cartItems");
      		//console.log(itemsInCart[0]);
      		/// access the actual roll
      		var displayRoll = itemsInCart[i].roll;
      		var rollDisplayIndex = 0;
      		//console.log(displayRoll);

          //update roll display index based on cart selection
      		if (displayRoll == "1")
      		{
      			rollDisplayIndex = 0;
      		}
      		else if (displayRoll == "3")
      		{
      				rollDisplayIndex = 1;
      		}
      		else if (displayRoll == "6")
      		{
      				rollDisplayIndex = 2;
      		}
      		else if (displayRoll == "12")
      		{
      				rollDisplayIndex = 3;
      		}
      		//console.log(rollDisplayIndex)
      		cartRoll.selectedIndex = rollDisplayIndex
      	}

      	var cartBox = document.getElementsByClassName("box2")[i]; // retrieve the box in first item

        // update box display number based on cart selection
      	if (cartBox !== null && cartBox !== undefined)
      	{
      		var boxCartValue = cartBox.value;
      		//console.log(boxCartValue)
      		var itemsInCart = sessionStorage.getObj("cartItems");
      		//console.log(itemsInCart[0]);
      		/// access the actual glaze
      		var displayRoll = itemsInCart[i].box;
      		//console.log(displayRoll);
      		cartBox.value = displayRoll

          var singlePrice = priceOrig*parseInt(itemsInCart[i].box)*parseInt(itemsInCart[i].roll)
          // update the price displayed on item one
      		document.getElementsByClassName("itemPrice")[i].textContent = "$" + singlePrice + ".00"

            //console.log(boxes)
          }

        subtotal += singlePrice //add price
      	}

        var priceDisplay = document.getElementsByClassName("bag-price")[0];
        if (priceDisplay !== undefined)
        {
          document.getElementsByClassName("bag-price")[0].textContent = "$" + subtotal + ".00" //update price display
          document.getElementsByClassName("bag-price")[1].textContent = "$" + subtotal + ".00" //update price display
        }
      }
}
