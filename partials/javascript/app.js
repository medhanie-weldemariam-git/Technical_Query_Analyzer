angular.module('TqaApp', []).config(['$routeProvider', function($routeProvider) 
{
  $routeProvider.      

      when('/', {templateUrl: 'partials/components/home.html', controller: HomeCtrl}).

      when('/login-user', {templateUrl: 'partials/components/login.html', controller: LoginCtrl}).

      when('/list-user', {templateUrl: 'partials/components/lists.html', controller: ListCtrl}).
      
      when('/add-user', {templateUrl: 'partials/components/add-new.html', controller: AddCtrl}).

      when('/ask-user', {templateUrl: 'partials/components/ask-question.html', controller: AskCtrl}).

      when('/edit/:id', {templateUrl: 'partials/components/edit.html', controller: EditCtrl}).

      otherwise({redirectTo: '/'});

}]);

function HomeCtrl($scope, $http) 
{
  $http.get('api/users').success(function(data) 
  {
    $scope.users = data;
  });
}

function LoginCtrl($scope, $http, $location) 
{
	$scope.master = {};
	$scope.activePath = null;
	$scope.user = {};
	$scope.signin = function(user, LoginForm) 
	{
		var email=$scope.user.email;
		var password=$scope.user.password;
		$http.post('api/login_user', $scope.user)
		.success(function(response)
		{
			if((email=="test@tqa.com" && password=="test") || (email=="admin@tqa.com" && password=="admin"))
			{
				$scope.message = 'Welcome';
				$scope.activePath = $location.path('/list-user');
			}
			else
			{
				$scope.message = 'Error: Invalid user or password'
				$scope.messagecolor="alert alert-danger";
			}
		})
		.error(function (response) 
		{
			delete $window.sessionStorage.token;
			$scope.message = 'Error: Invalid user or password';
		});
		$scope.reset = function() 
		{
			$scope.user = angular.copy($scope.master);
		};
		$scope.reset();
	};
}


function AskCtrl($scope, $http, $location) 
{
	$scope.master = {};
	$scope.activePath = null;
	
	$scope.ask = function(user, AskForm) 
	{
		$http.post('api/ask_user', user).success(function()
		{
			$scope.reset();
			$scope.activePath = $location.path('/list-user');
		});
		
		$scope.reset = function() 
		{
			$scope.user = angular.copy($scope.master);
		};
		
		$scope.reset();
	}; 
	$scope.update = function(user)
	{
		$http.put('api/ask_user', user).success(function(data)
		{
			$scope.users = data;
			$scope.activePath = $location.path('/list-user');
		});
	};
}


function ListCtrl($scope, $http) 
{
  $http.get('api/users').success(function(data) 
  {
    $scope.users = data;
  });
}


function AddCtrl($scope, $http, $location) 
{
  $scope.master = {};
  $scope.activePath = null;

  $scope.add_new = function(user, AddNewForm) 
  {
    $http.post('api/add_user', user).success(function()
    {
      $scope.reset();
      $scope.activePath = $location.path('/list-user');
    });
    $scope.reset = function() 
    {
      $scope.user = angular.copy($scope.master);
    };

    $scope.reset();
  };
}

function EditCtrl($scope, $http, $location, $routeParams) 
{
  var id = $routeParams.id;
  $scope.activePath = null;

  $http.get('api/users/'+id).success(function(data) 
  {
    $scope.users = data;
  });

  $scope.update = function(user)
  {
    $http.put('api/users/'+id, user).success(function(data) 
    {
      $scope.users = data;
      $scope.activePath = $location.path('/list-user');
    });
  };

  $scope.delete = function(user) 
  {
    console.log(user);
    var deleteUser = confirm('Are you absolutely sure you want to delete?');
    if (deleteUser) 
    {
      $http.delete('api/users/'+user.id);
      $scope.activePath = $location.path('/list-user');
    }
  };
}


