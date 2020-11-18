<?php

require_once( 'api/reports/reporter.php' );

class CoatingDamageReporter extends DefaultReporter
{
    function __construct() {
        parent::__construct( "Coating Damage" );
        $this->hasCoatDmg = true;
    }
}

?>