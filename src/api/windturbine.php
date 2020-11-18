<?php

require_once('api/inspector.php');

define( 'NUM_ITEMS', 100 );

function get() {
    //start the inspector
    $inspector = new Inspector();
    // iterate over the reported items
    $items = array();
    for( $i = 1; $i <= NUM_ITEMS; ++$i ) {
        $inspector->inspect( $i, $items );
    }
    return json_encode( $items );
}

// a little bit of validation so we don't get puts or posts
switch( $_SERVER['REQUEST_METHOD'] ) {
    case 'GET':
        header( 'Content-Type: application/json' );
        echo get();
        break;
    default:
        header( "{$_SERVER['SERVER_PROTOCOL']} 405 Method Not Allowed", true, 405);
        exit;
}

?>