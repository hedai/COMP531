//profile.js
//Author: He Dai

//Function: validate
//To validate all the inputs when the submit button is clicked.
function validate() {
	checkName()
	checkEmail()
	checkPhone()
	checkZip()
	validatePassword()
	clearInputs()
}

//Check if we have name input
//Alert if updated
function checkName() {
	var nm = document.getElementById("inputName").value
	var dispNm = document.getElementById("displayName").innerHTML
	if(nm != dispNm && nm != 0){
		alert("Name updated, changing from "+ dispNm +" to "+nm)
		document.getElementById("displayName").innerHTML = nm
	}
}

//Check if we have email input
//Alert if updated
function checkEmail() {
	var em = document.getElementById("inputEmail").value
	var dispEm = document.getElementById("emailAddress").innerHTML
	if(em != dispEm && em != 0){
		alert("Email updated, changing from "+ dispEm +" to "+em)
		document.getElementById("emailAddress").innerHTML = em
	}
}

//Check if we have phone number input
//Validate to 10 digits phone number with possible dashes or brackets
//Alert if unpdated or wrong input
function checkPhone() {
	var ph = document.getElementById("inputPhone").value
	var dispPh = document.getElementById("phoneNumber").innerHTML

	if(ph != dispPh && ph != 0){
		if(!ph.match(/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)?\d{4}$/)){
			alert("Phone number must be 10 digits")
		}
		else{
			alert("Phone Number updated, changing from "+ dispPh +" to "+ph)
			document.getElementById("phoneNumber").innerHTML = ph
		}
	}
}

//Check if we have zip code input
//Validate to 5 digits
//Alert if unpdated or wrong input
function checkZip() {
	var zp = document.getElementById("inputZipcode").value
	var dispZp = document.getElementById("zipCode").innerHTML

	if(zp != dispZp && zp != 0){
		if(!zp.match(/^\d{5}$/)){
			alert("Zip code must be 5 digits")
		}
		else{
			alert("Zip code updated, changing from "+ dispZp +" to "+zp)
			document.getElementById("zipCode").innerHTML = zp
		}
	}
}

//Check if we have password
//Validate same password
//Alerts if wrong or updated
function validatePassword() {
    var pw = document.getElementById("password").value
    var pwc = document.getElementById("confPassword").value
    if(pw || pwc){
	    if(pw != pwc){
	    	alert("Passwords should be equal")
	    }
	    else{
	    	alert("Passwords updated")
	    }
	}
}

//Clear all inputs, set values to ""
function clearInputs(){
	document.getElementById("inputName").value = ""
	document.getElementById("inputEmail").value = ""
	document.getElementById("inputPhone").value = ""
	document.getElementById("inputZipcode").value = ""
	document.getElementById("password").value = ""
	document.getElementById("confPassword").value = ""
}

