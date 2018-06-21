//Listen for form submit
document.getElementById('siteForm').addEventListener('submit', saveBookmark);

function saveBookmark(e){
    //get form values
    var siteName = document.getElementById('siteName').value;
    
    var siteUrl = document.getElementById('siteUrl').value;
    
    if(!validateForm(siteName, siteUrl)){
        return false;
    }
    
    var bookmark = {
        name: siteName,
        url: siteUrl
    }
    
    if(localStorage.getItem('bookmarks') === null){
        //init array
        var bookmarks = [];
        //add bookmark to array
        bookmarks.push(bookmark);
        //set item to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        
    //get bookmarks from local storage
     var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // add bookmark to array
    bookmarks.push(bookmark);
    // reset back to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    
    //clears form
    document.getElementById('siteForm').reset();
    
    //Re-fetch Bookmarks
    fetchBookmark();
    
    //prevent form from submitting
    e.preventDefault();
}

//deletes bookmark
function deleteBookmark(url){
    //get bookmark from local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    
    //loop through to match bookmark
    for(var i=0; i < bookmarks.length; i++){
        if(bookmarks[i].url == url ){
            bookmarks.splice(i, 1);
        }
    }
    //reset back to local storage after deletion
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    
    //Re-fetch Bookmarks
    fetchBookmark();
}

function fetchBookmark(){
    //get bookmark from local storage
   var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    
   var bookmarkResults = document.getElementById('bookmarkResults');
    
   bookmarkResults.innerHTML = '';
   
    for(var i = 0; i < bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        
        bookmarkResults.innerHTML += 
            '<div class="card bd-light text-dark card-body">' + 
            '<h3>'+name+ 
            ' <a class="btn btn-default" target="_blank" href="'+url+' '+  
            ' ">Visit</a> ' +
            ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" ' +    'href="#">Delete</a> ' +
            '</h3>'+
            '</div>'
    }
    
}

//form validation
function validateForm(siteName, siteUrl){
    if(!siteName || !siteUrl){
        alert('Please fill in the form.');
        return false;
    }
    
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    
    if(!siteUrl.match(regex)){
        alert('Please enter a valid url.');
    }
    
    return true;
    
}







































