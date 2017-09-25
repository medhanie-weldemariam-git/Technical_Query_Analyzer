<!DOCTYPE html>
<html lang="en" ng-app="TqaApp">
  <head>
          <title>TQA User Authentication</title>
          <link href="css/bootstrap.min.css" rel="stylesheet">
          <link href="css/custom.css" rel="stylesheet">
 </head>
  <body>
	<div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
			<form class="navbar-form navbar-right" role="search"><!--  Bootstrap  -->
				<div class="form-group">
					<input type="text" class="form-control" placeholder="Search">
				</div>
				<button type="submit" class="btn btn-default">Submit</button>
			</form>
	</div>
	<div class="jumbotron"><!--  Bootstrap  -->
	   <div class="container">
		   <div class="col-sm-8 col-sm-offset-2">
			   <img src="images/banner.jpg" class="img-rounded" alt="Cinque Terre">
					<div data-ng-view=""></div>	
		   </div>
	   </div>
   </div>	
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min.js"></script>
	<script type="text/javascript" src ="partials/javascript/app.js"></script>	
   </body>
</html>




