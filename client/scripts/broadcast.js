var module;


window.onload = function() {
  var broadcastId = window.location.pathname;
  broadcastId = broadcastId.substr(1);
  var request = new XMLHttpRequest();
  var url = '/get-broadcast/' + broadcastId;
  request.open('GET', url, true);
  request.send(null);
  request.onreadystatechange = onReady;

  function onReady() {
    if (request.readyState === 4 && request.status === 200) {
      var broadcast = JSON.parse(request.response);
      console.log(broadcast);
      if (!broadcast.isRunning) {
        module.startBroadcast(broadcast);
      } else {
        module.joinBroadcast(broadcast);
      }
    }
  }
}

module = {
  startBroadcast: function(broadcast) {
    var broadcastContainer = document.getElementById('broadcast-container');
    var opts = {
      Animator: {
        duration: 500,
        easing: 'swing'
      },
      bigFixedRatio: false
    };
    var layout = TB.initLayoutContainer(broadcastContainer, opts).layout;

    var resizeTimeout;
    window.onresize = function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function() {
        layout();
      }, 20);
    };

    var session = OT.initSession(broadcast.key, broadcast.sessionId);
    session.connect(broadcast.token, function(err) {
      if (err) {
        console.error('error connecting: ', err.code, err.message);
      } else {
        var pubProps = {
          resolution: '1280x720'
        };
        var pubElem = document.createElement('div');
        var publisher = OT.initPublisher(pubElem, pubProps, function(err) {
          if (err) console.error(err);
          session.publish(publisher);
          broadcastContainer.appendChild(pubElem);
          layout();
        });
      }
    });
  },
  joinBroadcast: function(broadcast) {

  }
}
