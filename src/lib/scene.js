import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import camera1 from './cameras/default'
import background from './backgrounds/chinatown'
// import * as Materials from 'babylonjs-materials';
export const createScene = (canvas) => {
	const engine = new BABYLON.Engine(canvas, true);
	var scene = new BABYLON.Scene(engine);

	//Adding a light
	var light = new BABYLON.PointLight('Omni', new BABYLON.Vector3(20, 20, 100), scene);


	//Adding an Arc Rotate Camera
	var camera = new BABYLON.ArcRotateCamera("camera", BABYLON.Tools.ToRadians(145), BABYLON.Tools.ToRadians(130), 2.4, new BABYLON.Vector3(0, 2.2, -.4), scene);	camera.attachControl(canvas, false);
	

    camera.setTarget(BABYLON.Vector3.Zero());

	background(scene)
	var assetsManager = new BABYLON.AssetsManager(scene);


	var meshTask = assetsManager.addMeshTask('Brain task', '', 'scenes/', 'Brain-With-Material.obj');

	meshTask.onSuccess = function (task) {
		task.loadedMeshes[0].position = BABYLON.Vector3.Zero();
		task.loadedMeshes[0].scaling.x = 7;
		task.loadedMeshes[0].scaling.y = 7;
		task.loadedMeshes[0].scaling.z = 7; 
		scene.clearColor = new BABYLON.Color3(0.0, 0.0, 0.0); // The Orb is made of several particle systems // 1st Particle Sytem - Circles
		BABYLON.ParticleHelper.CreateFromSnippetAsync('2JRD1A#2', scene, false); // 2nd Particle Sytem - Core
		BABYLON.ParticleHelper.CreateFromSnippetAsync('EXUQ7M#5', scene, false);
		BABYLON.ParticleHelper.CreateFromSnippetAsync('UY098C#3', scene, false).then((system) => {
			system.emitter = task.loadedMeshes[0];
		}); // 4th Particle Sytem - Smoke
		
		BABYLON.ParticleHelper.CreateFromSnippetAsync('UY098C#6', scene, false).then((system) => {
			system.emitter = task.loadedMeshes[0];
		});
	
	};

	
	
	// Create the "God Rays" effect (volumetric light scattering)
	var godrays = new BABYLON.VolumetricLightScatteringPostProcess('godrays', 1.0, camera, null, 100, BABYLON.Texture.BILINEAR_SAMPLINGMODE, engine, false);

	// By default it uses a billboard to render the sun, just apply the desired texture
	// position and scale
	godrays.mesh.material.diffuseTexture = new BABYLON.Texture('textures/sun.png', scene, true, false, BABYLON.Texture.BILINEAR_SAMPLINGMODE);
	godrays.mesh.material.diffuseTexture.hasAlpha = true;
	godrays.mesh.position = new BABYLON.Vector3(-450, 150, 150);
	godrays.mesh.scaling = new BABYLON.Vector3(350, 350, 350);

	light.position = godrays.mesh.position;



	// Create a default arc rotate camera and light.

	// The default camera looks at the back of the asset.
	// Rotate the camera by 180 degrees to the front of the asset.
	scene.activeCamera.alpha += Math.PI;
	// Append glTF model to scene.

	assetsManager.load();

	assetsManager.onFinish = function (tasks) {
		engine.runRenderLoop(function () {
			scene.render();
		});
	};



	// Show inspector.

	window.addEventListener('resize', () => {
		engine.resize();
	  });
	return scene;
};
