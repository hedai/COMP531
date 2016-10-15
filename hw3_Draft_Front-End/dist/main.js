window.onload = function() {
	var post = document.getElementById("post")
	var cancel = document.getElementById("cancel")

	//Update status
	post.onclick = function postStatus(){
		document.getElementById("status").innerHTML = document.getElementById("post_status").value
		document.getElementById("post_status").value = ''
	}

	//Clear the post text
	cancel.onclick = function cancelPost(){
		document.getElementById("post_comments").value = ''
	}
}
