export default (scene) => {
    var assetsManager = new BABYLON.AssetsManager(scene);
    var meshTask = assetsManager.addMeshTask('skull task', '', 'scenes/', 'Brain-No-Material.obj');
    
    meshTask.onSuccess = function (task) {
        task.loadedMeshes[0].position = BABYLON.Vector3.Zero();
        task.loadedMeshes[0].scaling.x = 12
        task.loadedMeshes[0].scaling.y = 12
        task.loadedMeshes[0].scaling.z = 12  
    };
    return meshTask;
}
