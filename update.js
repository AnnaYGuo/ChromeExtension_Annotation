document.getElementById("refresh").onclick = async () => {
        //document.body.append("refresh attempted" + document.createElement('br'));
    //savedtext.append("refresh attempted");
    document.body.append(document.createElement('br'));
    chrome.storage.local.get(['key'], function(result) {
        for(var ii = 0; ii < result.key.length; ii++){
            savedtext.append(result.key[ii]);
            savedtext.append(document.createElement('br'));
        }
     });
}
