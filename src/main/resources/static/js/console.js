var PageNumber = 0;
var testNumber = 0;
var TestStatus = 0;
var TestMessage = '"test"';
var ip;
var Dirname = $.now();
var diffMessage;
var statusMessage;
var lsMessage;
var catMessage;
var fileName;
var gitstatus = [];
var test = [];

$.getJSON("http://ip-api.com/json/?callback=?", function (data) {
	ip = data.query;
});

$.getJSON("js/story2.json", function (json) {
	for (var i in json.story) {
		if (json.story[i].status === "") {
			gitstatus.push("\n")
		} else {
			gitstatus.push(json.story[i].status + "[" + json.file + "]" + "\n")
		}
		fileName = json.file
	}
	console.log(gitstatus)
})

function doSomething() {
	PageNumber++;
	$.getJSON("js/story2.json", function (json) {

		var message = document.getElementById("message");

		message.textContent = json.story[PageNumber].comment
		console.log('gitstatus:' + gitstatus)
		var $pb1 = $('.progress-bar');
		bargage1 = PageNumber / json.story.length
		$pb1.attr({ 'style': 'width:' + Math.round(PageNumber / json.story.length * 100) + '%;', 'class': 'progress-bar' }).html(" " + Math.round(PageNumber / json.story.length * 100) + "% ");
	});
}

function story_get() {
	$.getJSON("js/test.json", function (json) {
		for (var i in json.story) {
			if (json.test[i].status === "") {
				test.push("\n")
			}
		}
	});
}

//ログを保存する
function data_input(line, report) {
	var hostUrl = 'store';
	var article = new Object();
	article.number = $('#number').val();
	article.command = $.trim(line);
	article.address = ip

	$.ajax({
		type: "POST",
		url: hostUrl,
		data: JSON.stringify(article),
		contentType: 'application/json',
		dataType: 'json',
		success: function (data) {
			console.log(data);
		},
		error: function (xhr, text, err) {
			console.log('text: ', text);
			console.log('xhr: ', xhr);
		}
	})
}


//ipアドレスを取得する
function getIp() {
	$.ajaxSetup({ async: false });
	$.getJSON("http://ip-api.com/json/?callback=?", function (data) {
		console.log(ip);
		init_repo();
	});
}

function add_filelist() {
	$(".folder").append('<p><img src="./image/computer_folder.png" width="20" height="20" th:src="@{/image/computer_folder.png}"></img>.git</p>')
}

function add_file() {
	$(".file").append('<p><img src="./image/computer_document.png" width="20" height="20" th:src="@{/image/computer_document.png}"></img>'+fileName+'</p>')
}

function edit_file() {
	$(".preview").text(catMessage)
}

function addLink() {
	$(".file").append('<a href="javascript:void(0);" onclick="OnLinkClick();">Exec2</a><br />')
}

function file_delete() {
	$(".file").empty();
	$(".filename").remove();
	$(".preview").remove();
}

function delete_folder() {
	$(".header").remove();
	$(".directory").remove();
	$(".progress-bar").remove();
	$(".progress").remove();
}

function file_add() {
	$(".file_preview").append('<p class="filename">'+fileName+'</p><div class="preview"><p></p></div>')
}

function init_repo() {
	var hostUrl = 'init';
	var article1 = new Object();
	article1.repositoryId = ip;
	article1.repositoryDir = Dirname;
	var loc = window.location.pathname;
	var dirname = loc.substring(0, loc.lastIndexOf("\\") + 1);
	console.log(dirname);

	$.ajax({
		type: "POST",
		url: hostUrl,
		contentType: 'application/json',
		dataType: 'json',
		data: JSON.stringify(article1),
		success: function (data) {
			console.log(data);
			statusMessage = data.statusMessage;
			console.log('statusMessage:' + statusMessage)

		},
		error: function (xhr, text, err) {
			console.log('text: ', text);
			console.log('xhr: ', xhr);
		}
	})
}



function add_repo() {
	var hostUrl = Dirname + '/add'
	var article2 = new Object();
	article2.repositoryDir = Dirname;
	article2.fileName = fileName;

	$.ajax({
		type: "PUT",
		url: hostUrl,
		contentType: 'application/json',
		dataType: 'json',
		data: JSON.stringify(article2),
		success: function (data) {
			console.log(data);
			statusMessage = data.statusMessage;
			console.log('statusMessage:' + statusMessage)
		},
		error: function (xhr, text, err) {
			console.log('text: ', text);
			console.log('xhr: ', xhr);
		}
	})
}

function diff_repo() {
	var hostUrl = Dirname + '/diff'
	var article3 = new Object();
	article3.repositoryDir = Dirname;

	$.ajax({
		type: "POST",
		url: hostUrl,
		contentType: 'application/json',
		dataType: 'json',
		data: JSON.stringify(article3),
		success: function (data) {
			console.log(data.diffMessage);
			diffMessage = data.diffMessage;
			console.log(diffMessage);

		},
		error: function (xhr, text, err) {
			console.log('text: ', text);
			console.log('xhr: ', xhr);
		}
	})
}

function status_repo() {
	var hostUrl = Dirname + '/status'
	var article4 = new Object();
	article4.repositoryDir = Dirname;

	$.ajax({
		type: "POST",
		url: hostUrl,
		contentType: 'application/json',
		dataType: 'json',
		data: JSON.stringify(article4),
		success: function (data) {
			console.log(data)
			console.log(data.statusMessage);
			statusMessage = data.statusMessage + "\n";
		},
		error: function (xhr, text, err) {
			console.log('text: ', text);
			console.log('xhr: ', xhr);
		}
	})
}


function commit_repo(line) {
	var hostUrl = 'commit'
	var article5 = new Object();
	var come = line.match(/".*"$/);
	console.log(come);
	article5.repositoryDir = Dirname;
	article5.number = PageNumber;
	article5.commitMessage = come[0];

	$.ajax({
		type: "POST",
		url: hostUrl,
		contentType: 'application/json',
		dataType: 'json',
		data: JSON.stringify(article5),
		success: function (data) {
			console.log(data);
			statusMessage = data.statusMessage;
			console.log('statusMessage:' + statusMessage)
		},
		error: function (xhr, text, err) {
			console.log('text: ', text);
			console.log('xhr: ', xhr);
		}
	})
}

function edit() {
	var hostUrl = Dirname + '/edit'
	var article6 = new Object();
	article6.repositoryDir = Dirname;
	article6.fileName = fileName;

	$.ajax({
		type: "POST",
		url: hostUrl,
		contentType: 'application/json',
		dataType: 'json',
		data: JSON.stringify(article6),
		success: function (data) {
			console.log(data);
			statusMessage = data.statusMessage;
			console.log('statusMessage:' + statusMessage)
		},
		error: function (xhr, text, err) {
			console.log('text: ', text);
			console.log('xhr: ', xhr);
		}
	})
}





function cat() {
	var hostUrl = Dirname + '/cat'
	var article8 = new Object();
	article8.repositoryDir = Dirname;
	article8.fileName = fileName;

	$.ajax({
		type: "POST",
		url: hostUrl,
		contentType: 'application/json',
		dataType: 'json',
		data: JSON.stringify(article8),
		success: function (data) {
			console.log(data);
			catMessage = data.catMessage;

		},
		error: function (xhr, text, err) {
			console.log('text: ', text);
			console.log('xhr: ', xhr);
		}
	})
}

function ls() {
	var hostUrl = Dirname + '/ls'
	var article9 = new Object();
	article9.repositoryDir = Dirname;

	$.ajax({
		type: "POST",
		url: hostUrl,
		contentType: 'application/json',
		dataType: 'json',
		data: JSON.stringify(article9),
		success: function (data) {
			console.log(data);
			lsMessage = data.lsMessage;
		},
		error: function (xhr, text, err) {
			console.log('text: ', text);
			console.log('xhr: ', xhr);
		}
	})
}

function deleted() {
	var hostUrl = Dirname + '/delete'
	var article7 = new Object();
	article7.repositoryDir = Dirname;
	article7.fileName = fileName;

	$.ajax({
		type: "DELETE",
		url: hostUrl,
		contentType: 'application/json',
		dataType: 'json',
		data: JSON.stringify(article7),
		success: function (data) {
			console.log(data);
			statusMessage = data.statusMessage;
			console.log('statusMessage:' + statusMessage)
		},
		error: function (xhr, text, err) {
			console.log('text: ', text);
			console.log('xhr: ', xhr);
		}
	})
}

function remove() {
	var hostUrl = Dirname + '/remove'
	var article10 = new Object();
	article10.repositoryDir = Dirname;
	article10.fileName = fileName;

	$.ajax({
		type: "POST",
		url: hostUrl,
		contentType: 'application/json',
		dataType: 'json',
		data: JSON.stringify(article10),
		success: function (data) {
			console.log(data);
			statusMessage = data.statusMessage;
			console.log('statusMessage:' + statusMessage)
		},
		error: function (xhr, text, err) {
			console.log('text: ', text);
			console.log('xhr: ', xhr);
		}
	})
}

function make() {
	var hostUrl = '/make'
	var article11 = new Object();
	article11.repositoryId = ip;
	article11.fileName = fileName;
	article11.repositoryDir = Dirname;

	$.ajax({
		type: "POST",
		url: hostUrl,
		contentType: 'application/json',
		dataType: 'json',
		data: JSON.stringify(article11),
		success: function (data) {
			console.log(data);
			statusMessage = data.statusMessage;
			console.log('statusMessage:' + statusMessage)
		},
		error: function (xhr, text, err) {
			console.log('text: ', text);
			console.log('xhr: ', xhr);
		}
	})
}




function Type_create() {
	Dirname = $.now();
	getIp();
	setTimeout(function () {
		make();
	}, 1000);
}

function Type_edit() {
	Dirname = $.now();
	getIp();
	setTimeout(function () {
		make();
		add_repo()
		commit_repo(TestMessage)
		edit()
	}, 1000);
}

function Type_delete() {
	Dirname = $.now();
	getIp();
	setTimeout(function () {
		make();
		add_repo()
		commit_repo(TestMessage)
		deleted()
	}, 1000);
}
/*
function road_test(){
	$.getJSON("js/test.json", function (json) {
		message = document.getElementById("message");
		fileName = json.file
	}
}
*/
function confTest() {
	if(testNumber===0){
		testNumber++
	}
	gitstatus = []
	delete_folder()
	$.getJSON("js/test.json", function (json) {
		message = document.getElementById("message");
		fileName = json.file
		message.textContent = json.test[testNumber - 1].comment;
		TestPage = json.test[testNumber - 1].number;
		TestStatus = json.test[testNumber - 1].status;
		TestType = json.test[testNumber - 1].type;
		console.log(json.test[testNumber].type)
		if (TestType === "create") {
			Type_create()
		} else if (TestType === "edit") {
			Type_edit()
		} else if (TestType === "delete") {
			Type_delete()
		}
	});
}

//チュートリアルメッセージを置換する
function nextMessage() {
	var message = document.getElementById("message");
	console.log(message);
	message.textContent = comments[PageNumber - 1];
}

function bar() {
	var $pb = $('.progress-bar');
	barWidth = barWidth + 10
	$pb.attr({ 'style': 'width:' + barWidth + '%;', 'class': 'progress-bar' }).html(" " + barWidth + "% ");
}

function onHandle(line, report) {
	var input = $.trim(line);
	var file = new RegExp(" " + fileName + "$");
	var cats = new RegExp(/^cat/);
	var rm = new RegExp(/^rm/);
	input = input.replace(/ +/g, " ");
	input = input.replace(/\'/g, "\"");
	//data_input(line, report);ƒ
	console.log(input)
	console.log(file)
	console.log(gitstatus[PageNumber])




	if (input == 'git init') {
		if (PageNumber === 0) {
			getIp();
			doSomething();
			add_filelist();
			report([{ msg: "=> Success", className: "jquery-console-message-value" }]);
		} else {
			report([{ msg: "Reinitialized existing Git repository in .git", className: "jquery-console-message-type" }]);
		}

	} else if (input == 'git diff') {
		diff_repo();
		report([{
			msg: diffMessage,
			className: "jquery-console-message-type"
		}]);
	} else if (input == 'git status') {
		status_repo();
		report([{
			msg: statusMessage,
			className: "jquery-console-message-type"
		}]);

	} else if (input == 'help') {
		report([{ msg: "help - 各コマンドのヘルプを表示します\nls - フォルダ内のファイルリストを表示します\ncreate - フォルダに" + fileName + "ファイルを追加します\nedit - " + fileName + "ファイルの内容を変更します\ncat FILENAME - 指定したファイル内のテキストを表示します\nrm FILENAME  - 指定したファイルを削除します\n git help - このターミナル上で使えるgitコマンドのリストを表示します", className: "jquery-console-message-type" }])

	} else if (input == 'ls') {
		ls()
		report([{ msg: lsMessage, className: "jquery-console-message-type" }]);

	} else if (input.match(cats)) {
		ls();
		if (input.match(file)) {
			if (!lsMessage) {
				report([{ msg: "No such file or directory", className: "jquery-console-message-error" }]);
			} else {
				cat()
				report([{ msg: catMessage, className: "jquery-console-message-type" }]);
			}
		} else {
			report([{ msg: "No such file or directory", className: "jquery-console-message-error" }]);
		}

	}

	//git add
	else if (input.match(/^git add/)) {
		if (input.match(file) || input.match(/ .$/)) {
			add_repo();
			if ("Changed:["+fileName+"]\n" === gitstatus[PageNumber]) {
				doSomething()
				report([{ msg: "=> Success", className: "jquery-console-message-value" }]);
			} else if ("Removed:["+fileName+"]\n" === gitstatus[PageNumber]) {
				doSomething()
				remove();
				report([{ msg: "=> Success", className: "jquery-console-message-value" }]);
			} else if ("deleted:["+fileName+"]\n" === statusMessage) {
				remove();
				report();
			} else if (statusMessage == gitstatus[PageNumber]) {
				doSomething()
				report([{ msg: "=> Success", className: "jquery-console-message-value" }]);
			} else {
				add_repo();
				report();
			}
		}
		else {
			report({ msg: "did not match any files", className: "jquery-console-message-error" })
		}

		//create
	} else if (input.match(/^create$/)) {
		make();
		ls();
		if (statusMessage === gitstatus[PageNumber]) {
			//make();
			doSomething();
			add_file();
			file_add();
			report([{ msg: "=> Success", className: "jquery-console-message-value" }]);
		} else if (PageNumber === 0) {
			report([{ msg: "Repository does not exist", className: "jquery-console-message-error" }]);
		} else if (lsMessage === fileName) {
			report()
		} else {
			add_file();
			file_add();
			report();
		}

		//rm				   
	} else if (input.match(rm)) {
		ls()
		if (input.match(/.git$/)) {
			report([{ msg: ".git cannot be deleted on this terminal", className: "jquery-console-message-type" }])
		} else if (input.match(file)) {
			deleted()
			if (statusMessage === gitstatus[PageNumber]) {
				doSomething()
				file_delete();
				report([{ msg: "=> Success", className: "jquery-console-message-value" }]);
			} else if (lsMessage === "") {
				report([{ msg: "No such file or directory", className: "jquery-console-message-error" }]);
			} else {
				file_delete();
				report();
			}
		} else {
			report([{ msg: "No such file or directory", className: "jquery-console-message-error" }]);
		}

		//edit
	} else if (input.match(/^edit$/)) {
		edit();
		if (gitstatus[PageNumber] === statusMessage) {
			doSomething()
			cat();
			edit_file();
			report([{ msg: "=> Success", className: "jquery-console-message-value" }]);
		} else {
			cat();
			edit_file();
			report();
		}

		//git commit
	} else if (input.match(/^git commit -m ".*"$/)) {
		status_repo();
		if(statusMessage === "\n"){
			report([{ msg: "nothing to commit, working tree clean", className: "jquery-console-message-error" }]);
		}else{
			commit_repo(input);
			status_repo();
			console.log(gitstatus)
			if ("\n" === gitstatus[PageNumber]) {
				doSomething()
				report([{ msg: "=> Success", className: "jquery-console-message-value" }]);
			} else if (statusMessage === "\n") {
				testNumber++;
				confTest();
				report([{ msg: "=> Success", className: "jquery-console-message-value" }]);
			}  else {
				status_repo();
				report([{ msg: statusMessage, className: "jquery-console-message-error" }]);
			}
		}
	} else if (input == 'git help' || input == 'git -h') {
		report([{
			msg: "git init - Gitのリポジトリを作成します\n git add FILENAME - 指定したファイルをインデックスに追加します\n git commit -m 'MESSAGE' - 変更した内容をリポジトリに登録します\n git status - 現在のリポジトリの状態を表示します\n git diff - 現在のリポジトリの状態と最後にコミットした状態の差分を表示します\n",
			className: "jquery-console-message-type"
		}])

	} else {
		report([{
			msg: "command not found\nType `help` to see what all commands are available",
			className: "jquery-console-message-error"
		}]);
		console.log('gitstatus1:' + gitstatus)
		console.log('statusMessage:' + statusMessage)
		console3CancelFlag = false;
	}
}

$(document).ready(function () {
	var console1 = $('<div class="console1">');
	var error = false
	$('#console').append(console1);
	var comment1 = $('<p id="message">');
	$('.comment').append(comment1);
	$.getJSON("js/story2.json", function (json) {
		var message = document.getElementById("message");
		message.textContent = json.story[PageNumber].comment
	});
	var controller1 = console1.console({
		promptLabel: '$ ',
		commandValidate: function (line) {
			if (line == "") return false;
			else if (document.form1.number.value == "") {
				if (!error) {
					error = true;
					$(".err").text('学生証番号が未入力です');
				}
				return false;
			}
			else
				$(".err").remove();
			error = false;
			return true;
		},
		commandHandle: function (line, report) {
			onHandle(line, report);
		},
		autofocus: true,
		animateScroll: true,
		promptHistory: true,
		welcomeMessage: 'Type `help` to see what all commands are available'
	});
});
