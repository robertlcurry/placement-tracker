angular.module('app').controller('editPlacementCtrl', function($scope, $location, PlacementData, $routeParams, $route, $filter, notifier, editingPlacement) {
  $.material.init();
    //Cancel button returns to main page
    $scope.cancelEdit = function() {
        $location.url('/');
    };

    //set the placement that was clicked on the table to the scope placement for this page
            var placement = editingPlacement.selectedPlacement;
           placement.date = $filter('dateFilter')(placement.date); //filter date from ISO to MM/DD/YY
            $scope.placement = placement;



    //save edits to placement
    $scope.updatePlacement = function(placement) {
        var placement_id = $route.current.pathParams.placementId;


        PlacementData.update({_id: placement_id}, placement, function (response) {
            $location.url('/');
            notifier.notify('success','Placement updated!');

        }, function (error) {

            console.log(error);
            notifier.notify('error','Something went wrong!');


        });

    };

});

