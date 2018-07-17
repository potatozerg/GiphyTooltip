const app = angular.module('mainApp', ['services']);

app.controller('mainCtrl', ['$scope', 'httpCalls', '$sce', function($scope, httpCalls, $sce){

  // initialize
  $scope.show = false;
  $scope.previousSelection = '';

  // add a loading gif when loading
  angular.element(window.document)[0].addEventListener("mousedown", function(e) {
    $scope.url = $sce.trustAsResourceUrl('https://giphy.com/embed/3oEjI6SIIHBdRxXI40');
  });

  // addEventListener
  angular.element(window.document)[0].addEventListener("mouseup", function(e) {

    $scope.q = window.getSelection().toString();
    //replace all non-word character to + to search for phrase, and replace all dupulicate +
    $scope.q = $scope.q.replace(/\W/g, '+').replace(/\++/g, '+');

    let s = window.getSelection();
    let oRange = s.getRangeAt(0);
    let oRect = oRange.getBoundingClientRect();

    // determine when to show the tooltip
    if (oRect.width < 3 || $scope.q === $scope.previousSelection) {
      $scope.show = false;
    } else {
      $scope.previousSelection = $scope.q;
      httpCalls.get($scope.q)
        .then(function(res){
          if (res.data.data.length > 0) {
            $scope.url = $sce.trustAsResourceUrl(res.data.data[0].embed_url);
            $scope.show = true;
          } else {
            alert('no gif found!');
          }
        }, function(error) {
          console.log(error);
      });
    }

    let top = oRect.top - 180;
    let left = oRect.left - 100 + oRect.width/2;
    $scope.style = {'width': '200px',
                    'height': '160px',
                    'top': `${top}px`,
                    'left': `${left}px`
                    };
    $scope.$apply();
  });

  // };
}]);
