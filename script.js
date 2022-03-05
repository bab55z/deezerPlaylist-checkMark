/*
* This script allows us to mark some songs as checked on a Deezer playlist
* Deezer only offers you to select 'All', 'None' or 'manualy' (select each song manually)
* This can be cumbersome in some situations, for example when you have a huge list thousands of songs
* and you wat to split them into smaller parts
* Usage
*  1 - Open your Deezer playlist page
*  2 - Open Google chrome or your brower developer tools window and go to console
*  3 - Copy and paste the following script
*  4 - Run it a few times to mark desired songs as checked 
*  5 - Scroll back to top and select 'add to playlist' and select or create a new playlist
*  Notice: do not forget to set the startAtId and endAtId to delimit the portion of your playlist you want to markn
*          brefore running the script, sheers!!
*/

var musicCount = 859;
var startAtId = 1; // starting song row id, always 1
var endAtId = 300; // this allows us to limit the number of songs we want to mark as checked 
                   //(also corresponds to the last song rowId allowed to be processed by the script)
                   //any song with row id > endAtId wil not be marked as checked

var processed = 0;
var lastProcessedId =0;
var processedList = [];

var items = document.querySelector('div.YrLz6').getElementsByClassName('JoTQr')

for (var i = 0; i < (items.length - 1); i++) {
    var row = items[i];
    var rowId = row.getAttribute("aria-rowindex"); // row id of the current song in the list, this is unique
    var checkboxContainer = row.querySelector(".input-checkbox");
    var checkboxContainerChecked = checkboxContainer.classList.contains("is-checked");

    //generate the click event
    var evObj = document.createEvent('MouseEvent');
    evObj.initMouseEvent("click", true, true, window, 0,0, 0, 0, 0,false, false, false, false,  0, null);

    //check the current song
    if (!checkboxContainerChecked && rowId >= startAtId && rowId <= endAtId) {
        console.log("id not yet checked processing")
        checkboxContainer.dispatchEvent(evObj);
        processedList.push(rowId);
        lastProcessedId = rowId;
        processed++;
    }

    // when we finished processing the current batch we scroll the page a bit so we can trigger 
    // Deezer ajax to load following songs in the list and run the script again to mark them as checked
    if (i == (items.length - 2)) {
        console.log("end reached, scrolling")
        window.scrollBy(0, 1000);
    }

}
console.log({"processed": processed, "lastProcessedId": lastProcessedId, "processedList": processedList})
