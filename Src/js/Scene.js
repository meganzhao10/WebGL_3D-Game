"use strict";
let Scene = function(gl) {
  this.texturevsIdle = new Shader(gl, gl.VERTEX_SHADER, "texture_idle_vs.essl");
  this.texturefsSolid = new Shader(gl, gl.FRAGMENT_SHADER, "texture_fs.essl");
  this.textureProgram = new TexturedProgram(gl,this.texturevsIdle,this.texturefsSolid);
  //this.TexturedQuadGeometry = new TexturedQuadGeometry(gl);

  this.gameObjects = [];
  //car object
  this.carMaterial = new Material(gl,this.textureProgram);
  this.carTexture = new Texture2D(gl, 'json/chevy/chevy.png');
  this.carMaterial.colorTexture.set(this.carTexture.glTexture);
  this.carMesh = new MultiMesh(gl,"json/chevy/chassis.json",[this.carMaterial]);
  this.carObject = new GameObject(this.carMesh);
  this.carObject.position.set(0,0,-0.5);
  this.gameObjects.push(this.carObject);

  //car wheels
  this.wheelMesh = new MultiMesh(gl,"json/chevy/wheel.json",[this.carMaterial])
  this.wheel1Object = new GameObject(this.wheelMesh);  
  this.wheel1Object.parent = this.carObject;
  this.wheel1Object.position.set(6.5,-3.5,13.5);
  this.wheel1Object.scale.set(1,1,1);
  this.gameObjects.push(this.wheel1Object);

  this.wheel2Object = new GameObject(this.wheelMesh);  
  this.wheel2Object.parent = this.carObject;
  this.wheel2Object.position.set(6.5,-3.5,-11.5);
  this.wheel2Object.scale.set(1,1,1);
  this.gameObjects.push(this.wheel2Object);

  this.wheel3Object = new GameObject(this.wheelMesh);  
  this.wheel3Object.parent = this.carObject;
  this.wheel3Object.position.set(-6.5,-3.5,13.5);
  this.wheel3Object.scale.set(1,1,1);
  this.gameObjects.push(this.wheel3Object);

  this.wheel4Object = new GameObject(this.wheelMesh);  
  this.wheel4Object.parent = this.carObject;
  this.wheel4Object.position.set(-6.5,-3.5,-11.5);
  this.wheel4Object.scale.set(1,1,1);
  this.gameObjects.push(this.wheel4Object);

  //helicoptor
  this.heli1Material = new Material(gl,this.textureProgram);
  this.heli1Texture = new Texture2D(gl, 'json/heli/heli.png');
  this.heli1Material.colorTexture.set(this.heli1Texture.glTexture);
  this.heli1Mesh = new MultiMesh(gl,"json/heli/heli1.json",[this.heli1Material]);
  this.heli1Object = new GameObject(this.heli1Mesh); 
  this.heli1Object.position.set(0.2,0,-0.4); 
  this.gameObjects.push(this.heli1Object);

  this.mainrotorMesh = new MultiMesh(gl,"json/heli/mainrotor.json",[this.heli1Material, this.heli1Material]);
  this.mainrotorObject = new GameObject(this.mainrotorMesh);  
  this.mainrotorObject.parent = this.heli1Object;
  this.mainrotorObject.position.set(0.5,15,0);
  this.gameObjects.push(this.mainrotorObject);


  this.lightSource = new LightSource();
  this.lightSource.lightPos = new Vec4Array(1);
  this.lightSource.lightPos.at(0).set(0,0,1,0); // the last 0 indicates that it's a directional light
  this.lightSource.powerDensity = new Vec4Array(1);
  this.lightSource.powerDensity.at(0).set(0.5,0.5,0.5,0.5);  
  //powerDensity for directional light between 0 and 1
  //powerDensity for point light (10, 100, 1000,1), if white surface with this source, would be mostly blue, things that are close to it will be green, things really close will be white
  
  this.camera = new PerspectiveCamera();
  this.rotation = 0;
};


Scene.prototype.update = function(gl, keysPressed) {  
  let timeAtThisFrame = new Date().getTime();
  let dt = (timeAtThisFrame - this.timeAtLastFrame) / 1000.0;
  this.timeAtLastFrame = timeAtThisFrame;
  let speed = 0.5;

  this.camera.move(dt,keysPressed);

  // clear the screen
  gl.clearColor(223/255, 208/255, 159/255, 1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.clearDepth(1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);



  for (var i = 0; i < this.gameObjects.length; i++){
      this.gameObjects[i].draw(this.camera, this.lightSource);
      if(this.gameObjects[i].parent == null){
        this.gameObjects[i].scale.set(0.005,0.005,0.005);
      }
  }
  this.rotation += 0.01;
  this.mainrotorObject.orientation = this.rotation;
  //this.mainrotorObject.orientation = new Vec4(this.rotation,0,0,0);

  if(keysPressed.LEFT) { 
    this.heli1Object.position.add(-speed * dt,0,0); 
  } 
  if(keysPressed.RIGHT) { 
    this.heli1Object.position.add(speed * dt,0,0); 
  } 
  if(keysPressed.J) { 
    this.carObject.position.add(-speed * dt,0,0); 
  } 
  if(keysPressed.L) { 
    this.carObject.position.add(speed * dt,0,0); 
  } 
  if(keysPressed.I) { 
    this.carObject.position.add(0,0,-speed * dt); 
  } 
  if(keysPressed.K) { 
    this.carObject.position.add(0,0,speed * dt); 
  } 

}




