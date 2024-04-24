angular.module('umbraco').controller('Umbraco.Sustainability.Overview.Controller',
  ['$scope', '$routeParams', 'navigationService', 'Umbraco.Sustainability.Resources.SustainabilityResource',
    function ($scope, $routeParams, navigationService, sustainabilityResource) {

      navigationService.syncTree({ tree: $routeParams.tree, path: [-1, $routeParams.method], forceReload: false });

      let vm = this;

      vm.name = "Overview";

      $scope.recentData = [];

      $scope.greenHosting = undefined;
      $scope.greenHostingLoading = true;

      $scope.isLocalhost = window.location.host.includes('localhost');
      $scope.isDebug = Umbraco.Sys.ServerVariables.isDebuggingEnabled;

      $scope.averagePageSize = 0;
      $scope.averageEmissions = 0;

      vm.getTagColour = sustainabilityResource.getTagColour;
      vm.calculateGrade = sustainabilityResource.calculateGrade;

      init();

      function init() {
        window.setTimeout(function () {
          if (window.hosting && !$scope.isLocalhost && !$scope.isDebug) {
              window.hosting.check(window.location.host, 'UmbracoSustainabilityPackage').then(data => {
              $scope.greenHosting = !!JSON.parse(data);
              $scope.greenHostingLoading = false;
            });
          }
        }, 2000);

        sustainabilityResource.getAverageData().then(function (data) {
          $scope.averagePageSize = data.PageSize;
          $scope.averageEmissions = data.Emissions;
          $scope.grade = vm.calculateGrade($scope.averageEmissions);
        });

        sustainabilityResource.getOverviewData(1, 10, 'RequestDate', 'Descending').then(function (data) {
          $scope.recentData = data.items;

          angular.forEach($scope.recentData, function (item) {
            item.RequestDate = moment(item.RequestDate).format(
              "MMM Do YYYY HH:mm:ss"
            );
          });
        });
      }
    }
  ]);
