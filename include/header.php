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
	   	
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
		<script src="js/script.js"></script>  
	    <script src="js/vendor/modernizr.js"></script>	
		<script type="text/javascript" src="js/responsive-tables.js"></script>
	</head>
	
	<body>

 	<div class="row">

    	<div class="large-12 medium-12 columns">
        	<h1><?php echo $pageTitle;?></h1>
        </div>

	   <section id="fetch">
	      <input type="text" placeholder="Enter a movie title" id="term" />
	      <button id="search">Find me a poster</button>
	   </section>
	   <section id="poster">
	   </section>
        
        	<div class="large-8 small-9 columns">
		      <input type="text" placeholder="Find Movie">
		    </div>
		    <div class="large-4 small-3 columns">
		      <a href="#" class="alert button expand">Search</a>
		    </div>
		</div>
    
    </div><!-- .row -->