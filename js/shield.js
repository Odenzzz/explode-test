		if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

		var renderer, scene, camera, stats;

		var mesh, uniforms;
		var anim = true;
		var timer = 0;
		var WIDTH = window.innerWidth,
			HEIGHT = window.innerHeight;

			
			

		function initSHIELD() {

			camera = new THREE.PerspectiveCamera( 40, WIDTH / HEIGHT, 1, 10000 );
			camera.position.set( -10, 10, 20 );

			controls = new THREE.TrackballControls( camera );

			scene = new THREE.Scene();


			var loader = new THREE.JSONLoader();

			loader.load('json/shield.json', function(SHIELDgeometry) {
				
				var tessellateModifier = new THREE.TessellateModifier( 2 );
				for ( var i = 0; i < 100; i ++ ) {
					//tessellateModifier.modify( SHIELDgeometry );
				}
				SHIELDgeometry.center();
				var explodeModifier = new THREE.ExplodeModifier();
				explodeModifier.modify( SHIELDgeometry );

				var numFaces = SHIELDgeometry.faces.length;

				SHIELDgeometry = new THREE.BufferGeometry().fromGeometry( SHIELDgeometry );

				var colors = new Float32Array( numFaces * 3 * 3 );
				var displacement = new Float32Array( numFaces * 3 * 3 );

				var color = new THREE.Color();

				for ( var f = 0; f < numFaces; f ++ ) {

					var index = 9 * f;

					var h = 1;
					var s = 1;
					var l = 0.5;

					color.setHSL( h, s, l );

					var d = 5 * ( 0.5 - Math.random() );

					for ( var i = 0; i < 3; i ++ ) {

						colors[ index + ( 3 * i )     ] = color.r;
						colors[ index + ( 3 * i ) + 1 ] = color.g;
						colors[ index + ( 3 * i ) + 2 ] = color.b;

						displacement[ index + ( 3 * i )     ] = d;
						displacement[ index + ( 3 * i ) + 1 ] = d;
						displacement[ index + ( 3 * i ) + 2 ] = d;

					}

				}
				console.log(colors)
				//SHIELDgeometry.addAttribute( 'customColor', new THREE.BufferAttribute( colors, 3 ) );
				SHIELDgeometry.addAttribute( 'displacement', new THREE.BufferAttribute( displacement, 3 ) );

				//
				
				uniforms = {

					amplitude: { value: 0.0 },

				};

				var shaderMaterial = new THREE.ShaderMaterial( {

					uniforms:       uniforms,
					vertexShader:   document.getElementById( 'vertexshader' ).textContent,
					fragmentShader: document.getElementById( 'fragmentshader' ).textContent

				});

				

				meshSHIELD = new THREE.Mesh( SHIELDgeometry, shaderMaterial );

				scene.add( meshSHIELD );

				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setClearColor( 0x050505 );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( WIDTH, HEIGHT );

				var container = document.getElementById( 'container' );
				container.appendChild( renderer.domElement );

				stats = new Stats();
				container.appendChild( stats.dom );
			
			});

			var loader1 = new THREE.JSONLoader();

			loader1.load('json/css.json', function(CSSgeometry) {
				
				var tessellateModifier = new THREE.TessellateModifier( 2 );
				for ( var i = 0; i < 100; i ++ ) {
					tessellateModifier.modify( CSSgeometry );
				}
				CSSgeometry.center();
				
				var explodeModifier = new THREE.ExplodeModifier();
				explodeModifier.modify( CSSgeometry );

				var numFaces = CSSgeometry.faces.length;

				CSSgeometry = new THREE.BufferGeometry().fromGeometry( CSSgeometry );

				var colors = new Float32Array( numFaces * 3 * 3 );
				var displacement = new Float32Array( numFaces * 3 * 3 );

				var color = new THREE.Color();

				for ( var f = 0; f < numFaces; f ++ ) {

					var index = 9 * f;

					var h = 1;
					var s = 1;
					var l = 0.5;

					color.setHSL( h, s, l );

					var d = 5 * ( 0.5 - Math.random() );

					for ( var i = 0; i < 3; i ++ ) {

						colors[ index + ( 3 * i )     ] = color.r;
						colors[ index + ( 3 * i ) + 1 ] = color.g;
						colors[ index + ( 3 * i ) + 2 ] = color.b;

						displacement[ index + ( 3 * i )     ] = d;
						displacement[ index + ( 3 * i ) + 1 ] = d;
						displacement[ index + ( 3 * i ) + 2 ] = d;

					}

				}
				CSSgeometry.addAttribute( 'customColor', new THREE.BufferAttribute( colors, 3 ) );
				CSSgeometry.addAttribute( 'displacement', new THREE.BufferAttribute( displacement, 3 ) );

				//
				
				uniforms = {

					amplitude: { value: 0.0 },

				};

				var shaderMaterial = new THREE.ShaderMaterial( {

					uniforms:       uniforms,
					vertexShader:   document.getElementById( 'vertexshader' ).textContent,
					fragmentShader: document.getElementById( 'fragmentshader' ).textContent

				});

				

				meshCSS = new THREE.Mesh( CSSgeometry, shaderMaterial );

				scene.add( meshCSS );

				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setClearColor( 0x050505 );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( WIDTH, HEIGHT );

				var container = document.getElementById( 'container' );
				container.appendChild( renderer.domElement );

				stats = new Stats();
				container.appendChild( stats.dom );
			
			});
			window.addEventListener( 'resize', onWindowResize, false );
			
		}

		function onWindowResize() {

			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();

			renderer.setSize( window.innerWidth, window.innerHeight );

		}

		
		var req;
		function animateSHIELD() {
					if (anim) {
						cancelAnimationFrame(req)
						req = requestAnimationFrame( animateSHIELD );
						explodeSHIELD();
					} else {
						cancelAnimationFrame(req)
						req = requestAnimationFrame( animateSHIELD );
						renderSHIELD(); 
					}
			stats.update();
		}

		function renderSHIELD() {

			controls.update();

			renderer.render( scene, camera );

		}


		function explodeSHIELD(){

			timer += 0.001;

			uniforms.amplitude.value = 1.0 + Math.sin( timer * 50);

			if (uniforms.amplitude.value <= 0.0005) {
				anim = false;
			}

			controls.update();

			renderer.render( scene, camera );

		}
