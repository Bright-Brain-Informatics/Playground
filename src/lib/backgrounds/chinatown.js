	export default (scene) => {
        var hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData('textures/environment.dds', scene);
        var currentSkybox = scene.createDefaultSkybox(hdrTexture, true);
    }// Create a default skybox with an environment.
