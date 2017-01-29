		if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

		var renderer, scene, camera, stats;

		var mesh, uniforms;
		var anim = true;
		var timer = 0;
		var WIDTH = window.innerWidth,
			HEIGHT = window.innerHeight;

			
			

		function initCSS() {

			
			camera = new THREE.PerspectiveCamera( 40, WIDTH / HEIGHT, 1, 10000 );
			camera.position.set( -10, 10, 20 );

			controls = new THREE.TrackballControls( camera );

			scene = new THREE.Scene();

			var numFaces = 101;
			//var numFaces = geometry.faces.length;

			var colors = new Float32Array( numFaces * 3 * 3 );
			var colors2 = new Float32Array( numFaces * 3 * 3 );
				var displacement = new Float32Array( numFaces * 3 * 3 );

				var color = new THREE.Color();
				for ( var f = 0; f < numFaces; f ++ ) {

					var index = 9 * f;

					var h = 1;
					var s = 1;
					var l = 0.5;

					color.setHSL( h, s, l );

					var d = 7 * ( 0.5 - Math.random() );

					for ( var i = 0; i < 3; i ++ ) {

						colors[ index + ( 3 * i ) + 5  ] = color.r;
						colors[ index + ( 3 * i ) + 1 ] = color.g;
						colors[ index + ( 3 * i )] = color.b;

						displacement[ index + ( 3 * i )     ] = d;
						displacement[ index + ( 3 * i ) + 1 ] = d;
						displacement[ index + ( 3 * i ) + 2 ] = d;
					}
				}

				var color2 = new THREE.Color();
				for ( var f = 0; f < numFaces; f ++ ) {

					var index = 9 * f;

					var h = 1;
					var s = 1;
					var l = 0.5;

					color.setHSL( h, s, l );

					var d = 7 * ( 0.5 - Math.random() );

					for ( var i = 0; i < 3; i ++ ) {
						colors2[ index + ( 3 * i )] = color.r;
						colors2[ index + ( 3 * i )] = color.g;
						colors2[ index + ( 3 * i )] = color.b;
					}
				}

				uniforms = {

					amplitude: { value: 0.0 },

				};

				var shaderMaterial = new THREE.ShaderMaterial( {

					uniforms:       uniforms,
					vertexShader:   document.getElementById( 'vertexshader' ).textContent,
					fragmentShader: document.getElementById( 'fragmentshader' ).textContent

				});

			var loader = new THREE.JSONLoader();

			loader.load('json/css.json', function(CSSgeometry) {
				console.log("CSS:")
				console.log(CSSgeometry)
				console.log(" ")
				var tessellateModifier = new THREE.TessellateModifier( 3 );
				for ( var i = 0; i < 100; i ++ ) {
					tessellateModifier.modify( CSSgeometry );
				}
				CSSgeometry.center();
				var explodeModifier = new THREE.ExplodeModifier();
				explodeModifier.modify( CSSgeometry );

				CSSgeometry1 = new THREE.BufferGeometry().fromGeometry( CSSgeometry );

				CSSgeometry1.addAttribute( 'customColor', new THREE.BufferAttribute( colors2, 3 ) );
				CSSgeometry1.addAttribute( 'displacement', new THREE.BufferAttribute( displacement, 3 ) );

				meshCSS = new THREE.Mesh( CSSgeometry1, shaderMaterial );

				scene.add( meshCSS );

			});
			var loader2 = new THREE.JSONLoader();

			loader2.load('json/shield.json', function(SHIELDgeometry) {
				console.log("Shield:")
				console.log(SHIELDgeometry)
				console.log(" ")
				var tessellateModifier = new THREE.TessellateModifier( 3 );
				for ( var i = 0; i < 100; i ++ ) {
				//	tessellateModifier.modify( SHIELDgeometry );
				}
				SHIELDgeometry.center();
				var explodeModifier = new THREE.ExplodeModifier();
				explodeModifier.modify( SHIELDgeometry );

				SHIELDgeometry1 = new THREE.BufferGeometry().fromGeometry( SHIELDgeometry );

				SHIELDgeometry1.addAttribute( 'customColor', new THREE.BufferAttribute( colors, 3 ) );
				SHIELDgeometry1.addAttribute( 'displacement', new THREE.BufferAttribute( displacement, 3 ) );

				meshSHIELD = new THREE.Mesh( SHIELDgeometry1, shaderMaterial );

				scene.add( meshSHIELD );

			});


				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setClearColor( 0x050505 );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( WIDTH, HEIGHT );

				var container = document.getElementById( 'container' );
				container.appendChild( renderer.domElement );

				stats = new Stats();
				container.appendChild( stats.dom );

			window.addEventListener( 'resize', onWindowResize, false );
			
		}

		function onWindowResize() {

			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();

			renderer.setSize( window.innerWidth, window.innerHeight );

		}

		
		var req;
		function animateCSS() {

					if (anim) {
						cancelAnimationFrame(req)
						req = requestAnimationFrame( animateCSS );
						explodeCSS();
					} else {
						cancelAnimationFrame(req)
						req = requestAnimationFrame( animateCSS );
						renderCSS(); 
					}
			stats.update();
		}

		function renderCSS() {
			meshSHIELD.position.z = -0.6;
			controls.update();

			renderer.render( scene, camera );

		}


		function explodeCSS(){
			meshSHIELD.position.z = -0.6;
			timer += 0.001;
			//shaderMaterial.transpanent = true;
			uniforms.amplitude.value = 1.0 + Math.sin( timer * 50);
			if (uniforms.amplitude.value <= 0.0005) {
				anim = false;
			}

			controls.update();

			renderer.render( scene, camera );

		}
