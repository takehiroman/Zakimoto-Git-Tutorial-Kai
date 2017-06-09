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
			console.log("SUCCESS: ", data);
			display(data);
	}});
}

$(document).ready(function(){
    var consoleCancelFlag = false;
    var console1 = $('<div class="console1">');
    $('#console').append(console1);
    var controller1 = console1.console({
        promptLabel: '$ ',
        commandValidate:function(line){
            if (line == "") return false;
            else return true;
        },
        commandHandle:function(line,report){
               setTimeout(function() {
		   if(!consoleCancelFlag)
		       report([{msg:line,className:"jquery-console-message-type"}]);
		   else {
		       report([{msg:"User interrupt",
				className:"jquery-console-message-error"}]);
		       console3CancelFlag = false;
		   }
	       },100);
           data_input(line,report);
        },
        autofocus:true,
        animateScroll:true,
        promptHistory:true,
    });
});