// First we create a listener for the form.
document.getElementById('bookmarksForm').addEventListener('submit', saveNewBookmark);

// Next we create the function saveNewBookmark.
function saveNewBookmark(e){
  // Next we create the variables to get the form values.
  var websiteName = document.getElementById('websiteName').value;
  var websiteUrl = document.getElementById('websiteUrl').value;

  if(!formValidation(websiteName, websiteUrl)){
    return false;
  }

  var enteredBookmark = {
    name: websiteName,
    url:  websiteUrl
  }

  // Here we test if bookmarks is null.
  if(localStorage.getItem('bookmarks') === null){
    // Initialize the array.
    var bookmarks =[];
    // We add to the array.
    bookmarks.push(enteredBookmark);
    // Then we set it to LocalStorage.
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    // Here we get the bookmarks from localStorage.
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Next we add the bookmark to the array.
    bookmarks.push(enteredBookmark);
    // Then we set it back to localStorage.
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  // Clear form
  document.getElementById('bookmarksForm').reset();

  getNewBookmark();

  // Prevent form submition.
  e.preventDefault();
}

// deleteBookmark function.
function deleteBookmark(url){
  // Here we get the bookmarks back from localStorage.
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Then we loop through the bookmarks.
  for(var i = 0; i < bookmarks.length; i++){
    if(bookmarks[i].url == url){
      // Delete from array.
      bookmarks.splice(i, 1);
    }
  }
  // Then we set it back to localStorage.
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  getNewBookmark();
}

// Next we create another function called getNewBookmark()
function getNewBookmark(){
  // Here we get the bookmarks back from localStorage.
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Next we get the output ID.
  var bookmarkResults = document.getElementById('bookmarkResults');

  // Next we build the output to show the bookmarks.
  bookmarkResults.innerHTML = '';

  for(var i = 0; i < bookmarks.length; i++){
    var name = bookmarks[i].name;
    var url  = bookmarks[i].url;

    bookmarkResults.innerHTML += '<div class="notification is-info">'+
                                 '<h3 class="is-size-5">'+name+
                                 ' <a onclick="deleteBookmark(\''+url+'\')" class="button is-white is-outlined is-pulled-right" href="#">DELETE</a> '+
                                 '&nbsp; <a class="button is-white is-outlined is-pulled-right" target="_blank" href="'+url+'">VISIT</a>'
                                 '</h3>'+
                                 '</div>';
  }

}

// Next we create the function formVaidation.
function formValidation(websiteName, websiteUrl){
  if(!websiteName || !websiteUrl){
    alert('Please fill in the form!');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!websiteUrl.match(regex)){
    alert('Please use a valid URL');
    return false;
  }
  return true;
}