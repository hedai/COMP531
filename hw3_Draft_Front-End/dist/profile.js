function validate() {
	checkName()
	checkEmail()
	checkPhone()
	checkZip()
	validatePassword()
	clearInputs()
}

function checkName() {
	var nm = document.getElementById("inputName").value
	var dispNm = document.getElementById("displayName").innerHTML
	var nameFormat = /^[A-Za-z0-9_]{1,15}$/
	if(nm != dispNm){
		if(nm.match(nameFormat)){
			document.getElementById("displayName").innerHTML = nm
		}
	}
}

function checkEmail() {
	var em = document.getElementById("inputEmail").value
	var dispEm = document.getElementById("emailAddress").innerHTML
	var emailFormat = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/
	if(em != dispEm){
		if(em.match(emailFormat)){
			document.getElementById("emailAddress").innerHTML = em
		}
	}
}

function checkPhone() {
	var ph = document.getElementById("inputPhone").value
	var dispPh = document.getElementById("phoneNumber").innerHTML
	var phoneFormat = /^\d{3}[-]?\d{3}[-]?\d{4}$/
	if(ph != dispPh){
		if(ph.match(phoneFormat)){
			document.getElementById("phoneNumber").innerHTML = ph
		}
	}
}

function checkZip() {
	var zp = document.getElementById("inputZipcode").value
	var dispZp = document.getElementById("zipCode").innerHTML
	var zipFormat = /^\d{5}$/
	if(zp != dispZp){
		if(zp.match(zipFormat)){
			document.getElementById("zipCode").innerHTML = zp
		}
	}
}

function validatePassword() {
    var pw = document.getElementById("password").value
    var pwc = document.getElementById("confPassword").value
    if(pw || pwc){
	    if(pw != pwc){
	    	alert("Passwords should be equal")
	    }
	}
}

function clearInputs(){
	document.getElementById("inputName").value = ""
	document.getElementById("inputEmail").value = ""
	document.getElementById("inputPhone").value = ""
	document.getElementById("inputZipcode").value = ""
	document.getElementById("password").value = ""
	document.getElementById("confPassword").value = ""
}

