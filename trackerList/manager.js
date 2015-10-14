// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// if (!chrome.cookies) {
//   chrome.cookies = chrome.experimental.cookies;
// }
var avClub_Count=0;
var domain_list=[]; // list of unique domains
var cookies_list=[]; // total list of cookies 
window.onload= function() {
  console.log("in manager.js");
 // whatyousay();
};
chrome.cookies.onChanged.addListener(function(info) {
//console.log("onChanged" + JSON.stringify(info));
//obj= $.parse(info);
//console.log(info.cookie.domain);

txt=info.cookie.domain;

cookies_list.push(txt);


chrome.extension.sendMessage("check it");

//check if the most recent cookie is a unique domain or not
if(domain_list.indexOf(cookies_list[cookies_list.length-1]) == -1)
{

  console.log("new domain added");
  domain_list.push(cookies_list[cookies_list.length-1])


}

console.log(domain_list.toString());

if(txt.indexOf("avclub") !=-1)
{
  avClub_Count++;
  //console.log("Number of AVClub Cookies: "+avClub_Count);
}

});
function whatsup()
{
  console.log("printing what's up");
  window.alert("nice");
  alert("sup");
  chrome.extension.sendMessage("check it");
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log("from the extension");
    if (request.greeting == "hello")
      sendResponse({farewell: domain_list});
  });

// var myObject = function(){
//     firstName:"John",
//     lastName: "Doe",
// function whatsup()
// {
//   console.log("printing what's up");
//   chrome.runtime.sendMessage("check it");
// }
// };
chrome.extension.onMessage.addListener(function(request, sender, sendResponse){
        if(request.msg == "reflektor") 
          {
            alert("nice");
            whatsup();
          }
    }
);


// Compares cookies for "key" (name, domain, etc.) equality, but not "value"
// equality.
function cookieMatch(c1, c2) {
  return (c1.name == c2.name) && (c1.domain == c2.domain) &&
         (c1.hostOnly == c2.hostOnly) && (c1.path == c2.path) &&
         (c1.secure == c2.secure) && (c1.httpOnly == c2.httpOnly) &&
         (c1.session == c2.session) && (c1.storeId == c2.storeId);
}

// Returns an array of sorted keys from an associative array.
function sortedKeys(array) {
  var keys = [];
  for (var i in array) {
    keys.push(i);
  }
  keys.sort();
  return keys;
}

// Shorthand for document.querySelector.
function select(selector) {
  return document.querySelector(selector);
}

// An object used for caching data about the browser's cookies, which we update
// as notifications come in.
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

  // Returns a sorted list of cookie domains that match |filter|. If |filter| is
  //  null, returns all domains.
  this.getDomains = function(filter) {
    var result = [];
    sortedKeys(this.cookies_).forEach(function(domain) {
      if (!filter || domain.indexOf(filter) != -1) {
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
var domains = cache.getDomains();

function getCookieCount()
{
console.log("inside cookie count");
//onloadcookie();
var okay;
console.log(String(domains));
domains.forEach(function(domain) {
    var cookies = cache.getCookies(domain);
    okay.add(cookies.length);
    console.log("sup");
});
return okay;
}

var reload_scheduled = false;

function listener(info) {
  cache.remove(info.cookie);
  if (!info.removed) {
    cache.add(info.cookie);
  }
 // scheduleReloadCookieTable();
}

function startListening() {
  chrome.cookies.onChanged.addListener(listener);
}

function stopListening() {
  chrome.cookies.onChanged.removeListener(listener);
}

function whatyousay()
{
  //chrome.extension.getBackgroundPage().console.log('foo');
  console.log("whatyousay");
  console.log(String(onload()));
}

function onloadcookie() {
  // focusFilter();
  // var timer = new Timer();
  startListening();
  console.log("inside onload");
  var text;
  chrome.cookies.getAll({}, function(cookies) {
    // startListening();
    // start = new Date();
    console.log(String(cookies.name));
    for (var i in cookies) {
      cache.add(cookies[i]);
      //text[i]=cookies[i].name;
      //text.add(cookies[i].length);
    }
    // timer.reset();
    // reloadCookieTable();
    getCookieCount();
  });
  return text;
}
document.addEventListener('DOMContentLoaded', function() {
  // alert("sup");
  // window.alert("nice");
 onloadcookie();
});
