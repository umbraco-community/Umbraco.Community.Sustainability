(function () {
  'use strict';

  function sustainabilityResource($http, umbRequestHelper) {

    let apiUrl = "/umbraco/backoffice/api/Sustainability/";

    let resource = {
      getData: getData,
      getOverviewData: getOverviewData,
      getAverageData: getAverageData,
      checkPage: checkPage,
      saveResult: saveResult
    };

    function getData(pageId) {
      return umbRequestHelper.resourcePromise(
        $http.get(`${apiUrl}GetPageData?pageId=${pageId}`),
        'Failed getting sustainability data'
      );
    };

    function getOverviewData(pageNumber, pageSize, sortingColumn, sortingDesc) {
      pageNumber = pageNumber || 1;
      pageSize = pageSize || 10;
      sortingColumn = sortingColumn || 'CarbonRating';

      var sortDir = 'Ascending';
      if (sortingDesc) {
        sortDir = 'Descending';
      }

      return umbRequestHelper.resourcePromise(
        $http.get(`${apiUrl}GetOverviewData?pageNumber=${pageNumber}&pageSize=${pageSize}&orderBy=${sortingColumn}&direction=${sortDir}`),
        'Failed getting sustainability data'
      );
    };

    function getAverageData() {
      return umbRequestHelper.resourcePromise(
        $http.get(`${apiUrl}getAverageData`),
        'Failed getting sustainability data'
      );
    };

    function checkPage(pageId) {
      return umbRequestHelper.resourcePromise(
        $http.get(`${apiUrl}CheckPage?pageId=${pageId}`),
        'Failed to run sustainability check'
      );
    };

    function saveResult(pageId, data) {
      return umbRequestHelper.resourcePromise(
        $http.post(`${apiUrl}SavePageData?pageId=${pageId}`, data),
        'Failed to save sustainability data'
      );
    };

    return resource;
  }

  angular.module('umbraco.resources').factory('Umbraco.Sustainability.Resources.SustainabilityResource', sustainabilityResource);

})();
