<?php

// Show all information, defaults to INFO_ALL
//phpinfo();


try{
    $soap_url = 'http://zdemo2.zenprise.com:80/zdm/services/EveryWanUserGroup?wsdl';
    $client = new SoapClient(null, array( 
    		'location' => $soap_url,
			'uri' => "http://zdemo2.zenprise.com:80",
			'login'	=> "pkellner",
			'password'=> "zenprise"));
	print("Connected to zdemo2.zenprise.com\n");
	$client->createGroup("groupA");
	$client->createGroup("groupA.groupA1");
	$client->createGroup("groupA.groupA2");
	$client->createGroup("groupB");
	print("Successfully added groups: groupA, groupA.groupA1 and groupA.group2\n");
	$client->createUser("groupA.groupA1", "loginA", "PasswordA", "USER");
	$client->createUser("groupA.groupA1", "loginB", "PasswordB", "ADMIN");
	$client->setUserGroup("loginA", "groupA.groupA2");
	$client->setUserGroup("loginB", "groupA.groupA2");
	$client->createUser("groupB", "loginC", "PasswordC", "SUPPORT");
	print("Successfully added users loginA, loginB and LoginC\n");
}

catch (Exception $e)
{
   print_r($e); exit;
}

?>
