$(document).ready(function(){
    var console1 = $('<div class="console1">');
    $('#console').append(console1);
    var controller1 = console1.console({
        promptLabel: 'Demo> ',
        commandValidate:function(line){
            if (line == "") return false;
            else return true;
        },
        commandHandle:function(line,report){
               setTimeout(function() {
		   if(!console3CancelFlag)
		       report(line);
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
        charInsertTrigger:function(keycode,line){

            return !line.match(/[a-z]+/) && keycode != '0'.charCodeAt(0);
        }
    });
});