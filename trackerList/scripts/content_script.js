
window.onload = function() {
  whatsup();
	var random = Math.random();
	onstart();
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

// Returns an array of sorted keys from an associative array.
function sortedKeys(array) {
  var keys = [];
  for (var i in array) {
    keys.push(i);
  }
  keys.sort();
  return keys;
}


//primary cookie function
function CookieCache() {
  this.cookies_ = {};

  this.reset = function() {
    this.cookies_ = {};
  }

  this.add = function(cookie) {
    var domain = cookie.domain;
    if (!this.cookies_[domain]) {
      this.cookies_[domain] = [];
    }
    this.cookies_[domain].push(cookie);
  };

  this.remove = function(cookie) {
    var domain = cookie.domain;
    if (this.cookies_[domain]) {
      var i = 0;
      while (i < this.cookies_[domain].length) {
        if (cookieMatch(this.cookies_[domain][i], cookie)) {
          this.cookies_[domain].splice(i, 1);
        } else {
          i++;
        }
      }
      if (this.cookies_[domain].length == 0) {
        delete this.cookies_[domain];
      }
    }
  };

  this.getDomains = function(filter) {
    var result = [];
    console.log("function runs");
    sortedKeys(this.cookies_).forEach(function(domain) {
      if (!filter || domain.indexOf(filter) != -1) {
        console.log("inside");
        result.push(domain);
      }
    });
    return result;
  }

  this.getCookies = function(domain) {
    return this.cookies_[domain];
  };
}

var cache = new CookieCache();

function getTrackerList() {
	console.log("inside tracker list");
  reload_scheduled = false;
  var domains = cache.getDomains(null);

  domains.forEach(function(domain) {
  var cookies = cache.getCookies(domain);
  });
}

function listener(info) {
  cache.remove(info.cookie);
  if (!info.removed) {
    cache.add(info.cookie);
  }
}

function startListening() {
  chrome.cookies.onChanged.addListener(listener);
}

function stopListening() {
  chrome.cookies.onChanged.removeListener(listener);
}


function onstart()
{
  console.log("inside onload");
 //window.alert("sup");
// getTrackerList();
// chrome.cookies.getAll();
// chrome.cookies.getAll({}, function(cookies) {
//     for (var i in cookies) {
//       //startListening();
//       cache.add(cookies[i]);
//       //window.alert(cookies[i]);
//     }
//   });
}
