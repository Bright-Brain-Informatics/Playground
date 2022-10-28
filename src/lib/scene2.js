import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
// import * as Materials from 'babylonjs-materials';
export class CustomNode extends BABYLON.TransformNode {

    _mesh;
    _color;

    constructor(name, scene, color) {
        super(name, scene);

        this._mesh = BABYLON.MeshBuilder.CreateBox("box", { size: 2 }, scene);
        this._mesh.parent = this;
        this._mesh.material = new BABYLON.StandardMaterial("material", scene);

        // Set initial color.
        this.color = color;

        // Custom inspector properties.
        this.inspectableCustomProperties = [
            {
                label: "My color field",
                propertyName: "color",
                type: BABYLON.InspectableType.Color3
            }
        ];
    }

    set color(value) {
        this._color = value;
        this._mesh.material.diffuseColor = value;
    }

    get color() {
        return this._color;
    }
}

export const createScene = function (canvas) {
    const engine = new BABYLON.Engine(canvas, true);

    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -7), scene);

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    // Instantiate custom nodes.
    const myCustomNode1 = new CustomNode("myCustomNode1", scene, BABYLON.Color3.Green());
    myCustomNode1.position.x = -1.5;
    const myCustomNode2 = new CustomNode("myCustomNode2", scene, BABYLON.Color3.Red());
    myCustomNode2.position.x = 1.5;

    // Show inspector.
    scene.debugLayer.show({
        embedMode: true,
    });

    return scene;
};