// Move the light with the camera
export default (scene) => {
	scene.registerBeforeRender(function () {
		light.position = camera.position;
	});
};
