function change_button() {
	$('#lock-btn').remove();
	$(".btn-link").html('<input type="button" id="tutorial-btn" class="btn btn-success btn-lg" onclick="open_tuto()" value="チュートリアルをはじめから" ></input>\n<input type="button" class="btn btn-primary btn-lg" value="確認テスト" onClick="click_Test()" ></input>')
}



function file_delete() {
	$(".file").empty();
	$(".filename").empty();
	$(".preview").empty();
}

function add_filelist() {
	$(".folder").html('<p><img src="./image/computer_folder.png" width="20" height="20" th:src="@{/image/computer_folder.png}"></img>.git</p>')
}


function open_work(){
	if (document.getElementById("work_tree").checked) {
		$(".header").show();
		$(".directory").show();
		$(".progress-bar").show();
		$(".progress").show();
	  } else {
		$(".header").hide();
		$(".directory").hide();
		$(".progress-bar").hide();
		$(".progress").hide();
	  }
}
