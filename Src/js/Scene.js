"use strict";
let Scene = function(gl) {
  this.texturevsIdle = new Shader(gl, gl.VERTEX_SHADER, "texture_idle_vs.essl");
  this.texturefsSolid = new Shader(gl, gl.FRAGMENT_SHADER, "texture_fs.essl");

  this.textureProgram = new TexturedProgram(gl,this.texturevsIdle,this.texturefsSolid);

  this.TexturedQuadGeometry = new TexturedQuadGeometry(gl);

  this.carTexture = new Texture2D(gl, 'json/chevy/chevy.png');
  //this.subTexture2 = new Texture2D(gl, 'slowpoke/YadonEyeDh.png');
  this.carMaterial = new Material(gl,this.textureProgram);
  this.carMaterial.colorTexture.set(this.carTexture.glTexture);
  //this.subMaterial2.colorTexture.set(this.subTexture2.glTexture);
  
  //this.subMaterial2 = new Material(gl,this.textureProgram); 
  this.multiMesh = new MultiMesh(gl,"json/chevy/chassis.json",[this.carMaterial]);
  this.multiMeshObject = new GameObject(this.multiMesh);

  this.camera = new PerspectiveCamera();
  this.lightSource = new Vec4Array(1);
  this.lightSource.at(0).set(1,1,1,0);
  //this.lightSource.at(1).set(0.6,0.6,0.6,0.6);
};


Scene.prototype.update = function(gl, keysPressed) {  
  let timeAtThisFrame = new Date().getTime();
  let dt = (timeAtThisFrame - this.timeAtLastFrame) / 1000.0;
  this.timeAtLastFrame = timeAtThisFrame;

  this.camera.move(dt,keysPressed);

  // clear the screen
  gl.clearColor(223/255, 208/255, 159/255, 1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.clearDepth(1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  this.multiMeshObject.draw(this.camera, this.lightSource);
  this.multiMeshObject.scale.set(0.005,0.005,0.005);
  this.multiMeshObject.orientation = 1.5;


}




