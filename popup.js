// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
var list = new Array();
var count;

function click(e) {
  chrome.tabs.executeScript(null,
      {code:"document.body.style.backgroundColor='" + e.target.id + "'"});
  window.close();
}

let highlight = document.getElementById('highlight');
highlight.onclick = function(element){
    highlight.style.background = '#FFFF00'
}

document.addEventListener('DOMContentLoaded', function () {
  var divs = document.querySelectorAll('div');
  for (var i = 0; i < divs.length; i++) {
    divs[i].addEventListener('click', click);
  }
});

//code not from the Chromium Authors
document.getElementById("save-btn").onclick = async () => {
  const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
  let result;
  try {
    [{result}] = await chrome.scripting.executeScript({
      target: {tabId: tab.id},
      function: () => getSelection().toString(),
    });
  } 
  catch (e) {
    return; 
   }


   chrome.storage.local.get(['index'], function(num) {
     count = num.index;
  });
  
  if(Number.isInteger(count) == false){
        count = 0;
  }
  else{
     chrome.storage.local.get({key: []}, function(total) {
        list = total.key;
        count = list.length;
        //document.body.append("test");
      });
  }
       //document.body.append(", list length:" + count);//printf, 0 or previous num   
       //document.body.append(", result:   " + result); //printf, result
  list[count]=result;
  chrome.storage.local.set({key: list}, function() {
  
      //document.body.append(", precount   " + count);//printf, 0 or previous num
      chrome.storage.local.get(["key"], function(total) {
         list = total.key;
         //document.body.append(", check:" + list[count] + ",");
      });
  });
  
  chrome.storage.local.set({index: count + 1}, function() {
    //document.body.append('Index is set to ' + count);
    document.body.append("stored");
  });
  
    //document.body.append(", postcount   " + count + ";");//printf whole number
    document.body.append(document.createElement('br'));

};
