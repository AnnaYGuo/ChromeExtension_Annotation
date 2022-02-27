// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

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

document.addEventListener('mouseup',function(event){
    var selectedtext = window.getSelection().toString();
     
    if(selectedtext.length > 0)
        chrome.extension.sendRequest({'message':'setText','data': sel},function(response){})
})

document.getElementById("save-btn").onclick = async () => {
  const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
  let result;
  try {
    [{result}] = await chrome.scripting.executeScript({
      target: {tabId: tab.id},
      function: () => getSelection().toString(),
    });
  } catch (e) {
    return; // ignoring an unsupported page like chrome://extensions
  }
  document.body.append('Selection: ' + result);
};