<?php

require_once( 'api/reports/reporter.php' );

class LightningStrikeReporter extends DefaultReporter
{
    function __construct() {
        parent::__construct( "Lightning Strike" );
        $this->hasStrikeDmg = true;
    }
}

?>