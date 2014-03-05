<!doctype html>
<head>
	<!-- [if lt IE9]>
	<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></spcript>

	<! [endif] -->
	<title><?php echo $pageTitle;?></title>
	<meta charset="utf-8">
	<link rel="stylesheet" href="style/style.css" type="text/css">
	<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Oswald:400,700" type="text/css">
</head>
<body>
	<h1><?php echo $pageTitle;?></h1>
	<form class="form-wrapper cf">
        <input type="text" placeholder="Search here..." required>
        <button type="submit">Search</button>
    </form>
    <h2>Result</h2>