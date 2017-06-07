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
	       },1000);
        },
        autofocus:true,
        animateScroll:true,
        promptHistory:true,
    });
});