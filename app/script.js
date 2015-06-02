angular.module('appMaps', ['uiGmapgoogle-maps'])
  .controller('mainCtrl', function($scope,$http) {
    $scope.map = {
      center: {
        latitude: 43.789581,
        longitude:  -79.337173
      },
      zoom: 12,
      bounds: {}
    };
    $scope.options = {
      scrollwheel: false
    };
    $scope.cm_data = [];
    
    var markers = [];

    $http.get('data/sorted_locations.json').
      success(function(data, status, headers, config) {
        $scope.cm_data = data;
        
        _.forEach(data, function(point, key) {
          // console.log(point, key);
          point.latitude    = point.loc_la;
          point.longitude   = point.loc_lo;
          point.id          = key
          point.show        = false;
          point.title       = point.times + 'times';
         
          if (point.times > 100) {
            point.icon        = 'red.png'
          } else if(point.times > 50){
             point.icon        = 'purple.png'
          }else if(point.times > 20){
             point.icon        = 'orange.png'
          }else if(point.times > 10){
             point.icon        = 'yellow.png'
          }else if(point.times > 5){
             point.icon        = 'blue.png'
          }else{
            point.icon          = 'green.png'
          };
          point.onClick = function() {
                // console.log("Clicked!");
                point.show = !point.show;

                // console.log(point.title)
            };
          // console.log(point)
          // if (point.times > 50) {
             markers.push(point)
          // };
         
        });
        
       
        // $scope.cm_data[0].id = 0;

       
        // $scope.cm_data[0].latitude = $scope.cm_data[0].loc_la;
        // $scope.cm_data[0].longitude = $scope.cm_data[0].loc_lo;
        
        // $scope.cm_data[9].id = 9;
        // $scope.cm_data[9].latitude = $scope.cm_data[9].loc_la;
        // $scope.cm_data[9].longitude = $scope.cm_data[9].loc_lo;
        
        //   console.log($scope.cm_data[0])
        //     console.log($scope.cm_data[9])
        // markers.push($scope.cm_data[0])
        
        // markers.push($scope.cm_data[9])
        
        $scope.cm_Markers = markers;
        // $scope.save_data();
      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
        $scope.save_data = function() {
            $http.post('data/books.json', $scope.cm_Markers).success(function(){
                        $scope.msg = 'Data saved';
                    }).error(function(data) {
                        alert("failure message:" + JSON.stringify({data:data}));
                    });
        };
      

    



});