angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http,$ionicPopup) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  
  // ----receive function----v
    function getHttpComuni(url, callback) {
        $http.get(url)
        .then(function(response) {
            parser = new DOMParser();
            xmlDoc = parser.parseFromString(response.data, "text/xml");

            var jsonComune = [];
            for(var i=0; i< xmlDoc.getElementsByTagName("option").length; i++){
                var com = xmlDoc.getElementsByTagName("option")[i].childNodes[0].nodeValue ;
                jsonComune.push({ value: com.split('(')['0'] , displayName : com });
            }
            $scope.operators = jsonComune;

        });
    }

             // -----------the url---v         ------------the callback---v
    function getHttpCF(url, callback) {
        $http.get(url)
        .then(function(response) {
            
            parser = new DOMParser();
            xmlDoc = parser.parseFromString(response.data, "text/xml");
            
            
            console.log('getHttpCF', xmlDoc.getElementsByTagName("string")[0].childNodes[0].nodeValue);

            
            
            $scope.showAlert = function() {
	
                var alertPopup = $ionicPopup.alert({
                   title: 'Codice Fiscale',
                   template: xmlDoc.getElementsByTagName("string")[0].childNodes[0].nodeValue
                });

                alertPopup.then(function(res) {
                   // Custom functionality....
                });
             };

            
            
        });
    }

  // Form data for the login modal
  $scope.loginData = {};
  $scope.dataForm = {};
  $scope.CF = 'aaa';
  $scope.sesso = [{value: 'F',displayName:'Femmina'},{value: 'M',displayName:'Maschio'}];
  $scope.dataForm.listComuni ={operator: ''};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
  
  
  $scope.getComuni = function() {
    var mydata = getHttpComuni("http://www.codicefiscale.com/loadComuni.php?mask="+$scope.dataForm.comune, function (resp) {
//        console.log(resp);
    });
  };
  
  
  $scope.calcCF = function() {
      
      var req = 'Nome='+$scope.dataForm.nome+'&Cognome='+$scope.dataForm.cognome+'&ComuneNascita='+$scope.dataForm.listComuni+'&DataNascita='+$scope.dataForm.nascita+'&Sesso='+$scope.dataForm.sesso;
      
     var mydata = getHttpCF("http://webservices.dotnethell.it/codicefiscale.asmx/CalcolaCodiceFiscale?"+req, function (resp) {
//        console.log(resp);
        });

  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
