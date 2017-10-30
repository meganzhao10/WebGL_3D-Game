"use strict";
let Scene = function(gl) {
  this.texturevsIdle = new Shader(gl, gl.VERTEX_SHADER, "texture_idle_vs.essl");
  this.texturefsSolid = new Shader(gl, gl.FRAGMENT_SHADER, "texture_fs.essl");

  this.textureProgram = new TexturedProgram(gl,this.texturevsIdle,this.texturefsSolid);

  this.TexturedQuadGeometry = new TexturedQuadGeometry(gl);

  // this.textureMaterial = new Material(gl, this.textureProgram);
  // this.newTexture = new Texture2D(gl, 'asteroid.png');
  // this.textureMaterial.colorTexture.set(this.newTexture.glTexture);
  // this.textureMesh = new Mesh(this.TexturedQuadGeometry,this.textureMaterial);
  // this.textureObject = new GameObject(this.textureMesh);

  // this.subTexture1 = new Texture2D(gl, 'slowpoke/YadonDh.png');
  // this.subTexture2 = new Texture2D(gl, 'slowpoke/YadonEyeDh.png');
  // this.subMaterial1.colorTexture.set(this.subTexture1.glTexture);
  // this.subMaterial2.colorTexture.set(this.subTexture2.glTexture);
  this.subMaterial1 = new Material(gl,this.textureProgram);
  this.subMaterial2 = new Material(gl,this.textureProgram); 
  this.multiMesh = new MultiMesh(gl,"json/chevy/chassis.json",[this.subMaterial1,this.subMaterial2]);
  this.multiMeshObject = new GameObject(this.multiMesh);

  this.camera = new PerspectiveCamera();
  this.lightSource = [];

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
  this.multiMeshObject.scale.set(0.01,0.01,0.01);
  this.multiMeshObject.orientation = 1.5;


}




