angular.module('services', [])
  .service('httpCalls', ['$http', function($http) {

    // Set the api key
  	const api_key = '4Z15yuylYr1bEQkpJiBb3dd4ffvUfs5v';
  	// Set the URL
  	const url = 'https://api.giphy.com/v1/gifs/search';

    return {
      get: q => {
        return $http.get(url, { params: {api_key: `${api_key}`, q: `${q}`}});
      }
    }
  }]);
