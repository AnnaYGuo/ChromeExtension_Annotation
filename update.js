document.getElementById("refresh").onclick = async () => {
    //document.body.append("refresh attempted" + document.createElement('br'));
    //savedtext.append("refresh attempted");
        document.body.append(document.createElement('br'));
        chrome.storage.local.get(['key'], function(result) {
        for(var ii = 0; ii < result.key.length; ii++){
            document.body.append('New highlight:    "');
            document.body.append(result.key[ii]);
            document.body.append('"');
            //alert('ooooooooooo');
        }
        
        document.body.append(document.createElement('br'));
     });
    
}
