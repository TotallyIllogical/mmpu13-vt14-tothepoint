<!DOCTYPE HTML>
<html class="no-js" lang="en">
	<head>
		<title><?php echo $pageTitle;?></title>	    
	    <meta charset="utf-8">
    	<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=no;">  

    	<!-- CSS -->
		<link rel="stylesheet" href="css/foundation.css">
	    <link rel="stylesheet" href="css/style.css">
		<link type="text/css" media="screen" rel="stylesheet" href="css/responsive-tables.css">	
    	
    	<!-- JS -->	
  		<script type="text/javascript" src="js/responsive-tables.js"></script>   	   	
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
		<script src="js/script.js"></script>  
	    <script src="js/vendor/modernizr.js"></script>	
	</head>
	
	<body>

 	<header class="row">

    	<div class="large-12 medium-12 columns">
        	<h1><?php echo $pageTitle;?></h1>
        </div>

    	<div class="large-12 medium-12 columns">
	    	<div id="search-wrapper">

	    		<div id="search-left">
	    			<input type="text" placeholder="Enter a movie title" id="term">
	    		</div>
	    
			    <div id="search-right">
			    	<button id="search" class="alert button expand">Search</button>
			    </div>

	    		<div class="clear"></div>

			</div><!-- .search-wrapper -->
		</div><!-- .large-12 medium-12 columns -->

    </header><!-- .row -->