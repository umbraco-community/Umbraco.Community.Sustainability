(function () {
  'use strict';

  function sustainabilityResource($http, umbRequestHelper) {

    let apiUrl = "/umbraco/backoffice/api/Sustainability/";

    let resource = {
      getData: getData,
      getOverviewData: getOverviewData,
      getAverageData: getAverageData,
      checkPage: checkPage,
      saveResult: saveResult,
      getTagColour: getTagColour,
      calculateGrade: calculateGrade
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

    return resource;
  }

  angular.module('umbraco.resources').factory('Umbraco.Sustainability.Resources.SustainabilityResource', sustainabilityResource);

})();
