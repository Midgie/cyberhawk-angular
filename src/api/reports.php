<?php

define( 'NUM_ITEMS', 100 );
define( 'COATING_DMG', 3 );
define( 'LIGHTNING_STRIKE', 5 );

function checkDamages( int $item, &$items ) {
    $items[$item] = array(
        'hasCoatingDamage' => !($item % COATING_DMG),
        'hasLightningStrike' => !($item % LIGHTNING_STRIKE)
    );

}

function printStatus( int $idx, &$item ) {
    $state = $idx;
    if( $item['hasCoatingDamage'] ) {
        $state = 'Coating Damage';
        if( $item['hasLightningStrike'] ) {
            $state .= ' and Lightning Strike';
        }
    } else if ( $item['hasLightningStrike'] ) {
        $state = 'Lightning Strike';
    }
    return $state;
}

function get() {
    $items = array();
    for( $i = 1; $i <= NUM_ITEMS; ++$i ) {
        checkDamages( $i, $items );
    }
    return json_encode( $items, true );
}

$method = $_SERVER['REQUEST_METHOD'];

switch( $method ) {
    case 'GET':
        header( 'Content-Type: application/json' );
        echo get();
        break;
    default:
        header($_SERVER["SERVER_PROTOCOL"]." 405 Method Not Allowed", true, 405);
        exit;
}

?>