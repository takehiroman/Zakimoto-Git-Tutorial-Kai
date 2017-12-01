var PageNumber = 0;
var testNumber = 0;
var TestStatus = 0;
var TestMessage = '"test"';
var ip;
var Dirname
var diffMessage;
var statusMessage;
var lsMessage;
var catMessage;
var fileName;
var gitstatus = [];
var test = [];
var file_img = false

function get_ip() {

	$.getJSON("http://ip-api.com/json/?callback=?", function (data) {
		ip = data.query;
	})

}

function tuto_status() {
	$.getJSON("js/story2.json", function (json) {
		for (var i in json.story) {
			if (json.story[i].status === "") {
				gitstatus.push("\n")
			} else {
				gitstatus.push(json.story[i].status + "[" + json.file + "]" + "\n")
			}
			fileName = json.file
		}
	})
}
tuto_status();

function test_status() {
	$.getJSON("js/test.json", function (json) {
		for (var i in json.test) {
			if (json.test[i].status === "") {
				test.push("\n")
			}
		}
	});
}
test_status();

function Button_Click() {
	window.location.reload();
}

function up_Bar() {
	PageNumber++;
	$.getJSON("js/story2.json", function (json) {

		var message = document.getElementById("message");

		message.textContent = json.story[PageNumber].comment
		var $pb1 = $('.progress-bar');
		bargage1 = PageNumber / json.story.length
		$pb1.attr({ 'style': 'width:' + Math.round(PageNumber / (json.story.length - 1) * 100) + '%;', 'class': 'progress-bar' }).html(" " + Math.round(PageNumber / (json.story.length - 1) * 100) + "% ");
		if (PageNumber == json.story.length - 1) {
			change_button();
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

function delete_folder() {
	$(".header").hide();
	$(".directory").hide();
	$(".progress-bar").hide();
	$(".progress").hide();
}

function open_tuto() {
	$(".header").show();
	$(".directory").show();
	$(".progress-bar").show();
	$(".progress").show();
	tuto_status();
	ip = undefined;
	lsMessage = undefined;
	Dirname = undefined;
	test = [];
	PageNumber = -1;
	up_Bar();
	file_delete();
	$(".folder").empty();
}

function init_repo() {
	Dirname = $.now();
	var hostUrl = 'init';
	var article1 = new Object();
	article1.repositoryId = ip;
	article1.repositoryDir = Dirname;
	var loc = window.location.pathname;
	var dirname = loc.substring(0, loc.lastIndexOf("\\") + 1);

	$.ajax({
		type: "POST",
		url: hostUrl,
		contentType: 'application/json',
		dataType: 'json',
		data: JSON.stringify(article1),
		success: function (data) {
			statusMessage = data.statusMessage;
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
			statusMessage = data.statusMessage;
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
			diffMessage = data.diffMessage;

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
			statusMessage = data.statusMessage;
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

function confTest() {
	if (testNumber === 0) {
		testNumber++
	}
	PageNumber = 1;
	gitstatus = []
	test_status();
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

function edit_file() {
	$(".preview").text(catMessage)
}

function add_filelist() {
	$(".folder").html('<p><img src="./image/computer_folder.png" width="20" height="20" th:src="@{/image/computer_folder.png}"></img>.git</p>')
}

function add_file() {
	$(".file").html('<p><img src="./image/computer_document.png" width="20" height="20" th:src="@{/image/computer_document.png}"></img>' + fileName + '</p>')
}

function change_button() {
	$('#lock-btn').remove();
	$(".btn-link").html('<input type="button" id="tutorial-btn" class="btn btn-success btn-lg" onclick="open_tuto()" value="チュートリアルをはじめから" ></input>\n<input type="button" class="btn btn-primary btn-lg" value="確認テスト" onClick="confTest()" ></input>')
}

function file_add() {
	$(".filename").text(fileName)
}

function file_delete() {
	$(".file").empty();
	$(".filename").empty();
	$(".preview").empty();
}

function onHandle(line, report) {
	var input = $.trim(line);
	var file = new RegExp(" " + fileName + "$");
	var cats = new RegExp(/^cat/);
	var rm = new RegExp(/^rm/);
	var commit = new RegExp(/^git commit -m/)
	input = input.replace(/ +/g, " ");
	input = input.replace(/\'/g, "\"");
	//data_input(line, report);
	get_ip();
	setTimeout(function () {
	if (!ip) {
		report([{
			msg: "Network Error",
			className: "jquery-console-message-type"
		}]);
	} else {


		if (input == 'git init') {

			if (PageNumber === 0) {
				getIp();
				up_Bar();
				add_filelist();
				report([{ msg: "=> Success", className: "jquery-console-message-value" }]);
			} else {
				report([{ msg: "Reinitialized existing Git repository in .git", className: "jquery-console-message-type" }]);
			}


		} else if (input == 'git diff') {
			diff_repo();
			if (!Dirname) {
				report([{ msg: "Not a git repository", className: "jquery-console-message-error" }])
			} else {
				report([{
					msg: diffMessage,
					className: "jquery-console-message-type"
				}]);
			}

		} else if (input == 'git status') {
			status_repo();
			if (!Dirname) {
				report([{ msg: "Not a git repository", className: "jquery-console-message-error" }])
			} else {
				report([{
					msg: statusMessage,
					className: "jquery-console-message-type"
				}]);
			}

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
			if (!Dirname) {
				report([{ msg: "Not a git repository", className: "jquery-console-message-error" }])
			} else {
				if (input.match(file) || input.match(/[\.\*\$]/)) {
					add_repo();
					if ("Changed:[" + fileName + "]\n" === gitstatus[PageNumber] && statusMessage === gitstatus[PageNumber]) {
						up_Bar()
						report([{ msg: "=> Success", className: "jquery-console-message-value" }]);
					} else if ("Removed:[" + fileName + "]\n" === gitstatus[PageNumber]) {
						up_Bar();
						remove();
						report([{ msg: "=> Success", className: "jquery-console-message-value" }]);
					} else if (statusMessage.match(/deleted:/)) {
						remove();
						report();
					} else if ("new file:[" + fileName + "]\n" === gitstatus[PageNumber] && statusMessage === gitstatus[PageNumber]) {
						up_Bar();
						report([{ msg: "=> Success", className: "jquery-console-message-value" }]);
					} else {
						add_repo();
						report();
					}
				}
				else {
					report({ msg: "did not match any files", className: "jquery-console-message-error" })
				}
			}

			//create
		} else if (input.match(/^create$/)) {
			make();
			ls();
			if ("Untracked:[" + fileName + "]\n" === gitstatus[PageNumber]) {
				up_Bar();
				file_img = true
				report([{ msg: "=> Success", className: "jquery-console-message-value" }]);
			} else if (PageNumber === 0) {
				report([{ msg: "Repository does not exist", className: "jquery-console-message-error" }]);
			} else if (lsMessage === fileName) {
				file_img = true
				report();
			} else {
				report();
			}

			//rm				   
		} else if (input.match(rm)) {
			ls()
			if (!Dirname) {
				report([{ msg: "No such file or directory", className: "jquery-console-message-error" }]);

			} else if (input.match(/.git$/)) {
				report([{ msg: ".git cannot be deleted on this terminal", className: "jquery-console-message-type" }])
			} else if (input.match(file)) {
				deleted();
				if (statusMessage === gitstatus[PageNumber]) {
					up_Bar()
					report([{ msg: "=> Success", className: "jquery-console-message-value" }]);
				} else if (lsMessage === "") {
					report([{ msg: "No such file or directory", className: "jquery-console-message-error" }]);
				} else {
					report();
				}
			} else {
				report([{ msg: "No such file or directory", className: "jquery-console-message-error" }]);
			}

			//git rm
		} else if (input.match(/^git rm/)) {
			if (!Dirname) {
				report([{ msg: "Not a git repository", className: "jquery-console-message-error" }])
			} else {
				if (input.match(/ .$/)) {
					report([{ msg: "'.'  not removing", className: "jquery-console-message-error" }])
				} else if (input.match(/.git$/)) {
					report([{ msg: ".git cannot be deleted on this terminal", className: "jquery-console-message-type" }])
				} else if (input.match(file)) {
					ls();
					remove();
					if (statusMessage === gitstatus[PageNumber]) {
						up_Bar();
						report([{ msg: "=> Success", className: "jquery-console-message-value" }]);
					} else if (statusMessage === "Untracked:[" + fileName + "]\n") {
						report([{ msg: "did not match any files", className: "jquery-console-message-error" }]);
					} else {
						report();
					}
				} else {
					report([{ msg: "No such file or directory", className: "jquery-console-message-error" }]);
				}

			}


			//edit
		} else if (input.match(/^edit$/)) {
			edit();
			if (gitstatus[PageNumber] === statusMessage) {
				up_Bar()
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
			if (!Dirname) {
				report([{ msg: "Not a git repository", className: "jquery-console-message-error" }])
			} else {
				status_repo();
				if (statusMessage === "\n") {
					report([{ msg: "nothing to commit, working tree clean", className: "jquery-console-message-error" }]);
				} else if (input.match(/""$/)) {
					report([{ msg: "Aborting commit due to empty commit message.", className: "jquery-console-message-error" }]);
				} else {
					commit_repo(input);
					if ("\n" === gitstatus[PageNumber] && statusMessage === "") {
						up_Bar()
						report([{ msg: "=> Success", className: "jquery-console-message-value" }]);
					} else if (test[testNumber - 1] === "\n" && statusMessage === "") {
						testNumber++;
						confTest();
						report([{ msg: "=> Success", className: "jquery-console-message-value" }]);
					} else {
						report([{ msg: statusMessage, className: "jquery-console-message-error" }]);
					}
				}
			}
		} else if (input == 'git help' || input == 'git -h') {
			report([{
				msg: "git init - Gitのリポジトリを作成します\n git add FILENAME - 指定したファイルをインデックスに追加します\n git commit -m 'MESSAGE' - 変更した内容をリポジトリに登録します\n git status - 現在のリポジトリの状態を表示します\n git diff - 現在のリポジトリの状態と最後にコミットした状態の差分を表示します\n git rm FILENAME - 指定したファイルをバージョン管理の対象から外して削除します\n",
				className: "jquery-console-message-type"
			}])

		} else {
			report([{
				msg: "command can not be used\nType `help` to see what all commands are available",
				className: "jquery-console-message-error"
			}]);
			console.log('gitstatus1:' + gitstatus)
			console.log('statusMessage:' + statusMessage)
			console3CancelFlag = false;
		}
		if (Dirname) {
			ls()
		}
		if (lsMessage === fileName) {
			add_file();
			file_add();
		} else {
			file_delete()
		}
	}
},500);
	ip = undefined;

}



$(document).ready(function () {
	var console1 = $('<div class="console1">');
	var error = false
	var number = document.getElementById("number");
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
			document.form1.number.value = document.form1.number.value.replace(/ +/g, "");
			document.form1.number.value = document.form1.number.value.replace(/　+/g, "");
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
			number.readOnly = true;
			$(".form-color").css('color', '#d3d3d3')
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
