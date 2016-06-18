var express = require('express');
var app = express();
var path = require('path');

var UTRResult =  function( UTR )
{
var refno = UTR + "K"
var mod11 = 11 
weighting  = new Array(11)  // ignore char pos 0 and 10  
weighting[0] = 0;	weighting[1] = 6;	weighting[2] = 7;	weighting[3] = 8;	weighting[4] = 9
weighting[5] = 10;	weighting[6] = 5;	weighting[7] = 4;	weighting[8] = 3;	weighting[9] = 2;	weighting[10] = 0		
checkDigits = new Array(11)
checkDigits[0] = 2;	checkDigits[1] = 1;	checkDigits[2] = 9;	checkDigits[3] = 8
checkDigits[4] = 7;	checkDigits[5] = 6;	checkDigits[6] = 5;	checkDigits[7] = 4
checkDigits[8] = 3;	checkDigits[9] = 2;	checkDigits[10] = 1
var msgTxt = ""
reg = /\d{10}K/
var refno = refno.toUpperCase()
error_count = 0
if (reg.test(refno) == false) {
	//alert("SA Reference format invalid. The eleventh character is always 'K' and characters 1-10 are always numeric")
	error_count = error_count + 1
}
else {
	var total = 0
	for (var i = 0; i < 10; i++) {  // chars 1 and 10 ignored as per rules - zero  values should account
		hold = "" + refno.substring(i, i + 1);	total = total + hold * weighting[i]
	}
	var remainder = total%mod11
	if(checkDigits[remainder] == refno.substring(0,1)) {
		 //alert("SA Reference is correct")
		error_count = 0
	}
	else {
		//alert("SA Reference format invalid. Calculated check digit does not match actual check digit " + refno.substring(0,1))
		error_count = error_count + 1
	}
}
  if (error_count == 0) { var response = "Your Reference number is correct."} 
  else {
	var response = "The reference number is incorrect."
}
return response;
}


app.use(express.static(path.join(__dirname, 'public')));

app.get("/:utr", function(req, res){
	
	var UTR = req.params.utr;
	
	res.json({result : UTRResult(UTR)});
	
});

module.exports = app;


