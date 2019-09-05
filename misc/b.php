<?php
/*
 * Gallery 2 to Flickr Import Script
 * 
 * The code in THIS FILE ONLY is public domain
 * (Released Nov 3, 2006 by Taj Morton <tajmorton@gmail.com>
 * All other files have a copyright notice and license information
 * in them.
 *
 * General Disclaimer:
 * This script comes with NO WARRANTY or ANYTHING LIKE IT. I am NOT RESPONSIBLE for
 * anything it does. You get to keep all the pieces.
 *
 * To use this script, you must set (or confirm to be correct): 
 * DATABASE_HOST, DATABASE_USER, DATABASE_PASS, DATABASE_DB,
 * DATABASE_TABLE_PREFIX, DATABASE_COLUMN_PREFIX, FLICKR_API_KEY,
 * FLICKR_SECRET, and BASE_DIRECTORY.
 * The DATABASE_* and BASE_DIRECTORY settings can be found in config.php,
 * located in the top directory of your Gallery 2 install.
 *
 * FLICKR_API_KEY and FLICKR_SECRET must be aquired from Flickr. You can get
 * them from this website: http://www.flickr.com/services/api/keys/
 * 
 * You need to set the Flickr "Callback URL" to <url>/auth.php.
 * <url> is the URL where you will upload the contents of the folder on
 * your server.
 *
 * After setting these defines, upload this folder your webserver open
 * export-gallery.php in your browser. Make sure you have cookies enabled,
 * otherwise Flickr won't be able to authorize this script to access your
 * account.
 *
 * When I imported my gallery, this script got killed a few times (either because Flickr
 * stopped talking to it, my webhost killed it because it ran too long, or something else).
 * After cleaning up after it (deleting all the photos that it had uploaded that were not
 * in a set), I changed the first MySQL query to include:
 * AND i.".DATABASE_COLUMN_PREFIX."id > last_sucessful_album_id
 * after ...DATABASE_COLUMN_PREFIX."canContainChildren=1
 * This forced the script to start at the beginning of the albun where it left off.
 * Like I said, I don't really know why it died--you may have better luck than me.
 *
 * If you have any improvents, please send them to me so I can add them!
 * Taj Morton -- tajmorton@gmail.com -- Nov 3, 2006
*/

define("DATABASE_HOST","gallery2peter.73rdstreet.net");   // $storeConfig['hostname']
define("DATABASE_USER","gallery2peter");        // $storeConfig['username']
define("DATABASE_PASS","walnut95");    // $storeConfig['password']
define("DATABASE_DB","gallery2peter");      // $storeConfig['database']
define("DATABASE_TABLE_PREFIX","g2_"); // $storeConfig['tablePrefix']
define("DATABASE_COLUMN_PREFIX","g_"); // $storeConfig['columnPrefix']
define("FLICKR_API_KEY","4dcb0fc60e479dbfa283463c07af326f");  // Aquire from Flickr (braverman)
define("FLICKR_SECRET","b3db5d5a7f81616c");    // Aquire from Flickr (braverman)

define("BASE_DIRECTORY","/home/peterkellner/photos.braverman1.com/g2data/"); // $gallery->setConfig('data.gallery.base',...


// ------------- You shouldn't need to modify anything below this line: -------------

header("Content-type: text/html");
require_once("phpFlickr.php");
$f = new phpFlickr(FLICKR_API_KEY,FLICKR_SECRET);
$f->auth("write");

// need to have 2 phpFlickr objects because for some reason
// after uploading, phpFlickr can't deal with creating/adding photos
// to sets:
$fset = new phpFlickr(FLICKR_API_KEY,FLICKR_SECRET);
$fset->auth("write");

$link = mysql_connect(DATABASE_HOST,DATABASE_USER,DATABASE_PASS);
if (!$link) {
	die("Error: Couldn't connect to database server. MySQL said: ".mysql_error());
}

$db = mysql_select_db(DATABASE_DB,$link);

if (!$db) {
	die("Error: Couldn't select the database. MySQL said: ".mysql_error());
}


// skip NULL pathComponents because it probably means that we've either found a really messed
// up album that I'm not going to deal with, or that we've found the "Gallery" album
$result = mysql_query("SELECT i.".DATABASE_COLUMN_PREFIX."title, 
i.".DATABASE_COLUMN_PREFIX."id, i.".DATABASE_COLUMN_PREFIX."description, 
fse.".DATABASE_COLUMN_PREFIX."pathComponent FROM ".DATABASE_TABLE_PREFIX."Item i INNER JOIN 
".DATABASE_TABLE_PREFIX."FileSystemEntity fse ON i.".DATABASE_COLUMN_PREFIX."id = 
fse.".DATABASE_COLUMN_PREFIX."id WHERE i.".DATABASE_COLUMN_PREFIX."canContainChildren=1 AND 
fse.".DATABASE_COLUMN_PREFIX."pathComponent IS NOT NULL ORDER BY i.".DATABASE_COLUMN_PREFIX."id");

echo "<ul>";
while ($row = mysql_fetch_assoc($result)) {
	echo "<li>Album Title: ".$row[DATABASE_COLUMN_PREFIX."title"]."</li>";
	echo "<li>Album Id: ".$row[DATABASE_COLUMN_PREFIX."id"]."</li>";
	echo "<li>Album Path: ".$row[DATABASE_COLUMN_PREFIX."pathComponent"]."</li>";
	echo "<li>Description: ".$row[DATABASE_COLUMN_PREFIX."description"]."<br/>";
	$uploadedPics=array();
	$childern = mysql_query("SELECT i.".DATABASE_COLUMN_PREFIX."id, 
i.".DATABASE_COLUMN_PREFIX."title, i.".DATABASE_COLUMN_PREFIX."description, 
fse.".DATABASE_COLUMN_PREFIX."pathComponent FROM ".DATABASE_TABLE_PREFIX."Item i INNER JOIN 
".DATABASE_TABLE_PREFIX."ChildEntity ce ON i.".DATABASE_COLUMN_PREFIX."id = 
ce.".DATABASE_COLUMN_PREFIX."id INNER JOIN ".DATABASE_TABLE_PREFIX."FileSystemEntity fse ON 
i.".DATABASE_COLUMN_PREFIX."id = fse.".DATABASE_COLUMN_PREFIX."id WHERE 
ce.".DATABASE_COLUMN_PREFIX."parentId=".$row[DATABASE_COLUMN_PREFIX."id"]." ORDER BY 
i.".DATABASE_COLUMN_PREFIX."id");
	echo "<ul>";
	while ($child = mysql_fetch_assoc($childern)) {
		echo "<li>".$child[DATABASE_COLUMN_PREFIX."title"]." -- ".$child[DATABASE_COLUMN_PREFIX."pathComponent"]."<br/>".$child[DATABASE_COLUMN_PREFIX."description"]." File is ".BASE_DIRECTORY."/albums/".$row[DATABASE_COLUMN_PREFIX."pathComponent"]."/".$child[DATABASE_COLUMN_PREFIX."pathComponent"]."</li>";
		$uploadedPics[]=$f->sync_upload(
				BASE_DIRECTORY."/albums/".$row[DATABASE_COLUMN_PREFIX."pathComponent"]."/".$child[DATABASE_COLUMN_PREFIX."pathComponent"],
				html_entity_decode($child[DATABASE_COLUMN_PREFIX."title"]),
				html_entity_decode($child[DATABASE_COLUMN_PREFIX."description"]),
				null, // tags
				true); // public
		if (count($uploadedPics)%8) {
			// every 8 photos, give flickr a break and a chance
			// to catch up. Adjust this value if you need to.
			// Without this sleep, the connection dropped a lot
			// and I had to keep reuploading the same photos
			sleep(1);
		}
	}
	sleep(1);
	$setid=$fset->photosets_create(html_entity_decode($row[DATABASE_COLUMN_PREFIX."title"]),html_entity_decode($row[DATABASE_COLUMN_PREFIX."description"]),$uploadedPics[0]);
	foreach($uploadedPics as $pid) {
		echo "adding $pid<br/>";
		$fset->photosets_addPhoto($setid['id'],$pid);
	}
	echo "</li></ul>";
	sleep(2); // take a good fitful sleep after uploading a whole album
}
echo "</ul>";

mysql_close($link);

?>
