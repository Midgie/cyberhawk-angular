<?php

require_once( 'api/reports/coating-report.php' );
require_once( 'api/reports/lightning-report.php' );
require_once( 'api/reports/double-report.php' );

define( 'COATING_DMG', 3 );
define( 'LIGHTNING_STRIKE', 5 );

class Inspector 
{
    function __construct() {}

    public function inspect( int $item, array &$items ) {
        // use the factory function to get the correct report instance 
        $reporter = self::fetchReporter( $item );
        // append the array
        $items[] = array(
            'item' => $item,
            'report' => $reporter->getReport()
        );
    }

    private static function fetchReporter( $item ) {
        // identify which reporter we need
        $hasCoatDmg = !($item % COATING_DMG);
        $hasStrikeDmg = !($item % LIGHTNING_STRIKE);
        // Check to see if we have both first
        if( $hasCoatDmg && $hasStrikeDmg ) 
            return new DoubleDamageReporter();

        if( $hasCoatDmg ) 
            return new CoatingDamageReporter();

        if( $hasStrikeDmg ) 
            return new LightningStrikeReporter();
        // this will return the item number by default
        return new DefaultReporter( $item );
    }
}

?>