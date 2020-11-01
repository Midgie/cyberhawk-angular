<?php

define( 'NUM_ITEMS', 100 );
define( 'COATING_DMG', 3 );
define( 'LIGHTNING_STRIKE', 5 );

// Provide a report 
function formatReport( int $item, bool $hasCoatDmg, bool $hasStrikeDmg ) {
    // item number by default
    $message = $item;
    if( $hasCoatDmg ) {
        $message = 'Coating Damage';
        if( $hasStrikeDmg ) 
            $message .= ' and Lightning Strike';
    } else if ( $hasStrikeDmg ) {
        $message = 'Lightning Strike';
    }
    // return report with state booleans plus human readable message
    return array(
        'hasCoatingDamage' => $hasCoatDmg,
        'hasLightningStrike' => $hasStrikeDmg,
        'message' => $message
    );
}

// check damages pass items[] as reference for efficiency
function checkDamages( int $item, array &$items ) {
    
    $hasCoatDmg = !($item % COATING_DMG);
    $hasStrikeDmg = !($item % LIGHTNING_STRIKE);
    // push to list
    $items[] = array(
        'item' => $item,
        'report' => formatReport( $item, $hasCoatDmg, $hasStrikeDmg )
    );
}

function get() {
    $items = array();
    for( $i = 1; $i <= NUM_ITEMS; ++$i ) {
        checkDamages( $i, $items );
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