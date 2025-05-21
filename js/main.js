// On "ToRGB" click, get the value of the Hex Color and transform it to RGB
document.getElementById("torgb").addEventListener("click", function () {
  if (document.getElementById("hexcolor").validity.valid) {
    var newcolor = hextorgb(document.getElementById("hexcolor").value);
    document.getElementById("rgbcolor").value = newcolor;
    changeshowncolor(newcolor);
  }
});

// Function to trigger the event when you press enter in the input box
document.getElementById("hexcolor").addEventListener("keydown", function(e){
    if(e.key === "Enter") { //Enter
        document.getElementById("torgb").click();
    }
})

// Function to trigger the event when you press enter in the input box
document.getElementById("rgbcolor").addEventListener("keydown", function(e){
    if(e.key === "Enter") { //Enter
        document.getElementById("tohex").click();
    }
})

// On "ToHex" click, get the value of the RGB Color and transform it to Hexadecimal
document.getElementById("tohex").addEventListener("click", function () {
  if (document.getElementById("rgbcolor").validity.valid) {
    var newcolor = rgbtohex(document.getElementById("rgbcolor").value);
    document.getElementById("hexcolor").value = newcolor;
    changeshowncolor(newcolor);
  }
});

// It gets an hexadecimal number as parameter and returns a RGB number
function hextorgb(hex) {
  var integer = parseInt(hex, 16); //Total: 24 bits (3 bytes) or 12 bits if only half of the hex is written
  if (hex.length > 3) {
    var r = (integer >> 16) & 255; //16 bits out
    var g = (integer >> 8) & 255; //8 bits out
    var b = integer & 255; //last 8 bits
  } else {
    var r = (integer >> 8) & 15; //16 bits out
    var g = (integer >> 4) & 15; //8 bits out
    var b = integer & 15; //last 8 bits
    // For shorthand hex, we need to duplicate the nibbles
    r = r | (r << 4);
    g = g | (g << 4);
    b = b | (b << 4);
  }

  return [r, g, b].join();
}

// It gets a RGB number as parameter and returns an hexadecimal number
function rgbtohex(rgb) {
  var array = rgb.split(",");
  var output = "";
  var aux = "";
  for (let i = 0; i < array.length; i++) {
    aux = parseInt(array[i], 10).toString(16); // Important to parse the int first; toString(16) --> Base 16
    if (aux.length < 2) { // to output 3 complete bytes
      aux = "0" + aux;
    }
    output += aux;
  }

  return output.toUpperCase();
}

// It changes the showed color
function changeshowncolor(color) {
  var convcolorElement = document.getElementById("convcolor");
  if (color.indexOf(",") == "-1") { //Hexadecimal value
    convcolorElement.style.backgroundColor = "#" + color;
  } else { //RGB value
    convcolorElement.style.backgroundColor = "rgb(" + color + ")";
  }
}
