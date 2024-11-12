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
      vm.resourceLabels = ['Scripts', 'Images', 'Styles', 'Other'];
      vm.resourceData = [0, 0, 0, 0];
      vm.co2TrendLabels = [];
      vm.co2TrendData = [];
      vm.viewMode = 'table';

      vm.changePageNumber = changePageNumber;
      vm.getTagColour = sustainabilityResource.getTagColour;
      vm.sortingHandler = sortingHandler;
      vm.setViewMode = setViewMode;

      init();

      $scope.$on('$routeChangeSuccess', function () {
        init(); 
      });

      function init() {
        vm.loading = true;
        sustainabilityResource.getOverviewData(vm.pageNumber, vm.pageSize, vm.sortingColumn, vm.sortingDesc).then(function (data) {
          vm.sustainabilityData = data.items;

          vm.pageNumber = data.pageNumber;
          vm.pageSize = data.pageSize;
          vm.totalItems = data.totalItems;
          vm.totalPages = data.totalPages;

          vm.co2TrendLabels = [];
          vm.co2TrendData = [];
          vm.resourceData = [0, 0, 0, 0]; 

          angular.forEach(vm.sustainabilityData, function (item) {
            item.RequestDate = moment(item.RequestDate).format("MMM Do YYYY HH:mm:ss");
            item.PageData = JSON.parse(item.PageData);
            updateResourceCounts(item);
            vm.co2TrendLabels.push(item.RequestDate);
            vm.co2TrendData.push(item.TotalEmissions);
          });

          prepareChartData();
          vm.loading = false;
        });
      }

      function updateResourceCounts(item) {
        item.Scripts = getResourceCount(item, 'Scripts');
        item.Images = getResourceCount(item, 'Images');
        item.Styles = getResourceCount(item, 'Styles');
        item.Other = getResourceCount(item, 'Other');
      }

      function getResourceCount(item, resourceName) {
        const resourceGroup = item.PageData.ResourceGroups.find(x => x.Name === resourceName);
        return resourceGroup ? resourceGroup.Resources.length : 0;
      }

      function prepareChartData() {
        vm.sustainabilityData.forEach(function (item) {
          vm.resourceData[0] += item.Scripts;
          vm.resourceData[1] += item.Images;
          vm.resourceData[2] += item.Styles;
          vm.resourceData[3] += item.Other;
        });
      }

      function setViewMode(mode) {
        vm.viewMode = mode;
        if (mode === 'chart') {
          setTimeout(initCharts, 100); 
        }
      }

      function initCharts() {
        if (typeof Chart !== 'undefined') {
          let doughnutCtx = document.getElementById('resourceBreakdown').getContext('2d');
          new Chart(doughnutCtx, {
            type: 'doughnut',
            data: {
              labels: vm.resourceLabels,
              datasets: [{
                label: 'Resource Breakdown',
                data: vm.resourceData,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              layout: { padding: 10 }
            }
          });

          let barCtx = document.getElementById('co2Trend').getContext('2d');
          new Chart(barCtx, {
            type: 'bar',
            data: {
              labels: vm.co2TrendLabels,
              datasets: [{
                label: 'CO₂ per page view (g)',
                data: vm.co2TrendData,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                fill: true
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: { beginAtZero: true },
                y: { beginAtZero: true }
              },
              layout: { padding: 10 }
            }
          });
        }
      }

      function changePageNumber(pageNumber) {
        vm.pageNumber = pageNumber;
        init();
      }

      function sortingHandler(columnName) {
        vm.sortingDesc = vm.sortingColumn === columnName ? !vm.sortingDesc : false;
        vm.sortingColumn = columnName;
        init();
      }
    }
  ]);

