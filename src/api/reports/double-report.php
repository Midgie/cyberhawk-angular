<?php

require_once( 'api/reports/reporter.php' );

class DoubleDamageReporter extends DefaultReporter
{
    function __construct() {
        parent::__construct( "Coating Damage and Lightning Strike" );
        $this->hasCoatDamage = true;
        $this->hasStrikeDmg = true;
    }
}

?>