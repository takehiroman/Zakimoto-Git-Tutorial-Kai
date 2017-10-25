var PageNumber = 0;
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

function story_get(){
	$.getJSON("js/story1.json", function(json) {
		console.log(json.story.length)
		for(var i = 0;i < json.story.length;i++){
			var number = json.story[i].number
			console.log(number)
			var text = json.story[i].comment
			console.log(text)
		}
	});
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
		story_get();		
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
			statusMessage = data.statusMessage;
			gHogeNum.setNum(statusMessage);
			console.log('statusMessage:'+statusMessage)
			
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
			statusMessage = data.statusMessage;
			gHogeNum.setNum(statusMessage);
			console.log('statusMessage:'+statusMessage)
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
			console.log(data)
			console.log(data.statusMessage);
			statusMessage = data.statusMessage;
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
			statusMessage = data.statusMessage;
			gHogeNum.setNum(statusMessage);
			console.log('statusMessage:'+statusMessage)
		},
		error:function(xhr, text, err) {
	          console.log('text: ', text);
	          console.log('xhr: ',xhr);
	     }
	})
}

function edit(){
	var hostUrl = Dirname+'/edit'
	var article6 = new Object();
	article6.repositoryDir = Dirname;

	$.ajax({
		type:"POST",
		url:hostUrl,
		contentType:'application/json',
		dataType:'json',
		data:JSON.stringify(article6),
		success:function(data){
			console.log(data);
			statusMessage = data.statusMessage;
			gHogeNum.setNum(statusMessage);
			console.log('statusMessage:'+statusMessage)
		},
		error:function(xhr, text, err) {
	          console.log('text: ', text);
	          console.log('xhr: ',xhr);
	     }
	})
}





function cat(){
	var hostUrl = Dirname+'/cat'
	var article8 = new Object();
	article8.repositoryDir = Dirname;

	$.ajax({
		type:"POST",
		url:hostUrl,
		contentType:'application/json',
		dataType:'json',
		data:JSON.stringify(article8),
		success:function(data){
			console.log(data);
			catMessage = data.catMessage;
			
		},
		error:function(xhr, text, err) {
	          console.log('text: ', text);
	          console.log('xhr: ',xhr);
	     }
	})
}

function ls(){
	var hostUrl = Dirname+'/ls'
	var article9 = new Object();
	article9.repositoryDir = Dirname;

	$.ajax({
		type:"POST",
		url:hostUrl,
		contentType:'application/json',
		dataType:'json',
		data:JSON.stringify(article9),
		success:function(data){
			console.log(data);
			lsMessage = data.lsMessage;
		},
		error:function(xhr, text, err) {
	          console.log('text: ', text);
	          console.log('xhr: ',xhr);
	     }
	})
}

function deleted(){
	var hostUrl = Dirname+'/delete'
	var article7 = new Object();
	article7.repositoryDir = Dirname;

	$.ajax({
		type:"POST",
		url:hostUrl,
		contentType:'application/json',
		dataType:'json',
		data:JSON.stringify(article7),
		success:function(data){
			console.log(data);
			statusMessage = data.statusMessage;
			gHogeNum.setNum(statusMessage);
			console.log('statusMessage:'+statusMessage)
		},
		error:function(xhr, text, err) {
	          console.log('text: ', text);
	          console.log('xhr: ',xhr);
	     }
	})
}

function remove(){
	var hostUrl = Dirname+'/remove'
	var article10 = new Object();
	article10.repositoryDir = Dirname;

	$.ajax({
		type:"POST",
		url:hostUrl,
		contentType:'application/json',
		dataType:'json',
		data:JSON.stringify(article10),
		success:function(data){
			console.log(data);
			statusMessage = data.statusMessage;
			gHogeNum.setNum(statusMessage);
			console.log('statusMessage:'+statusMessage)
		},
		error:function(xhr, text, err) {
	          console.log('text: ', text);
	          console.log('xhr: ',xhr);
	     }
	})
}


function HogeNum() {
	sets = gitstatus;
	console.log(sets);

    this.getNum = function() {
        return gitstatus;
    };

    this.setNum = function(val) {
		console.log(sets)
		console.log(val)
        if(sets !== val){
		statusMessage = val
		doSomething(val);
		}
		
    };
}

function story_get(){
	$.getJSON("js/story1.json", function(json) {
		console.log(json.story.length)
		for(var i = 0;i < json.story.length;i++){
			var number = json.story[i].number
			var text = json.story[i].comment
		}
	});
}

function doSomething(val) {
	PageNumber++;
	//bar()
	//nextMessage()
	$.getJSON("js/story1.json", function(json) {
		console.log(json.story.length)
		var message = document.getElementById("message");
			//var number = json.story[i].number
			console.log(number)
			message.textContent = json.story[PageNumber-1].comment
		gitstatus.push(json.story[PageNumber-1].status)
		console.log('gitstatus:'+gitstatus)
		var $pb = $('.progress-bar');
		var bargage = PageNumber/json.story.length
		$pb.attr({'style':'width:'+Math.round(PageNumber/json.story.length * 100)+'%;','class':'progress-bar'}).html(" "+Math.round(PageNumber/json.story.length * 100)+"% ");
	});
	//bar()
	//nextMessage()
}

//チュートリアルメッセージを置換する
function nextMessage(){
	var message = document.getElementById("message");
	console.log(message);
	message.textContent = comments[PageNumber-1];
}

function bar(){
	var $pb = $('.progress-bar');
	barWidth = barWidth + 10
	console.log(barWidth)
	$pb.attr({'style':'width:'+barWidth+'%;','class':'progress-bar'}).html(" "+barWidth+"% ");
}

function onHandle(line,report){
		var input = $.trim(line);
		var commit = new RegExp(/^git commit -m ".*"$'/);
		console.log(commit)
		var moge = "20"
		input = input.replace(/ +/g," ");
		input = input.replace(/\'/g,"\"");
		console.log('gitstatus1:'+gitstatus)
		console.log('statusMessage:'+statusMessage)
		HogeNum();
		console.log('gitstatus2:'+gitstatus)
		console.log('statusMessage:'+statusMessage)
		console.log(PageNumber);
		console.log(input)
		console.log(statusMessage === gitstatus[PageNumber-1])



		if(input == 'git init'){
			   getIp();
			   setTimeout(function(){ 
			   console.log(gHogeNum.getNum());
			   },3500);
			   report([{msg:"=> Success",className:"jquery-console-message-value"}]);
		
		}else if(input == 'git diff'){
				diff_repo();
				report([{msg:diffMessage,
				className:"jquery-console-message-type"}]);	
		}else if(input == 'git status'){
			   status_repo();
			   report([{msg:statusMessage,
			   className:"jquery-console-message-type"}]);
		
		}else if(input == 'help'){
			   report([{msg:"help         - this help text\nls           - list files\nedit - edit the contents of the file\ncat FILENAME - print contents of a file\nrm FILENAME  - remove file\n git help    - list of git command that can be used at this terminal",className:"jquery-console-message-type"}])
		
		}else if(input == 'ls'){
			ls()
			report([{msg:lsMessage,className:"jquery-console-message-type"}]);
		
		}else if(input == 'cat README.md'){
			cat()
			report([{msg:catMessage,className:"jquery-console-message-type"}]);
			}

		//git add
		else if(input.match(/^git add README.md$/) || input.match(/^git add .$/)){   	
			if("Modified: [README.md]" === statusMessage && "Changed: [README.md]" === gitstatus[PageNumber-1]){
			   add_repo();
			   report();
		   
			}else if("Untracked: [README.md]" === statusMessage && "new file: [README.md]" === gitstatus[PageNumber-1]){
				add_repo();
				report([{msg:"=> Success",className:"jquery-console-message-value"}]);
			}else{
				report();
			}

		//git rm
		}else if(input.match(/^git rm README.md$/)){
			if("Removed:[README.md]" === gitstatus[PageNumber-1] && statusMessage === "deleted: [README.md]"){
				
			remove();
			report([{msg:"=> Success",className:"jquery-console-message-value"}]);
			}else{
				report();
			}
		   
		//rm				   
		}else if("deleted: [README.md]" === gitstatus[PageNumber-1] && statusMessage === ""){
			
			deleted();
			file_delete();
			report([{msg:"=> Success",className:"jquery-console-message-value"}]);
			
		//edit
		}else if(input.match(/^edit$/)){
			if("Modified: [README.md]" === gitstatus[PageNumber-1] && statusMessage === ""){
				edit();
				edit_file();
				report([{msg:"=> Success",className:"jquery-console-message-value"}]);
		    }else{
				report();
			}
		//git commit
		}else if(input.match(/^git commit -m ".*"$/)){
			if("" === gitstatus[PageNumber-1]){
				commit_repo(input);
				report([{msg:"=> Success",className:"jquery-console-message-value"}]);

			}else if(statusMessage === ""){
				report([{msg:"nothing to commit, working tree clean",className:"jquery-console-message-error"}]);
			}else{
				status_repo();
				report([{msg:statusMessage,className:"jquery-console-message-error"}]);
			}	
		}else if(input == 'git help' || input == 'git -h'){
				report([{msg:"git init - Create an empty Git repository\n git add FILENAME - Add file contents to the index\n git commit -m 'message' - Record changes to the repository\n git status - Show the working tree status\n git diff - Show changes between commits",
              className:"jquery-console-message-type"}])
		
		}else {
		       report([{msg:"command not found\nType `help` to see what all commands are available",
				className:"jquery-console-message-error"}]);
				console.log('gitstatus1:'+gitstatus)
				console.log('statusMessage:'+statusMessage)
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
		welcomeMessage:'Type `help` to see what all commands are available'
    });
});