(function() {
window.onload = function() {
  var p1 = {
          width: 300,
          height: 16,
          from: 0.0,
          to:   0.0,
          bar_bgc: "green",
          nd: 1,
          animation: 1
  };
   var o1 = new html5jp.progress("sample1", p1);
   o1.draw();
   document.getElementById("decr").onclick=function() {
    o1.incr(5);
  };

  };
})();
