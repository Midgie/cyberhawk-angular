<?php

interface Report {
    public function getReport();
}

class DefaultReporter implements Report {
    
    protected $mesage;
    protected $hasCoatDmg = false;
    protected $hasStrikeDmg = false;

    function __construct( $message ) {
        // set message default will return the item number
        $this->message = $message;
    }

    public function getReport() {
        // return the report compatible with previous iteration
        return array(
            'hasCoatingDamage' => $this->hasCoatDmg,
            'hasLightningStrike' => $this->hasStrikeDmg,
            'message' => $this->message
        );
    }
}