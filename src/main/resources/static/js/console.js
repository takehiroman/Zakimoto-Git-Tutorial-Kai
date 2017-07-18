var PageNumber = 0;
var ip;

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
}

function init_repo(){
	var hostUrl = 'init';
	var article1 = new Object();
	article1.repositoryId = ip;

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

function onHandle(line,report){
		var $pb = $('.progress-bar');
	    var input = $.trim(line);
		input = input.replace(/ +/g," ");

		   if(PageNumber == 0 && input == 'git init'){
		       report([{msg:"=> Success",className:"jquery-console-message-value"}]);
			   getIp();
			   PageNumber++;
			   nextMessage();
			   $pb.attr({'style':'width:13%;','class':'progress-bar'}).html(" 13% ");
		   }else if(PageNumber == 1 && input == 'git add README.md'){
		       report([{msg:"=> Success",className:"jquery-console-message-value"}]);
			   PageNumber++;
			   nextMessage();
			   $pb.attr({'style':'width:26%;','class':'progress-bar'}).html(" 26% ");
		   }else if(PageNumber == 2){
			   if(input.match(/^git commit -m ".*"$/)  ){
		       report([{msg:"=> Success",className:"jquery-console-message-value"}]);
			   PageNumber++;
			   nextMessage();
			   progress(PageNumber);
			   $pb.attr({'style':'width:39%;','class':'progress-bar'}).html(" 39% ");
			   }
		   }else if(PageNumber == 3 && input == 'git add README.md'){
		       report([{msg:"=> Success",className:"jquery-console-message-value"}]);
			   PageNumber++;
				nextMessage();
			   $pb.attr({'style':'width:52%;','class':'progress-bar'}).html(" 52% ");
		   }else if(PageNumber == 4){
			   if(input.match(/^git commit -m ".*"$/)){
		       report([{msg:"=> Success",className:"jquery-console-message-value"}]);
			   PageNumber++;
				nextMessage();
			   $pb.attr({'style':'width:65%;','class':'progress-bar'}).html(" 65% ");
			   }
		   }else if(PageNumber == 5 && input == 'git add README.md'){
		       report([{msg:"=> Success",className:"jquery-console-message-value"}]);
			   PageNumber++;
				nextMessage();
			   $pb.attr({'style':'width:78%;','class':'progress-bar'}).html(" 78% ");
		   }else if(PageNumber == 6){
			   if(input.match(/^git commit -m ".*"$/)){
		       report([{msg:"=> Success",className:"jquery-console-message-value"}]);
			   PageNumber++;
				nextMessage();
			   $pb.attr({'style':'width:91%;','class':'progress-bar'}).html(" 91% ");
			   }
		   }
		   
		   else {
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