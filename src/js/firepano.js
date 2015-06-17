var spinner = new Spinner({
    color: '#ddd'
});
var firebaseRef = 'https://brilliant-fire-2797.firebaseio.com';

function handleFileSelect(evt) {
  var f = evt.target.files[0];
  var reader = new FileReader();
  reader.onload = (function(theFile) {
    return function(e) {
      var filePayload = e.target.result;
      // Generate a location that can't be guessed using the file's contents and a random number
      var hash = CryptoJS.SHA256(Math.random() + CryptoJS.SHA256(filePayload));
      var f = new Firebase(firebaseRef + 'pano/' + hash + '/filePayload');
      // Retrieve new posts as they are added to our database
      spinner.spin(document.getElementById('spin'));
      // Set the file payload to Firebase and register an onComplete handler to stop the spinner and show the preview
      f.set(filePayload, function() {
        console.log("File with hash: " + firebaseRef + 'pano/' + hash + '/filePayload created');
      });
    };
  })(f);
  reader.readAsDataURL(f);
}