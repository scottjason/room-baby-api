'use strict';

angular.module('Broadcast')
  .controller('BroadcastCtrl', BroadcastCtrl);

function BroadcastCtrl($scope, $rootScope, $state, $timeout, $window, BroadcastApi, localStorageService) {

  var ctrl = this;

  var broadcastContainer = document.getElementById('broadcast-container');
  var opts = {
    Animator: {
      duration: 500,
      easing: 'swing'
    },
    bigFixedRatio: false
  };
  var layout = TB.initLayoutContainer(broadcastContainer, opts).layout;

  $window.onresize = function() {
    var resizeCams = function() {
      layout();
    }
    $timeout(resizeCams, 20);
  };



  this.initialize = function() {
    var broadcastId = $state.params.broadcast_id;
    console.log(broadcastId);
    BroadcastApi.get(broadcastId).then(function(response) {
      if (response.status === 200) {
        localStorageService.set('broadcast', response.data);
        var isPublisher = (response.data.connectCount === 1) || localStorageService.get('isPublisher');
        if (isPublisher) {
          localStorageService.set('isPublisher', true);
          ctrl.startBroadcast(response.data);
        } else {
          ctrl.joinBroadcast(response.data);
        }
      }
    }, function(err) {
      console.log(err);
    });
  };

  this.openShareDialog = function() {
    FB.ui({
      method: 'feed',
      link: $window.location.href,
      picture: 'https://raw.githubusercontent.com/scottjason/room-baby-videos-api/master/views/img/rb-embed-735-350.png',
      name: "Room Baby Broadcast",
      description: "The description who will be displayed"
    }, function(response) {
      console.log(response);
    });
  };

  this.showShareLink = function() {
    return localStorageService.get('isPublisher');
  }

  ctrl.registerEvents = function(session) {
    session.on('streamCreated', function(event) {
      var subscriberProperties = {
        insertMode: 'replace',
        width: "100%",
        height: "100%"
      };
      var subscriber = session.subscribe(event.stream,
        'broadcast-container',
        subscriberProperties,
        function(error) {
          if (error) {
            console.log(error);
          } else {
            console.log('Subscriber added.');
          }
        });
    });
  }

  ctrl.startBroadcast = function(broadcast) {
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
  };

  ctrl.joinBroadcast = function(broadcast) {
    var session = OT.initSession(broadcast.key, broadcast.sessionId);
    ctrl.registerEvents(session);
    session.connect(broadcast.token, function(err) {});
  };

  BroadcastCtrl.$inject['$scope', '$rootScope', '$state', '$timeout', '$window', 'BroadcastApi', 'localStorageService'];
}
