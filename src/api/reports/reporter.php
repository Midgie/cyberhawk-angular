<?php

interface Report {
    public function getReport();
}

class DefaultReporter implements Report {
    
    protected $mesage;
    protected $hasCoatDmg = false;
    protected $hasStrikeDmg = false;

    function __construct( $message ) {
        $this->message = $message;
    }

    public function getReport() {
        return array(
            'hasCoatingDamage' => $this->hasCoatDmg,
            'hasLightningStrike' => $this->hasStrikeDmg,
            'message' => $this->message
        );
    }
}