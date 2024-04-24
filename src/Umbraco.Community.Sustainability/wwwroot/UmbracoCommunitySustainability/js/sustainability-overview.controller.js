angular.module('umbraco').controller('Umbraco.Sustainability.Overview.Controller',
  ['$scope', '$routeParams', 'navigationService', 'Umbraco.Sustainability.Resources.SustainabilityResource',
    function ($scope, $routeParams, navigationService, sustainabilityResource) {

      navigationService.syncTree({ tree: $routeParams.tree, path: [-1, $routeParams.method], forceReload: false });

      let vm = this;

      vm.name = "Overview";

      $scope.greenHosting = undefined;
      $scope.greenHostingLoading = true;

      $scope.isLocalhost = window.location.host.includes('localhost')
      $scope.isDebug = Umbraco.Sys.ServerVariables.isDebuggingEnabled;

      $scope.averagePageSize = 0;
      $scope.averageEmissions = 0;

      vm.getTagColour = getTagColour;
      vm.calculateGrade = calculateGrade;

      init();

      function init() {
        window.setTimeout(function () {
          if (window.hosting && !$scope.isLocalhost && !$scope.isDebug) {
            window.hosting.check('google.com', 'UmbracoSustainabilityPackage').then(data => {
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

        sustainabilityResource.getOverviewData(1, 10).then(function (data) {
          $scope.recentData = data.items;

          angular.forEach($scope.recentData, function (item) {
            item.RequestDate = moment(item.RequestDate).format(
              "MMM Do YYYY HH:mm:ss"
            );
          });
        });
      }

      function getTagColour(carbonRating) {
        if (carbonRating == "E" || carbonRating == "F") {
          return "danger";
        }
        else if (carbonRating == "D") {
          return "warning";
        }
        else return "positive";
      }

      function calculateGrade(score) {
        // grade using swd digital carbon ratings
        // https://sustainablewebdesign.org/digital-carbon-ratings/
        if (score < 0.095) {
          return 'A+';
        } else if (score < 0.186) {
          return 'A';
        } else if (score < 0.341) {
          return 'B';
        } else if (score < 0.493) {
          return 'C';
        } else if (score < 0.656) {
          return 'D';
        } else if (score < 0.846) {
          return 'E';
        } else {
          return 'F';
        }
      }

    }
  ]);
