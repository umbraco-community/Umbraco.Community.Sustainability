angular.module('umbraco').controller('Umbraco.Sustainability.ContentApp.Controller',
  ['$scope', 'editorState', 'Umbraco.Sustainability.Resources.SustainabilityResource',
    function ($scope, editorState, sustainabilityResource) {

      let vm = this;

      $scope.id = "";
      $scope.key = null;
      $scope.loading = true;

      vm.buttonState = undefined;
      vm.clickButton = checkPage;

      init();

      function init() {
        $scope.id = editorState.current.id;
        $scope.key = editorState.current.key;

        sustainabilityResource.getData($scope.key).then(function (data) {
          $scope.sustainabilityData = data;
          updateResults();
        });
      }

      function checkPage() {
        vm.buttonState = "waiting";

        sustainabilityResource.checkPage($scope.key).then(function (data) {
          $scope.sustainabilityData = data;
          updateResults();

          sustainabilityResource.saveResult($scope.key, $scope.sustainabilityData);
        });
      }

      function updateResults() {
        if ($scope.sustainabilityData.resourceGroups) {
          $scope.loading = false;
          $scope.lastTested = moment($scope.sustainabilityData.lastRunDate).format(
            "MMM Do YYYY HH:mm:ss"
          );

          vm.buttonState = "success";
          updateBadge();

          vm.labels = $scope.sustainabilityData.resourceGroups.map(x => x.name);
          vm.datasets = $scope.sustainabilityData.resourceGroups.map(x => {
            return {
              label: x.name,
              data: x.totalSize
            }
          });

          vm.colours = ['#2e8aea', '#2bc37c', '#ff9412', '#d42054', '#343434'];
          vm.options = {
            legend: {
              display: true,
              position: 'left'
            }
          };
        }
      }

      function updateBadge() {
        let badgeType = "default";
        let score = $scope.sustainabilityData.totalEmissions;

        if (score >= 0.186 && score < 0.656) {
          badgeType = "warning";
        } else if (score >= 0.656) {
          badgeType = "alert";
        }

        $scope.model.badge = {
          count: $scope.sustainabilityData.carbonRating,
          type: badgeType
        };
      }
    }
  ]);
