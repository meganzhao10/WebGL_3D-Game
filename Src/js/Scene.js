"use strict";
let Scene = function(gl) {
  this.texturevsIdle = new Shader(gl, gl.VERTEX_SHADER, "texture_idle_vs.essl");
  this.texturefsSolid = new Shader(gl, gl.FRAGMENT_SHADER, "texture_fs.essl");
  this.textureProgram = new TexturedProgram(gl,this.texturevsIdle,this.texturefsSolid);
  //this.TexturedQuadGeometry = new TexturedQuadGeometry(gl);

  this.gameObjects = [];

  this.carMaterial = new Material(gl,this.textureProgram);
  this.carTexture = new Texture2D(gl, 'json/chevy/chevy.png');
  this.carMaterial.colorTexture.set(this.carTexture.glTexture);
  this.carMesh = new MultiMesh(gl,"json/chevy/chassis.json",[this.carMaterial]);
  this.carObject = new GameObject(this.carMesh);
  this.gameObjects.push(this.carObject);

  this.heli1Material = new Material(gl,this.textureProgram);
  this.heli1Texture = new Texture2D(gl, 'json/heli/heli.png');
  this.heli1Material.colorTexture.set(this.heli1Texture.glTexture);
  this.heli1Mesh = new MultiMesh(gl,"json/heli/heli1.json",[this.heli1Material]);
  this.heli1Object = new GameObject(this.heli1Mesh);  
  this.gameObjects.push(this.heli1Object);


  this.lightSource = new LightSource();
  this.lightSource.lightPos = new Vec4Array(1);
  this.lightSource.lightPos.at(0).set(0,0,1,0);
  this.lightSource.powerDensity = new Vec4Array(1);
  this.lightSource.powerDensity.at(0).set(0.5,0.5,0.5,0.5);  

  this.camera = new PerspectiveCamera();
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

  for (var i = 0; i < this.gameObjects.length; i++){
      this.gameObjects[i].draw(this.camera, this.lightSource);
      this.gameObjects[i].scale.set(0.005,0.005,0.005);
      this.gameObjects[i].orientation = 1.5;
  }

      // this.gameObjects[1].draw(this.camera, this.lightSource);
      // this.gameObjects[1].scale.set(0.005,0.005,0.005);
      // this.gameObjects[1].orientation = 1.5;

}




