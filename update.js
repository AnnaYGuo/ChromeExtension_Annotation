document.getElementById("refresh").onclick = async () => {
        //document.body.append("refresh attempted" + document.createElement('br'));
    document.body.append("refresh attempted");
    document.body.append(document.createElement('br'));
    chrome.storage.local.get(['key'], function(result) {
        document.body.append(result.key);
     });
}
