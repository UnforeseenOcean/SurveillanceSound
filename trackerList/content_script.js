var cookies=[];
var domains=[];
var weights=[];
var largest=0;

var cookieNum = 10;
var count = 0;
window.onload = function() {
	var random = Math.random();

	//check to retrieve domains
	chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
		// console.log(response.farewell);
		// console.log(response.farewell.length);
		// console.log(response.nope);
		cookies=response.farewell.toString().split(",");
		domains=response.nope;
		// for(var i; i<response.farewell.length;i++)
		// {
		// cookies.push(response.farewell[i]);
		// }
		for(var i=0;i<cookies.length;i++) {
			var temp=cookies[i];
			if(temp>largest)
				largest=temp;
		}

		for(var i = 0;i<cookies.length;i++) {
			weights.push(cookies[i]/largest);
		}

		console.log(weights);
	});

	

var currentChord = (function(){

		var chordOne = {
			notes : ["G#5", "B5", "D#5"],
			next : []
		};	

		var chordTwo = {
			notes : ["B5", "D#5", "F#5"],
			next : []
		};

		var chordThree = {
			notes : ["C#5", "F5", "G#5"],
			next : []
		};

		var chordFour = {
			notes : ["D#5", "F#5", "A#5"],
			next : []
		};

		chordOne.next = [chordTwo, chordThree];
		chordTwo.next = [chordThree, chordFour];
		chordThree.next = [chordOne, chordFour];
		chordFour.next = [chordOne, chordThree];

		return chordOne;
	}());

	//this variable controls the volume of the delay depending on cookies per page
	var cookieThreshold = 20;

	var delay = new Tone.FeedbackDelay("4t", 0.5).toMaster();
	var dryWet = cookieNum/cookieThreshold;
	if(dryWet > 1){
		dryWet = 1;
	}
	delay.wet.value = dryWet;

	var bell1 = new Tone.FMBell().chain(delay, Tone.Master);
	var bell2 = new Tone.FMBell().chain(delay, Tone.Master);
	var bell3 = new Tone.FMBell().chain(delay, Tone.Master);

	Tone.Transport.setInterval(function(time){
		bell1.triggerAttackRelease(currentChord.notes[0], "4n", time);
		bell2.triggerAttackRelease(currentChord.notes[1], "4n", time + Tone.Transport.toSeconds("8n"));
		bell3.triggerAttackRelease(currentChord.notes[2], "4n", time + Tone.Transport.toSeconds("4n"))
		nextState();
		count ++;

		if(count > cookieNum) {
			Tone.Transport.stop();
		}

	}, "1m");
  
  Tone.Transport.bpm.value = 120;
  Tone.Transport.start();

	function nextState(){
		for(var i = 0;i<weights.length;i++) {
			if (Math.random() > 0.5){
				currentChord = currentChord.next[0];
			} else {
				currentChord = currentChord.next[1];
			}
		}
	}

	

 //  if(random < 0.5){
	// 	var reverb = new Tone.Freeverb().toMaster();
	// 	var glass = new Tone.FMGlass().connect(reverb);

	// 	glass.triggerAttackRelease("A4", "4m");
	// 	glass.triggerAttackRelease("C2", "4m", "+4m");
	// 	glass.triggerAttackRelease("A1", "4m", "+8m");
	// 	glass.triggerAttackRelease("E3", "4m", "+12m");
	// 	glass.triggerAttackRelease("A1", "4m", "+16m");
	// } else {
	// 	var bell = new Tone.FMBell().toMaster();

	// 	bell.modulationIndex.setValueCurveAtTime("0", 1,"4n");
	// 	bell.triggerAttackRelease("A4", "1m");

	// 	bell.modulationIndex.setValueAtTime(10, "+4n");
	// 	bell.modulationIndex.setValueCurveAtTime("+4n", 1,"4n");
	// 	bell.triggerAttackRelease("C5", "1m", "+4n");

	// 	bell.modulationIndex.setValueAtTime(10, "+2n");
	// 	bell.modulationIndex.setValueCurveAtTime("+2n", 1,"4n");
	// 	bell.triggerAttackRelease("G5", "1m", "+2n");
	// }
};

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

window.addEventListener("DOMContentLoaded", function() {
  console.log("dom");
 // chrome.tabs.executeScript(null, {file:"manager.js"});
 	chrome.extension.sendMessage("reflektor");
});
