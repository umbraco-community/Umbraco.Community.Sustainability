angular.module('umbraco').controller('Umbraco.Sustainability.Controller',
  ['$scope', '$sce', '$timeout', 'editorState', 'Umbraco.Sustainability.Resources.SustainabilityResource',
    function ($scope, $sce, $timeout, editorState, sustainabilityResource) {

      var vm = this;

      $scope.loading = true;

      init();

      function init() {
        var current = editorState.getCurrent();
        var id = current?.id;

        sustainabilityResource.getData(id).then(function (data) {
          
          $scope.sustainabilityData = data;
          $scope.loading = false;

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

        });
      }
    }
  ]);
