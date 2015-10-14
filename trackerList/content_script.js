window.onload = function() {
	var random = Math.random();
	chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
  console.log(response.farewell);
});
  //console.log("what sayin");
  if(random < 0.5){
		var reverb = new Tone.Freeverb().toMaster();
		var glass = new Tone.FMGlass().connect(reverb);

		glass.triggerAttackRelease("A4", "4m");
		glass.triggerAttackRelease("C2", "4m", "+4m");
		glass.triggerAttackRelease("A1", "4m", "+8m");
		glass.triggerAttackRelease("E3", "4m", "+12m");
		glass.triggerAttackRelease("A1", "4m", "+16m");
	} else {
		var bell = new Tone.FMBell().toMaster();

		bell.modulationIndex.setValueCurveAtTime("0", 1,"4n");
		bell.triggerAttackRelease("A4", "1m");

		bell.modulationIndex.setValueAtTime(10, "+4n");
		bell.modulationIndex.setValueCurveAtTime("+4n", 1,"4n");
		bell.triggerAttackRelease("C5", "1m", "+4n");

		bell.modulationIndex.setValueAtTime(10, "+2n");
		bell.modulationIndex.setValueCurveAtTime("+2n", 1,"4n");
		bell.triggerAttackRelease("G5", "1m", "+2n");
	}
};
// document.ready(function(){
// 	var okay;
// var db="okay";
// chrome.tabs.executeScript(tabId, {file: 'parser.js'});
// // var myObject= Parser();
// // myObject.initial();
// 	});
chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse){
        if(request.msg == "check it") check();
    }
);

function check()
{
	console.log("nice");
	window.alert("checking");
	alert("sup");

}


window.addEventListener("load", function() {
	chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
  console.log(response.farewell);
});

});
window.addEventListener("DOMContentLoaded", function() {
  console.log("dom");
 // chrome.tabs.executeScript(null, {file:"manager.js"});
 	chrome.extension.sendMessage("reflektor");

  // onloadcookie();
  // okay=getCookieCount();
  // console.log(String(okay));
  // for (var i in okay)
  // {
  //   console.log(String(okay[i]));
  // }
  
});
