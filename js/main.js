// On "ToRGB" click, get the value of the Hex Color and transform it to RGB
$("#torgb").click(function () {
  if (document.getElementById("hexcolor").validity.valid) {
    var newcolor = hextorgb($("#hexcolor").val());
    $("#rgbcolor").val(newcolor);
    changeshowncolor(newcolor);
  }
});

// Function to trigger the event when you press enter in the input box
$("#hexcolor").keydown(function(e){
    if(e.keyCode == 13) { //Enter
        $("#torgb").trigger("click");
    }
})

// Function to trigger the event when you press enter in the input box
$("#rgbcolor").keydown(function(e){
    if(e.keyCode == 13) { //Enter
        $("#tohex").trigger("click");
    }
})

// On "ToHex" click, get the value of the RGB Color and transform it to Hexadecimal
$("#tohex").click(function () {
  if (document.getElementById("rgbcolor").validity.valid) {
    var newcolor = rgbtohex($("#rgbcolor").val());
    $("#hexcolor").val(newcolor);
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
  }

  return [r, g, b].join();
}

// It gets a RGB number as parameter and returns an hexadecimal number
function rgbtohex(rgb) {
  var array = rgb.split(",");
  var output = "";
  var aux = "";
  for (i = 0; i < array.length; i++) {
    aux = parseInt(array[i], 10).toString(16); // Important to parse the int first; toString(16) --> Base 16
    if (aux.length < 2) { // to output 3 complete bytes
      aux = 0 + aux;
    }
    output += aux;
  }

  return output;
}

// It changes the showed color
function changeshowncolor(color) {
  if (color.indexOf(",") == "-1") { //Hexadecimal value
    $("#convcolor").css("background-color", "#" + color);
  } else { //RGB value
    $("#convcolor").css("background-color", "rgb(" + color + ")");
  }
}
