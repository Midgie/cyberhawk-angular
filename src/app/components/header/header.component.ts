import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

@Component( {
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
} )
export class HeaderComponent implements OnInit {
    
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    cube: THREE.Mesh;
    mixer: THREE.AnimationMixer;
    clock: THREE.Clock;

    constructor() { }
    
    ngOnInit(): void { 
        const canvas: HTMLCanvasElement = document.querySelector( '#canvas' );
        // setup the 3d renderer
        this.renderer = new THREE.WebGLRenderer( { canvas } );
        this.renderer.setClearColor( 0xf5f5f5 );
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( 50, 50 );
        // setup
        this.camera = new THREE.PerspectiveCamera( 25, window.innerWidth / window.innerHeight, 1, 20000 );
        this.camera.position.set( 1, 1, 3000 );
        // set the scene  
        this.scene = new THREE.Scene();

        // Load Light sources
        var ambientLight = new THREE.AmbientLight( 0xcccccc );
        this.scene.add( ambientLight );
              
        var directionalLight = new THREE.DirectionalLight( 0xffffff );
        directionalLight.position.set( 0, 1, 1 ).normalize();
        this.scene.add( directionalLight );
        // load the 3d fan model
        const loader = new GLTFLoader();
        loader.load( 'assets/propeller_2/scene.gltf', gltf => {
            gltf.scene.scale.set( 2, 2, 2 );			   
        	  gltf.scene.traverse( ( child: any ) => {
                if( child.isMesh ) {
                    child.material = new THREE.MeshStandardMaterial({ color: 0xfacd3c, roughness: 0.092344149961390842, metalness: 0 });
                    child.material.side = THREE.DoubleSide;
                }
            } );

            this.mixer = new THREE.AnimationMixer( gltf.scene );
            gltf.animations.forEach( clip => {
              this.mixer.clipAction( clip ).play();
            } );
          
            // add the model to the scene
            this.scene.add(gltf.scene);
            // set up the clock to get the animation delta
            this.clock = new THREE.Clock();
            this.animate();
        }, undefined, err => {
            console.error( err );
        } );
    }
      
    animate = () => {
        requestAnimationFrame( this.animate );
        // divide the delta by 2 to slow it down        
        this.mixer.update( this.clock.getDelta() / 2 );
        this.renderer.render( this.scene, this.camera );
    }
}
