var PageNumber = 0;
var ip;
var Dirname;
var diffMessage;
var statusMessage;
//ログを保存する
function data_input(line,report){
	var hostUrl = 'store';
	var article = new Object();
	article.number = $('#number').val();
	article.command = $.trim(line);
	
	$.ajax({
		type:"POST",
		url:hostUrl,
		data:JSON.stringify(article),
		contentType:'application/json',
		dataType:'json',
		success:function(data){
	        console.log(data);
		},
		error:function(xhr, text, err) {
	          console.log('text: ', text);
	          console.log('xhr: ',xhr);
	     }
	})
}

//チュートリアルメッセージを置換する
function nextMessage(){
	var message = document.getElementById("message");
	console.log(message);
	message.textContent = comments[PageNumber-1];
}

//ipアドレスを取得する
function getIp(){
		$.ajaxSetup({async: false});
		$.getJSON("http://ip-api.com/json/?callback=?", function(data) {
			ip = data.query;
			console.log(ip);
			init_repo();
		});
		add_filelist();
}

function add_filelist(){
	$(".folder").append('<p><img src="./image/computer_folder.png" width="20" height="20" th:src="@{/image/computer_folder.png}"></img>.git</p>')
}

function edit_file(){
	$(".preview").text("file changed")
}

function file_delete(){
	$(".file").empty();
	$(".filename").remove();
	$(".preview").empty();
}

function init_repo(){
	var hostUrl = 'init';
	var article1 = new Object();
	Dirname = $.now();
	article1.repositoryId = ip;
	article1.repositoryDir = Dirname;
	var loc = window.location.pathname;
	var dirname = loc.substring(0,loc.lastIndexOf("\\")+1);
	console.log(dirname);

	$.ajax({
		type:"POST",
		url:hostUrl,
		contentType:'application/json',
		dataType:'json',
		data:JSON.stringify(article1),
		success:function(data){
	        console.log(data);
		},
		error:function(xhr, text, err) {
	          console.log('text: ', text);
	          console.log('xhr: ',xhr);
	     }
	})
}

function add_repo(){
	var hostUrl = Dirname+'/add'
	var article2 = new Object();
	article2.repositoryDir = Dirname;

	$.ajax({
		type:"PUT",
		url:hostUrl,
		contentType:'application/json',
		dataType:'json',
		data:JSON.stringify(article2),
		success:function(data){
	        console.log(data);
		},
		error:function(xhr, text, err) {
	          console.log('text: ', text);
	          console.log('xhr: ',xhr);
	     }
	})
}

function diff_repo(){
	var hostUrl = Dirname+'/diff'
	var article3 = new Object();
	article3.repositoryDir = Dirname;

	$.ajax({
		type:"POST",
		url:hostUrl,
		contentType:'application/json',
		dataType:'json',
		data:JSON.stringify(article3),
		success:function(data){
			console.log(data.diffMessage);
			diffMessage = data.diffMessage;
			console.log(diffMessage);
			
		},
		error:function(xhr, text, err) {
	          console.log('text: ', text);
	          console.log('xhr: ',xhr);
	     }
	})
}

function status_repo(){
	var hostUrl = Dirname+'/status'
	var article4 = new Object();
	article4.repositoryDir = Dirname;

	$.ajax({
		type:"POST",
		url:hostUrl,
		contentType:'application/json',
		dataType:'json',
		data:JSON.stringify(article4),
		success:function(data){
			console.log(data.statusMessage);
			statusMessage = data.statusMessage;
			console.log(statusMessage);
		},
		error:function(xhr, text, err) {
	          console.log('text: ', text);
	          console.log('xhr: ',xhr);
	     }
	})
}


function commit_repo(line){
	var hostUrl = 'commit'
	var article5 = new Object();
	var a = line.match(/".*"$/);
	console.log(a);
	article5.repositoryDir = Dirname;
	article5.number = PageNumber;
	article5.commitMessage = a[0];

	$.ajax({
		type:"POST",
		url:hostUrl,
		contentType:'application/json',
		dataType:'json',
		data:JSON.stringify(article5),
		success:function(data){
	        console.log(data);
		},
		error:function(xhr, text, err) {
	          console.log('text: ', text);
	          console.log('xhr: ',xhr);
	     }
	})
}

function onHandle(line,report){
		var $pb = $('.progress-bar');
		var input = $.trim(line);
		var message = new RegExp(/^git commit -m ".*"$/);
		input = input.replace(/ +/g," ");
		console.log(PageNumber);


		   if(PageNumber == 0 && input == 'git init'){
			   getIp();
			   setTimeout(function(){ 
		       report([{msg:"=> Success",className:"jquery-console-message-value"}]);
			   PageNumber++;
			   nextMessage();
			   $pb.attr({'style':'width:13%;','class':'progress-bar'}).html(" 13% ");
			   },3500);
			}else if(input == 'git diff'){
				diff_repo();
				report([{msg:diffMessage,
				className:"jquery-console-message-type"}]);
		   		
		   }
		   else if(input == 'git status'){
			   status_repo();
			   report([{msg:statusMessage,
			   className:"jquery-console-message-value"}]);
		   }else if(PageNumber == 1 && input == 'git add README.md'){
		       report([{msg:"=> Success",className:"jquery-console-message-value"}]);
			   PageNumber++;
			   add_repo();
			   nextMessage();
			   $pb.attr({'style':'width:26%;','class':'progress-bar'}).html(" 26% ");
		   }else if(PageNumber == 2 && input.match(/^git commit -m ".*"$/)){
			   if(input.match(message)  ){
		       report([{msg:"=> Success",className:"jquery-console-message-value"}]);
			   PageNumber++;
			   commit_repo(line);
			   nextMessage();
			   edit_file();
			   $pb.attr({'style':'width:39%;','class':'progress-bar'}).html(" 39% ");
			   }
		   }else if(PageNumber == 3 && input == 'git add README.md'){
		       report([{msg:"=> Success",className:"jquery-console-message-value"}]);
			   PageNumber++;
			   add_repo();
			   nextMessage();
			   $pb.attr({'style':'width:52%;','class':'progress-bar'}).html(" 52% ");
		   }else if(PageNumber == 4 && input.match(/^git commit -m ".*"$/)){
		       report([{msg:"=> Success",className:"jquery-console-message-value"}]);
			   PageNumber++;
			   commit_repo(line);
			   nextMessage();
			   file_delete();
			   $pb.attr({'style':'width:65%;','class':'progress-bar'}).html(" 65% ");
		   }else if(PageNumber == 5 && input == 'git add README.md'){
		       report([{msg:"=> Success",className:"jquery-console-message-value"}]);
			   PageNumber++;
			   add_repo();
			   nextMessage();
			   $pb.attr({'style':'width:78%;','class':'progress-bar'}).html(" 78% ");
		   }else if(PageNumber == 6){
			   if(input.match(/^git commit -m ".*"$/)){
		       report([{msg:"=> Success",className:"jquery-console-message-value"}]);
			   PageNumber++;
			   commit_repo(line);
			   nextMessage();
			   $pb.attr({'style':'width:91%;','class':'progress-bar'}).html(" 91% ");
			   }
		   }else if(input == 'git -help' || input == 'git -h'){
				report([{msg:"git init - リポジトリ作成\n git add FILENAME - インデックスへの追加\n git commit -m 'message' - リポジトリに変更を登録\n git status - リポジトリの状態を確認\n git diff - リポジトリの差分を確認",
              className:"jquery-console-message-type"}])
			}else {
		       report([{msg:"コマンドが見つかりません",
				className:"jquery-console-message-error"}]);
		       console3CancelFlag = false;
		   }
}

$(document).ready(function(){
    var console1 = $('<div class="console1">');
    $('#console').append(console1);
    var controller1 = console1.console({
        promptLabel: '$ ',
        commandValidate:function(line){
            if (line == "") return false;
            else return true;
        },
        commandHandle:function(line,report){
           onHandle(line,report);
		   data_input(line,report);
        },
        autofocus:true,
        animateScroll:true,
        promptHistory:true,
    });
});