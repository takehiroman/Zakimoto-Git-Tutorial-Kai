var PageNumber = 0;
var testNumber = 0;
var TestStatus = 0;
var TestType;
var TestPage;
var bargage1;
var bargage2;
barWidth = 0;
var ip;
var Dirname;
var diffMessage;
var statusMessage;
var lsMessage;
var catMessage;
var gHogeNum = new HogeNum();
var sets;
var gitstatus = [];

$.getJSON("http://ip-api.com/json/?callback=?", function (data) {
	ip = data.query;
	console.log(ip);
});

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
	$(".file").append('<p><img src="./image/computer_document.png" width="20" height="20" th:src="@{/image/computer_document.png}"></img>README.md</p>')
}

function edit_file() {
	$(".preview").text(catMessage)
}

function addLink(){
	$(".file").append('<a href="javascript:void(0);" onclick="OnLinkClick();">Exec2</a><br />')
}

function file_delete() {
	$(".file").empty();
	$(".filename").remove();
	$(".preview").empty();
}

function delete_folder(){
	$(".header").remove();
	$(".directory").remove();
	$(".progress-bar").remove();
	$(".progress-bar").remove();
}

function file_add() {
	$(".file_preview").append('<p class="filename">README.md</p><div class="preview"><p></p></div>')
}

function init_repo() {
	var hostUrl = 'init';
	var article1 = new Object();
	Dirname = $.now();
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
			gHogeNum.setNum(statusMessage);
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

	$.ajax({
		type: "PUT",
		url: hostUrl,
		contentType: 'application/json',
		dataType: 'json',
		data: JSON.stringify(article2),
		success: function (data) {
			console.log(data);
			statusMessage = data.statusMessage;
			gHogeNum.setNum(statusMessage);
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
			statusMessage = data.statusMessage;
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
	var a = line.match(/".*"$/);
	console.log(a);
	article5.repositoryDir = Dirname;
	article5.number = PageNumber;
	article5.commitMessage = a[0];

	$.ajax({
		type: "POST",
		url: hostUrl,
		contentType: 'application/json',
		dataType: 'json',
		data: JSON.stringify(article5),
		success: function (data) {
			console.log(data);
			statusMessage = data.statusMessage;
			gHogeNum.setNum(statusMessage);
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

	$.ajax({
		type: "POST",
		url: hostUrl,
		contentType: 'application/json',
		dataType: 'json',
		data: JSON.stringify(article6),
		success: function (data) {
			console.log(data);
			statusMessage = data.statusMessage;
			gHogeNum.setNum(statusMessage);
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

	$.ajax({
		type: "POST",
		url: hostUrl,
		contentType: 'application/json',
		dataType: 'json',
		data: JSON.stringify(article7),
		success: function (data) {
			console.log(data);
			statusMessage = data.statusMessage;
			gHogeNum.setNum(statusMessage);
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

	$.ajax({
		type: "POST",
		url: hostUrl,
		contentType: 'application/json',
		dataType: 'json',
		data: JSON.stringify(article10),
		success: function (data) {
			console.log(data);
			statusMessage = data.statusMessage;
			gHogeNum.setNum(statusMessage);
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
			gHogeNum.setNum(statusMessage);
			console.log('statusMessage:' + statusMessage)
		},
		error: function (xhr, text, err) {
			console.log('text: ', text);
			console.log('xhr: ', xhr);
		}
	})
}


function HogeNum() {
	sets = gitstatus;
	console.log(sets);

	this.getNum = function () {
		return gitstatus;
	};

	this.setNum = function (val) {
		console.log(sets)
		console.log(val)

	};
}

function story_get() {
	$.getJSON("js/story1.json", function (json) {
		console.log(json.story.length)
	});
}

function doSomething() {
	PageNumber++;
	$.getJSON("js/story1.json", function (json) {
		console.log(json.story.length)
		var message = document.getElementById("message");
		//var number = json.story[i].number
		console.log(number)
		message.textContent = json.story[PageNumber - 1].comment
		gitstatus.push(json.story[PageNumber - 1].status)
		console.log('gitstatus:' + gitstatus)
		var $pb1 = $('.progress-bar');
		bargage1 = PageNumber / json.story.length
		$pb1.attr({ 'style': 'width:' + Math.round(PageNumber / json.story.length * 100) + '%;', 'class': 'progress-bar' }).html(" " + Math.round(PageNumber / json.story.length * 100) + "% ");
	});
}

function confTest() {
	testNumber++;
	delete_folder()
	$.getJSON("js/test.json", function (json) {
		message = document.getElementById("message");
		message.textContent = json.test[testNumber-1].comment;
		TestPage = json.test[testNumber-1].number;
		TestStatus = json.test[testNumber-1].status;
		TestType = json.test[testNumber-1].type;
		console.log(json.test[testNumber].type)
		if(TestType === "create"){
			getIp();
			setTimeout(function () {
				make();
			}, 1000);
			}else if(TestType === "edit"){
				edit()
			}else if(TestType === "delete"){
				deleted()
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
	var commit = new RegExp(/^git commit -m ".*"$'/);
	var cats = new RegExp(/^cat /);
	var rm = new RegExp(/^rm /);
	input = input.replace(/ +/g, " ");
	input = input.replace(/\'/g, "\"");
	//data_input(line, report);
	console.log(gitstatus[PageNumber - 1])
	console.log(statusMessage)




	if (input == 'git init') {
		if(PageNumber === 0){
		getIp();
		setTimeout(function () {
			console.log(gHogeNum.getNum());
		}, 3500);
		doSomething()
		add_filelist();
		report([{ msg: "=> Success", className: "jquery-console-message-value" }]);
		}else{
		report([{msg:"Reinitialized existing Git repository in .git",className:"jquery-console-message-type"}]);
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
		report([{ msg: "help - 各コマンドのヘルプを表示します\nls - フォルダ内のファイルリストを表示します\ncreate - フォルダにREADMEファイルを追加します\nedit - READMEファイルの内容を変更します\ncat FILENAME - 指定したファイル内のテキストを表示します\nrm FILENAME  - 指定したファイルを削除します\n git help - このターミナル上で使えるgitコマンドのリストを表示します", className: "jquery-console-message-type" }])

	} else if (input == 'ls') {
		ls()
		report([{ msg: lsMessage, className: "jquery-console-message-type" }]);

	} else if (input.match(cats)) {
		ls();
		if (input.match(/README.md$/)) {
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
	else if (input.match(/^git add README.md$/) || input.match(/^git add .$/)) {
		if ("Modified:[README.md]" === statusMessage && "Changed:[README.md]" === gitstatus[PageNumber - 1]) {
			doSomething()
			add_repo();
			report([{ msg: "=> Success", className: "jquery-console-message-value" }]);
		} else if ("Removed:[README.md]" === gitstatus[PageNumber - 1] && statusMessage === "deleted:[README.md]") {
			doSomething()
			remove();
			report([{ msg: "=> Success", className: "jquery-console-message-value" }]);
		} else if ("Removed:[README.md]" === TestStatus && statusMessage === "deleted:[README.md]") {
			doSomething()
			remove();
			report();
		} else if ("Untracked:[README.md]" === statusMessage && "new file:[README.md]" === gitstatus[PageNumber - 1]) {
			doSomething()
			add_repo();
			report([{ msg: "=> Success", className: "jquery-console-message-value" }]);
		} else {
			add_repo();
			report();
		}
		//create
	} else if (input.match(/^create$/)) {
		ls()
		if ("" === statusMessage && "Untracked:[README.md]" === gitstatus[PageNumber - 1]) {
			doSomething()
			make();
			add_file();
			file_add();
			report([{ msg: "=> Success", className: "jquery-console-message-value" }]);
		} else if (lsMessage === "README.md") {
			report();
		} else {
			make();
			add_file();
			file_add();
			report();
		}

		//rm				   
	} else if (input.match(rm)) {
		ls()
		if(input.match(/.git$/)){
			report([{msg:".git cannot be deleted on this terminal",className:"jquery-console-message-type"}])
		}else if (input.match(/README.md$/)) {
			if ("deleted:[README.md]" === gitstatus[PageNumber - 1]) {
				doSomething()
				deleted();
				file_delete();
				report([{ msg: "=> Success", className: "jquery-console-message-value" }]);
			}else if (lsMessage === "") {
				report([{ msg: "No such file or directory", className: "jquery-console-message-error" }]);
			}else {
				deleted();
				file_delete();
				report();
			}
		} else {
			report([{ msg: "No such file or directory", className: "jquery-console-message-error" }]);
		}

		//edit
	} else if (input.match(/^edit$/)) {
		if ("Modified:[README.md]" === gitstatus[PageNumber - 1] && statusMessage === "") {
			doSomething()
			edit();
			cat();
			edit_file();
			report([{ msg: "=> Success", className: "jquery-console-message-value" }]);
		} else {
			edit();
			cat();
			edit_file();
			report();
		}
		//git commit
	} else if (input.match(/^git commit -m ".*"$/)) {
		if ("" === gitstatus[PageNumber - 1]) {
			doSomething()
			commit_repo(input);
			report([{ msg: "=> Success", className: "jquery-console-message-value" }]);
		}else if(statusMessage === TestStatus){
			commit_repo(input);
			confTest();
			report([{ msg: "=> Success", className: "jquery-console-message-value" }]);
		}else if(statusMessage === "new file:[README.md]" || statusMessage === "Changed:[README.md]"){
			commit_repo(input);
		} else if (statusMessage === "") {
			report([{ msg: "nothing to commit, working tree clean", className: "jquery-console-message-error" }]);
		} else {
			status_repo();
			report([{ msg: statusMessage, className: "jquery-console-message-error" }]);
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
	HogeNum();
}

$(document).ready(function () {
	var console1 = $('<div class="console1">');
	var error = false
	$('#console').append(console1);
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
