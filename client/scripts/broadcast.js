window.onload = function() {
  var sessionId = document.getElementById('sessionId').innerHtml;
  var token = document.getElementById('token').innerHtml;
  var key = document.getElementById('key').innerHtml;
  var secret = document.getElementById('secret').innerHtml;

  console.log(sessionId, token, key, secret);
}