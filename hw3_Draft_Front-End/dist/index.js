window.onload = function() {
	var register = document.getElementById("register")
	var login = document.getElementById("login")

	register.onclick = function validatePassword() {
	    //var pw = document.forms["myForm"]["password"].value
	    //var pwc = document.forms["myForm"]["confpassword"].value
	    var pw = document.getElementById("password").value
	    var cpw = document.getElementById("confPassword").value

	    if(pw == ""){
			alert("Please enter password")
			return false
		}
		if(cpw == ""){
			alert("Please enter confirm password")
			return false
		}
	    if(pw != cpw){
	    	alert("Passwords should be equal")
	    	return false
	    }
	    return true
	}

	login.onclick = function validateLogin(){
		var logName = document.getElementById("loginUsername").value
		var logPass = document.getElementById("loginPassword").value

		if(logName == ""){
			alert("Please enter login username")
		}
		else if(logPass == ""){
			alert("Please enter login password")
		}
		if(logName != "" && logPass != ""){
			window.location.href = 'main.html'
		}
	}
}