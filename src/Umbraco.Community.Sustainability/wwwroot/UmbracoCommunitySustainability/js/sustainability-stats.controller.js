angular.module('umbraco').controller('Umbraco.Sustainability.Stats.Controller',
  ['$scope', '$routeParams', 'navigationService', 'Umbraco.Sustainability.Resources.SustainabilityResource',
    function ($scope, $routeParams, navigationService, sustainabilityResource) {

      navigationService.syncTree({ tree: $routeParams.tree, path: [-1, $routeParams.method], forceReload: false });

      let vm = this;

      vm.name = "Stats";
      vm.loading = true;
      vm.pageNumber = 1;
      vm.pageSize = 10;
      vm.sustainabilityData = [];
      vm.sortingDesc = false;
      vm.sortingColumn = 'CarbonRating';

      vm.changePageNumber = changePageNumber;
      vm.getTagColour = sustainabilityResource.getTagColour;
      vm.sortingHandler = sortingHandler;

      init();

      function init() {
        sustainabilityResource.getOverviewData(vm.pageNumber, vm.pageSize, vm.sortingColumn, vm.sortingDesc).then(function (data) {
          vm.sustainabilityData = data.items;

          vm.pageNumber = data.pageNumber;
          vm.pageSize = data.pageSize;
          vm.totalItems = data.totalItems;
          vm.totalPages = data.totalPages;

          angular.forEach(vm.sustainabilityData, function (item) {
            item.RequestDate = moment(item.RequestDate).format(
              "MMM Do YYYY HH:mm:ss"
            );

            item.PageData = JSON.parse(item.PageData);
            item.Scripts = item.PageData.ResourceGroups.find(x => x.Name === 'Scripts').Resources.length;
            item.Images = item.PageData.ResourceGroups.find(x => x.Name === 'Images').Resources.length;
            item.Styles = item.PageData.ResourceGroups.find(x => x.Name === 'Styles').Resources.length;
            item.Other = item.PageData.ResourceGroups.find(x => x.Name === 'Other').Resources.length;

          });

          vm.loading = false;
        });
      }

      function changePageNumber(pageNumber) {
        vm.pageNumber = pageNumber;
        init();
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

      function sortingHandler(columnName) {
        vm.sortingDesc = vm.sortingColumn === columnName ? !vm.sortingDesc : false;
        vm.sortingColumn = columnName;
        init();
      }
    }
  ]);
