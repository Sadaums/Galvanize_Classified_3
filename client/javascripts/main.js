(function() {
  'use strict';
  angular.module("app", [])

    .component('hotdog', {

      controller: appController,
      templateUrl: './views/classifieds.html'
    })

  appController.$inject = ['$http']
  function appController($http) {
    const vm = this


    vm.$onInit = function() {
      vm.sortType = 'id'
      console.log("On Init");

      $http.get('/api/classifieds').then(function (response) {
        vm.classifieds = response.data;
        console.log(vm.classifieds);
      })

    }
    // more code can go here

    vm.postNewClassified = function(classified) {
      console.log("You clicked postNewClassified");

      $http.post('/api/classifieds', classified).then(function (req, res) {})

    }

    vm.editClassified = function(classified) {
      console.log("You clicked editClassified");
      var editedClassified = classified;
      console.log(editedClassified)
      $http.patch(`/api/classifieds/${classified.id}`, editedClassified).then(function (req, res) {});
      // console.log(updatedClassified);
    }

    vm.deleteClassified = function(classified) {
      console.log(classified.id)
      $http.delete(`/api/classifieds/${classified.id}`);
    }

    vm.sort = function () {
        if (vm.sortType === 'price' || vm.sortType === 'date') {
          vm.reverse = true;
        }
        else {
          vm.reverse = false;
        }
      }

  }


// appController.$inject = ['$http']
}());
