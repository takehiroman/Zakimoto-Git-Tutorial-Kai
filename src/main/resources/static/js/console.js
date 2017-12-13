var PageNumber = 0;
var testNumber = 0;
var testNumberLimit;
var TestStatus = 0;
var addfile;
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
var first_clear = false;
var tuto_number;
var pid;
var save_id;
var save_Dir;
var save_number;
var save_sts;
var StrNum;
var Strjson;
var back;
var clicknum;
var tuto_change = false;
var up_tuto = false;
var back_number = false;

function get_ip() {

	$.getJSON("http://ip-api.com/json/?callback=?", function (data) {
		ip = data.query;
	})
}

function input_name() {
	var input_number = prompt("あなたの\t学生証番号\tを入力して下さい");
	if (input_number === null || input_number === "") {
		window.alert('番号が入力されていません');
		input_name()
	} else if (!input_number.match(/^[0-9]+$/)) {
		window.alert('数字以外が含まれています');
		input_name()
	} else {
		localStorage.setItem("student_number", input_number);
		console.log(input_number)
		setTimeout(function () { open_stdnumber() }, 500);
	}

}

if (localStorage.getItem("student_number") === null) {
	input_name();
}

function delete_number() {
	var input_number = prompt("あなたの\t学生証番号\tを入力して下さい");
	if (input_number === "") {
		window.alert('番号が入力されていません');
		delete_number()
	} else if (!input_number.match(/^[0-9]+$/)) {
		window.alert('数字以外が含まれています');
		delete_number()
	} else if (input_number === null) {
		console.log(input_number)
	} else {
		localStorage.removeItem("student_number");
		localStorage.setItem("student_number", input_number);
		console.log(input_number)
		setTimeout(function () { open_stdnumber() }, 500);
	}
}

function open_stdnumber() {
	var number = document.getElementById("numbers");
	var num = localStorage.getItem("student_number")
	console.log(localStorage.getItem("student_number"))
	number.innerHTML = "<p>" + num + "</p>";
}

function tuto_status() {
	$.getJSON("js/story" + tuto_number + ".json", function (json) {
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

function up_Bar() {
	if (!tuto_change) {
		PageNumber++
		back = PageNumber;
		$("#tutorial-btn").prop("disabled", false);
	}
	$.getJSON("js/story" + tuto_number + ".json", function (json) {

		var message = document.getElementById("message");

		message.innerHTML = "<p>" + json.story[PageNumber].comment + "</p>";
		for (let i in json.link) {
			message.innerHTML = message.innerHTML.replace(json.link[i].name, json.link[i].url)
		}
		var $pb1 = $('.progress-bar');
		bargage1 = PageNumber / json.story.length
		$pb1.attr({ 'style': 'width:' + Math.round(PageNumber / (json.story.length - 1) * 100) + '%;', 'class': 'progress-bar' }).html(" " + Math.round(PageNumber / (json.story.length - 1) * 100) + "% ");
		if (PageNumber == json.story.length - 1) {
			first_clear = true;
			$("#1").prop("disabled", false);
			$("#2").prop("disabled", false);
			Dirname = sessionStorage.removeItem(pid + "Dir")
			console.log(Dirname);
			StrNum = sessionStorage.removeItem(pid + "Num")
			console.log(StrNum);
			PageNumber = parseInt(StrNum);
			Strjson = sessionStorage.removeItem(pid + "Sts");
		}
	});
	
	console.log(PageNumber)
	if (PageNumber > 0) {
		$("#top-btn").prop("disabled", false);
		$("#back-btn").prop("disabled", false);
		$("#new-btn").prop("disabled", true);
		$("#front-btn").prop("disabled", true);
	}
}

function top_tuto() {
	if (PageNumber > 0) {
		back_number = true;
		$.getJSON("js/story" + tuto_number + ".json", function (json) {

			var message = document.getElementById("message");
			message.innerHTML = "<p>" + json.story[0].comment + "</p>";
			back = 0;
			for (let i in json.link) {
				message.innerHTML = message.innerHTML.replace(json.link[i].name, json.link[i].url)
			}
		});
		if (back <= 0) {
			$("#top-btn").prop("disabled", true);
			$("#back-btn").prop("disabled", true);
			$("#new-btn").prop("disabled", false);
			$("#front-btn").prop("disabled", false);
		}
	}
}

function back_tuto() {
	if (PageNumber > 0) {
		back_number = true;
		$.getJSON("js/story" + tuto_number + ".json", function (json) {

			var message = document.getElementById("message");
			message.innerHTML = "<p>" + json.story[back - 1].comment + "</p>";
			back = back - 1;
			for (let i in json.link) {
				message.innerHTML = message.innerHTML.replace(json.link[i].name, json.link[i].url)
			}
		});
		$("#new-btn").prop("disabled", false);
		$("#front-btn").prop("disabled", false);
		if (back <= 0) {
			$("#top-btn").prop("disabled", true);
			$("#back-btn").prop("disabled", true);
		}
	}
}

function front_tuto() {
	if (back < PageNumber) {
		//back = PageNumber;
		$.getJSON("js/story" + tuto_number + ".json", function (json) {

			var message = document.getElementById("message");
			message.innerHTML = "<p>" + json.story[back + 1].comment + "</p>";
			back = back + 1;
			for (let i in json.link) {
				message.innerHTML = message.innerHTML.replace(json.link[i].name, json.link[i].url)
			}
		});
		$("#top-btn").prop("disabled", false);
		$("#back-btn").prop("disabled", false);
		if (back >= PageNumber) {
			$("#new-btn").prop("disabled", true);
			$("#front-btn").prop("disabled", true);
		}
	}
	back_number = false;
}

function new_tuto() {
	//back = PageNumber;
	$.getJSON("js/story" + tuto_number + ".json", function (json) {

		var message = document.getElementById("message");
		message.innerHTML = "<p>" + json.story[PageNumber].comment + "</p>";
		back = PageNumber;
		for (let i in json.link) {
			message.innerHTML = message.innerHTML.replace(json.link[i].name, json.link[i].url)
		}
	});
	if (back <= PageNumber) {
		$("#top-btn").prop("disabled", false);
		$("#back-btn").prop("disabled", false);
		$("#new-btn").prop("disabled", true);
		$("#front-btn").prop("disabled", true);
	}
}

function save_tuto() {
	save_Dir = Dirname;
	sessionStorage.setItem(pid + "Dir", save_Dir);
	console.log(pid + "Dir")
	save_number = PageNumber;
	sessionStorage.setItem(pid + "Num", save_number);
	console.log(pid + "Num")
	save_sts = JSON.stringify(gitstatus);
	sessionStorage.setItem(pid + "Sts", save_sts);
	console.log(pid + "Sts");
}

function load_tuto() {
	Dirname = sessionStorage.getItem(pid + "Dir")
	console.log(Dirname);
	StrNum = sessionStorage.getItem(pid + "Num")
	console.log(StrNum);
	PageNumber = parseInt(StrNum);
	Strjson = sessionStorage.getItem(pid + "Sts");
	gitstatus = JSON.parse(Strjson);
	console.log(gitstatus);
}


$(function () {
	$("#1").click(function () {
		pid = $(this).attr("id");
	})
});

$(function () {
	$("#2").click(function () {
		pid = $(this).attr("id");
	})
});

function select_tuto() {
	$("#1").prop("disabled", true);
	$("#2").prop("disabled", true);
	if (Dirname) {
		save_tuto();
	}

	setTimeout(function () {
		tuto_number = pid
		back_number = false;

		var size = $('div.jquery-console-prompt-box').length;
		$('.jquery-console-prompt-box').eq(size - 1).before('<div class="jquery-console-message jquery-console-message-type" style="">チュートリアル' + tuto_number + '</div>');

		var pages = sessionStorage.getItem(pid + "Num");

		open_stdnumber();
		if (pages == null) {
			PageNumber = -1;
			Dirname = undefined;
			gitstatus = [];
			tuto_status()
			console.log("NG");
			$("#top-btn").prop("disabled", true);
			$("#back-btn").prop("disabled", true);
			$("#new-btn").prop("disabled", true);
			$("#front-btn").prop("disabled", true);
		} else {
			$.getJSON("js/story" + tuto_number + ".json", function (json) {
				fileName = json.file
			})
			load_tuto()
			tuto_change = true;
			$("#new-btn").prop("disabled", true);
			$("#front-btn").prop("disabled", true);
			console.log("OK")
		}
		if (first_clear) {
			if (pid == 1) {
				$("#2").prop("disabled", false);
			} else if (pid == 2) {
				$("#1").prop("disabled", false);
			}
		}
		up_Bar();
		tuto_change = false;
	}, 500);

}
/*
setTimeout(function () {
	up_Bar()
	tuto_change = false;
}, 700);
*/
function first_page() {
	$("#tutorial-btn").prop("disabled", false);
	$.getJSON("js/story" + tuto_number + ".json", function (json) {

		var message = document.getElementById("message");

		message.innerHTML = "<p>" + json.story[PageNumber].comment + "</p>";
		for (let i in json.link) {
			message.innerHTML = message.innerHTML.replace(json.link[i].name, json.link[i].url)
		}
		var $pb1 = $('.progress-bar');
		bargage1 = PageNumber / json.story.length
		$pb1.attr({ 'style': 'width:' + Math.round(PageNumber / (json.story.length - 1) * 100) + '%;', 'class': 'progress-bar' }).html(" " + Math.round(PageNumber / (json.story.length - 1) * 100) + "% ");
		if (PageNumber == json.story.length - 1) {
			$("#1").prop("disabled", false);
			$("#2").prop("disabled", false);
			Dirname = sessionStorage.removeItem(pid + "Dir")
			console.log(Dirname);
			StrNum = sessionStorage.removeItem(pid + "Num")
			console.log(StrNum);
			PageNumber = parseInt(StrNum);
			Strjson = sessionStorage.removeItem(pid + "Sts");
		}
	});
}

function Button_Click() {
	window.location.reload();
}

sessionStorage.clear();


//ログを保存する
function data_input(line, report) {
	var hostUrl = 'store';
	var article = new Object();
	var stname = localStorage.getItem("student_number");

	article.number = stname;
	article.tutoNumber = PageNumber
	article.testNumber = testNumber
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
		init_repo();
	});
}

function file_add() {
	$(".filename").text(fileName)
}

function reset_tuto() {
	tuto_status();
	if (PageNumber == 1) {
		var size = $('div.jquery-console-prompt-box').length;
		$('.jquery-console-prompt-box').eq(size - 1).before('<div class="jquery-console-message jquery-console-message-type" style="">チュートリアルの最初の状態です</div>');
	}
	ip = undefined;
	lsMessage = undefined;
	Dirname = undefined;
	test_click = true;
	test = [];
	PageNumber = -1;
	up_Bar();
	file_delete();
	$(".folder").empty();
}

function open_tuto() {
	Dirname = undefined;
	console.log(pid + "Dir")
	sessionStorage.removeItem(pid + "Dir");
	console.log(pid + "Num")
	sessionStorage.removeItem(pid + "Num");
	console.log(pid + "Sts")
	sessionStorage.removeItem(pid + "Sts");
	$("#tutorial-btn").prop("disabled", true);
	if (!Dirname) {
		select_tuto();
	}
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
		},
		error: function (xhr, text, err) {
			console.log('text: ', text);
			console.log('xhr: ', xhr);
		}
	})
}

//ボタン押した時
function clear_test() {
	test_json();
}

function reloaded () {
    return window.name == window.location.href ? true : false;
}




//チュートリアルメッセージを置換する
function nextMessage() {
	var message = document.getElementById("message");
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

function add_file() {
	$(".file").html('<p><img src="./image/computer_document.png" width="20" height="20" th:src="@{/image/computer_document.png}"></img>' + fileName + '</p>')
}

function onHandle(line, report) {
	var input = $.trim(line);
	var files = new RegExp(" " + fileName + "$");
	var cats = new RegExp(/^cat/);
	var rm = new RegExp(/^rm/);
	var commit = new RegExp(/^git commit -m/)
	var newfile = new RegExp(/new file:/)
	var change = new RegExp(/Changed:/)
	var removed = new RegExp(/Removed:/)
	input = input.replace(/\n/g, " ");
	var commands = input.split(" ");
	var ss = line.split(" ");
	ss.splice(0, 2);
	if (ss.indexOf(fileName) >= 0) {
		addfile = fileName
	}
	console.log(commands);
	console.log(commands[0])
	console.log(commands.length)
	if (commands[0] === "git" && commands.length > 4) {
		input = commands.slice(0, 2);
		input = input.join(" ");
		console.log(input);
	}

	var file = ss.indexOf(fileName)
	if (file >= 0) {
		ss.splice(file, 1);
	}
	var dot = ss.indexOf(".")
	if (dot >= 0) {
		ss.splice(dot, 1);
	}
	var ast = ss.indexOf("*")
	if (ast >= 0) {
		ss.splice(ast, 1);
	}



	var status = statusMessage;
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


			if (input == 'help') {
				report([{ msg: "help - 各コマンドのヘルプを表示します\nls - フォルダ内のファイルリストを表示します\ncreate - フォルダに" + fileName + "ファイルを追加します\nedit - " + fileName + "ファイルの内容を変更します\ncat FILENAME - 指定したファイル内のテキストを表示します\nrm FILENAME  - 指定したファイルを削除します\n git help - このターミナル上で使えるgitコマンドのリストを表示します\n git status help - git statusの状態それぞれの意味を表示します", className: "jquery-console-message-type" }])

			} else if (input == 'ls') {
				ls()
				report([{ msg: lsMessage, className: "jquery-console-message-type" }]);

			} else if (input.match(cats)) {
				ls();
				if (input.match(files)) {
					if (!lsMessage) {
						report([{ msg: "No such file or directory", className: "jquery-console-message-error" }]);
					} else {
						cat()
						report([{ msg: catMessage, className: "jquery-console-message-type" }]);
					}
				} else if (input.match(/.git$/)) {
					report([{ msg: ".git is a directory", className: "jquery-console-message-type" }]);
				} else if (input.match(/^cat$/)) {
					report([{ msg: "usage:cat FILENAME", className: "jquery-console-message-type" }]);
				} else {
					report([{ msg: "No such file or directory", className: "jquery-console-message-error" }]);
				}

			} else if (input == 'git help' || input == 'git -h') {
				report([{
					msg: "git init - Gitのリポジトリを作成します\n git add FILENAME - 指定したファイルをインデックスに追加します\n git commit -m 'MESSAGE' - 変更した内容をリポジトリに登録します\n git status - 現在のリポジトリの状態を表示します\n git diff - 現在のリポジトリの状態と最後にコミットした状態の差分を表示します\n git rm FILENAME - 指定したファイルをバージョン管理の対象から外して削除します\n",
					className: "jquery-console-message-type"
				}])
			} else if (input == 'git status help' || input == 'git -h') {
				report([{
					msg: "Untracked:[FILENAME] - 追加したファイルがインデックスに登録されていません\n new file:[FILENAME] - 追加したファイルがインデックスに登録されています\n Modified:[FILENAME] - 編集したファイルがインデックスに登録されていません\n Changed:[FILENAME] - 編集したファイルがインデックスに登録されています\n deleted:[FILENAME] - 削除したファイルがインデックスに登録されていません\n Removed:[FILENAME] - 削除したファイルがインデックスに登録されています\n",
					className: "jquery-console-message-type"
				}])

			} else if (input.match(/^git /)) {
				if (input == 'git init') {

					if (PageNumber === 0) {
						getIp();
						up_Bar();
						add_filelist();
						report([{ msg: "=> Success", className: "jquery-console-message-value" }]);
					} else {
						report([{ msg: "Reinitialized existing Git repository in .git", className: "jquery-console-message-type" }]);
					}

				}

				else if (input == 'git diff') {
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

				}


				//git add
				else if (input.match(/^git add$/)) {
					report([{ msg: "Nothing specified, nothing added.", className: "jquery-console-message-error" }])
				} else if (input.match(/^git add /)) {
					if (!Dirname) {
						report([{ msg: "Not a git repository", className: "jquery-console-message-error" }])
					} else {
						if (ss.length > 0) {
							report([{ msg: ss + ":did not match any files", className: "jquery-console-message-error" }])
						}
						else if (fileName == addfile || input.match(/[\.\*]$/)) {
							add_repo();
							ls();
							console.log("1")
							if ("Modified:[" + fileName + "]\n" === gitstatus[PageNumber] && status.match(/^Modified:/)) {
								up_Bar()
								report([{ msg: "=> Success", className: "jquery-console-message-value" }]);
								console.log("2")
							} else if ("\n" === gitstatus[PageNumber] && "Removed:[" + fileName + "]\n" === gitstatus[PageNumber + 1]) {
								if (status.match(/^deleted:/)) {
									up_Bar();
									remove();
									report([{ msg: "=> Success", className: "jquery-console-message-value" }]);
									console.log("3")
								} else {
									report();
								}
							} else if (statusMessage.match(/deleted:/)) {
								remove();
								report();
								console.log("5")
							} else if ("Untracked:[" + fileName + "]\n" === gitstatus[PageNumber] && status.match(/^Untracked:/)) {
								up_Bar();
								report([{ msg: "=> Success", className: "jquery-console-message-value" }]);
								console.log("6")
							} else if (lsMessage == "" && statusMessage === "") {
								report([{ msg: fileName + ":did not match any files", className: "jquery-console-message-error" }])
							} else {
								report();
								console.log("7")
							}
						} else {
							report([{ msg: "did not match any files", className: "jquery-console-message-error" }])
						}
					}
					//git rm
				} else if (input.match(/^git rm$/)) {
					report([{ msg: "usage: git rm FILENAME", className: "jquery-console-message-type" }])

				} else if (input.match(/^git rm /)) {
					console.log(gitstatus[PageNumber])
					console.log(gitstatus[PageNumber + 1])
					if (!Dirname) {
						report([{ msg: "Not a git repository", className: "jquery-console-message-error" }])
					} else {
						if (input.match(/ \.$/)) {
							report([{ msg: "'.'  not removing", className: "jquery-console-message-error" }])
						} else if (input.match(/.git$/)) {
							report([{ msg: ".git cannot be deleted on this terminal", className: "jquery-console-message-type" }])
						} else if (input.match(files)) {
							ls();
							remove();
							if ("\n" === gitstatus[PageNumber] && "Removed:[" + fileName + "]\n" === gitstatus[PageNumber + 1]) {
								up_Bar();
								report([{ msg: "=> Success", className: "jquery-console-message-value" }]);
							} else if (statusMessage === "Untracked:[" + fileName + "]\n") {
								report([{ msg: fileName + ":did not match any files", className: "jquery-console-message-error" }]);
							} else if (lsMessage == "" && statusMessage === "") {
								report([{ msg: fileName + ":did not match any files", className: "jquery-console-message-error" }])
							} else {
								console.log(gitstatus[PageNumber])
								console.log(gitstatus[PageNumber + 1])
								report();
							}
						} else {
							report([{ msg: "No such file or directory", className: "jquery-console-message-error" }]);
						}

					}

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
							if ("Changed:[" + fileName + "]\n" === gitstatus[PageNumber] && status.match(change)) {
								up_Bar()
								report([{ msg: "=> Success", className: "jquery-console-message-value" }]);
							} else if ("new file:[" + fileName + "]\n" === gitstatus[PageNumber] && status.match(newfile)) {
								up_Bar()
								report([{ msg: "=> Success", className: "jquery-console-message-value" }]);
							} else if ("Removed:[" + fileName + "]\n" === gitstatus[PageNumber] && status.match(removed)) {
								up_Bar()
								report([{ msg: "=> Success", className: "jquery-console-message-value" }]);
							} else {
								report([{ msg: statusMessage, className: "jquery-console-message-error" }]);
							}
						}
					}
				} else if (input.match(/^git commit$/)) {
					report([{ msg: "Command cannot use at this terminal. See 'git help'", className: "jquery-console-message-type" }]);
				} else {
					report([{ msg: "git: " + input + " is not a git command. See 'git help'", className: "jquery-console-message-error" }]);
				}


				//create
			} else if (input.match(/^create$/)) {
				make();
				ls();
				if ("\n" === gitstatus[PageNumber] && gitstatus[PageNumber + 1] === "Untracked:[" + fileName + "]\n") {
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
			} else if (input.match(/^create /)) {
				report([{ msg: "usage:create", className: "jquery-console-message-type" }]);
				//rm				   
			} else if (input.match(rm)) {
				console.log(gitstatus[PageNumber])
				ls()
				if (!Dirname) {
					report([{ msg: "No such file or directory", className: "jquery-console-message-error" }]);
				} else if (input.match(/^rm$/)) {
					report([{ msg: "usage:rm FILENAME", className: "jquery-console-message-type" }]);
				} else if (input.match(/.git$/)) {
					report([{ msg: ".git cannot be deleted on this terminal", className: "jquery-console-message-type" }])
				} else if (input.match(files)) {
					deleted();
					if ("\n" === gitstatus[PageNumber] && gitstatus[PageNumber + 1] === "deleted:[" + fileName + "]\n") {
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

			} else if (input.match(/^edit$/)) {
				if (!Dirname) {
					report([{ msg: "No such file or directory", className: "jquery-console-message-error" }])
				} else {
					ls()
					edit();
					if ("\n" === gitstatus[PageNumber] && gitstatus[PageNumber + 1] === "Modified:[" + fileName + "]\n") {
						up_Bar()
						cat();
						edit_file();
						report([{ msg: "=> Success", className: "jquery-console-message-value" }]);
					} else if (lsMessage === "") {
						report([{ msg: "No such file or directory", className: "jquery-console-message-error" }]);
					} else {
						cat();
						edit_file();
						report();
					}
				}
			} else if (input.match(/^edit /)) {
				report([{ msg: "usage:edit", className: "jquery-console-message-type" }]);
			} else {
				report([{
					msg: "command can not be used\nType `help` to see what all commands are available",
					className: "jquery-console-message-error"
				}]);
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
	}, 700);
	ip = undefined;

}

$(document).ready(function () {
	var console1 = $('<div class="console1">');
	var error = false
	var number = document.getElementById("number");
	$('#console').append(console1);
	var comment1 = $('<div id="message">');
	$('.comment').append(comment1);
	var message = document.getElementById("message");
	pid = 1;
	select_tuto();
	var controller1 = console1.console({
		promptLabel: '$ ',
		commandValidate: function (line) {
			if (line == "") return false;
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
