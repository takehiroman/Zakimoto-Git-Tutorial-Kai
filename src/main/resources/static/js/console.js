var PageNumber = 0;

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

function init_repo(line,report){
	var hostUrl = 'init';

	$.ajax({
		type:"POST",
		url:hostUrl,
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

function onHandle(line,report){
	    var input = $.trim(line);
		input = input.replace(/ +/g," ");

		   if(PageNumber == 0 && input == 'git init'){
		       report([{msg:"=> Success",className:"jquery-console-message-value"},
			  		   {msg:comment1,className:"jquery-console-message-type"}]);
			   init_repo(line,report);
			   PageNumber++;
			   
		   }else if(PageNumber == 1 && input == 'git add README.md'){
		       report([{msg:"=> Success",className:"jquery-console-message-value"},
			   		   {msg:comment2,className:"jquery-console-message-type"}]);
			   PageNumber++;
		   }else if(PageNumber == 2){
			   if(input.match(/^git commit -m ".*"$/)  ){
		       report([{msg:"=> Success",className:"jquery-console-message-value"},
			   		   {msg:comment3,className:"jquery-console-message-type"}]);
			   PageNumber++;
			   }
		   }else if(PageNumber == 3 && input == 'git add README.md'){
		       report([{msg:"=> Success",className:"jquery-console-message-value"},
			   		   {msg:comment4,className:"jquery-console-message-type"}]);
			   PageNumber++;
		   }else if(PageNumber == 4){
			   if(input.match(/^git commit -m ".*"$/)){
		       report([{msg:"=> Success",className:"jquery-console-message-value"},
			   		   {msg:comment5,className:"jquery-console-message-type"}]);
			   PageNumber++;
			   }
		   }else if(PageNumber == 5 && input == 'git add README.md'){
		       report([{msg:"=> Success",className:"jquery-console-message-value"},
			   		   {msg:comment6,className:"jquery-console-message-type"}]);
			   PageNumber++;
		   }else if(PageNumber == 6){
			   if(input.match(/^git commit -m ".*"$/)){
		       report([{msg:"=> Success",className:"jquery-console-message-value"},
			   		   {msg:comment7,className:"jquery-console-message-type"}]);
			   PageNumber++;
			   }
		   }
		   
		   else {
		       report([{msg:"User interrupt",
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
		welcomeMessage:'ZGT-Kaiにようこそ！これから初めてのgitを学んでいきましょう！\nではまずバージョン管理に必要なリポジトリを作りましょう！'
    });
});