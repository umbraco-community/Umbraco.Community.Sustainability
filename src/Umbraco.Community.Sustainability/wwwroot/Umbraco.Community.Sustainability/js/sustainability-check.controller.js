angular.module('umbraco').controller('Umbraco.Sustainability.Controller',
  ['$scope', '$sce', '$timeout', 'editorState', 'Umbraco.Sustainability.Resources.SustainabilityResource',
    function ($scope, $sce, $timeout, editorState, sustainabilityResource) {

      var vm = this;

      $scope.loading = true;

      init();

      function init() {
        var current = editorState.getCurrent();
        var id = current?.id;
        $scope.pageSizeBytes = 0;

        sustainabilityResource.getData(id).then(function (data) {
          //$scope.sustainabilityData = data;
          //$scope.loading = false;

          //var swd = new co2.co2({ model: "swd" });
          //$scope.emissions = parseFloat(swd.perByte($scope.sustainabilityData.totalSize)).toFixed(4);

          //vm.labels = $scope.sustainabilityData.resourceGroups.map(x => x.name);
          //vm.datasets = $scope.sustainabilityData.resourceGroups.map(x => {
          //  return {
          //    label: x.name,
          //    data: x.totalSize
          //  }
          //});

          //vm.colours = ['#2e8aea', '#2bc37c', '#ff9412', '#d42054', '#343434'];
          //vm.options = {
          //  legend: {
          //    display: true,
          //    position: 'left'
          //  }
          //};

        });
      }
    }
  ]);
