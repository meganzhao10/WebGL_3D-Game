"use strict";
let Scene = function(gl) {
  this.texturevsIdle = new Shader(gl, gl.VERTEX_SHADER, "texture_idle_vs.essl");
  this.texturefsSolid = new Shader(gl, gl.FRAGMENT_SHADER, "texture_fs.essl");
  this.texturefsShadow = new Shader(gl, gl.FRAGMENT_SHADER, "shadow_fs.essl");
  this.textureProgram = new TexturedProgram(gl,this.texturevsIdle,this.texturefsSolid);
  this.shadowProgram = new TexturedProgram(gl,this.texturevsIdle,this.texturefsShadow);

  this.gameObjects = [];

  this.shadowMaterial = new Material(gl, this.shadowProgram);

  //ground object
  this.TexturedQuadGeometry = new TexturedQuadGeometry(gl);
  this.quadMaterial = new Material(gl, this.textureProgram);
  this.quadTexture = new Texture2D(gl, 'json/ground.png');
  this.quadMaterial.colorTexture.set(this.quadTexture.glTexture);
  this.quadMesh = new Mesh(this.TexturedQuadGeometry,this.quadMaterial); 
  this.quadObject = new GameObject(this.quadMesh);
  this.quadObject.ground = true;
  this.gameObjects.push(this.quadObject);
  
  //car object
  this.carMaterial = new Material(gl,this.textureProgram);
  this.carTexture = new Texture2D(gl, 'json/chevy/chevy.png');
  this.carMaterial.colorTexture.set(this.carTexture.glTexture);
  this.carMesh = new MultiMesh(gl,"json/chevy/chassis.json",[this.carMaterial]);
  this.carObject = new GameObject(this.carMesh);
  this.carObject.position.set(0,0.05,4.0);
  this.carObject.orientation = 3.2;
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
  this.heli1Object.position.set(0.5,0,3.0); 
  this.gameObjects.push(this.heli1Object);

  this.mainrotorMesh = new MultiMesh(gl,"json/heli/mainrotor.json",[this.heli1Material, this.heli1Material]);
  this.mainrotorObject = new GameObject(this.mainrotorMesh);  
  this.mainrotorObject.parent = this.heli1Object;
  this.mainrotorObject.position.set(0.5,15,0);
  this.gameObjects.push(this.mainrotorObject);

  // this.alrscrewMesh = new MultiMesh(gl,"json/thunderbolt_airscrew.json",[this.heli1Material]);
  // this.alrscrewObject = new GameObject(this.alrscrewMesh);
  // this.gameObjects.push(this.alrscrewObject);
  this.treeMaterial = new Material(gl,this.textureProgram);
  this.treeTexture = new Texture2D(gl, 'json/tree.png');
  this.treeMaterial.colorTexture.set(this.treeTexture.glTexture);
  this.treeMesh = new MultiMesh(gl,"json/tree.json",[this.treeMaterial]);
  this.treeObject1 = new GameObject(this.treeMesh);
  this.treeObject2 = new GameObject(this.treeMesh);
  this.treeObject3 = new GameObject(this.treeMesh);
  this.treeObject1.position.set(Math.random()*2,0,Math.random()*2);
  this.treeObject2.position.set(Math.random()*2,0,Math.random()*2);
  this.treeObject3.position.set(Math.random()*2,0,Math.random()*2);
  this.gameObjects.push(this.treeObject1);
  this.gameObjects.push(this.treeObject2);
  this.gameObjects.push(this.treeObject3);
  


  this.lightSource = new LightSource();
  this.lightSource.lightPos = new Vec4Array(2);
  this.lightSource.lightPos.at(0).set(0,1,1,0); // the last 0 indicates that it's a directional light
  this.lightSource.lightPos.at(1).set(this.carObject.position.x,this.carObject.position.y,
    this.carObject.position.z, 1);
  this.lightSource.lightPowerDensity = new Vec4Array(2);
  this.lightSource.lightPowerDensity.at(0).set(0.9,0.9,0.9,1); 
  this.lightSource.lightPowerDensity.at(1).set(5,5,5,1);
  this.lightSource.mainDir = new Vec4();
  //powerDensity for directional light between 0 and 1
  //powerDensity for point light (10, 100, 1000,1), if white surface with this source, would be mostly blue, things that are close to it will be green, things really close will be white
  
  this.camera = new PerspectiveCamera();
  this.camera.position.set(this.carObject.position.x,this.carObject.position.y+0.1, this.carObject.position.z+0.7);
  this.rotation = 0;
};


Scene.prototype.update = function(gl, keysPressed) {  
  let timeAtThisFrame = new Date().getTime();
  let dt = (timeAtThisFrame - this.timeAtLastFrame) / 1000.0;
  this.timeAtLastFrame = timeAtThisFrame;
  let speed = 0.5;
  

  // clear the screen
  gl.clearColor(223/255, 208/255, 159/255, 1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.clearDepth(1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  this.rotation += 0.03;
  this.mainrotorObject.orientation = this.rotation;
  this.mainrotorObject.rotateAxis.set(0, 1, 0);
  this.carObject.rotateAxis.set(0,1,0);
  this.camera.move(dt,keysPressed);
  

  if(keysPressed.LEFT) { 
    this.heli1Object.position.add(-speed * dt,0,0); 
  } 
  if(keysPressed.RIGHT) { 
    this.heli1Object.position.add(speed * dt,0,0); 
  } 
  if(keysPressed.UP) { 
    this.heli1Object.position.add(0,0,-speed * dt); 
  } 
  if(keysPressed.DOWN) { 
    this.heli1Object.position.add(0,0,speed * dt); 
  } 
  if(keysPressed.J) { 
    this.carObject.orientation += 0.03;
    var x = new Mat4();
    x.set().rotate(this.carObject.orientation,this.carObject.rotateAxis);
    this.carObject.direction.set(0,0,1,0).mul(x);

    //this.camera.ahead.set(-this.carObject.direction.x, this.carObject.direction.y * 0.5, this.carObject.direction.z * 0.5);
  } 
  if(keysPressed.L) { 
    this.carObject.orientation -= 0.03;
    var y = new Mat4();
    y.set().rotate(this.carObject.orientation,this.carObject.rotateAxis);
    this.carObject.direction.set(0,0,1,0).mul(y);
    //this.camera.position.set(this.carObject.position.x,this.carObject.position.y+0.1, this.carObject.position.z+0.7);
    //this.camera.ahead.set(-this.carObject.direction.x, this.carObject.direction.y * 0.5, -this.carObject.direction.z * 0.1);
  } 
  if(keysPressed.I) { 
    this.carObject.position.add(this.carObject.direction.x * 0.02,this.carObject.direction.y,this.carObject.direction.z * 0.02); 
    this.camera.position.set(this.carObject.position.x,this.carObject.position.y+0.1, this.carObject.position.z+0.7);
  } 
  if(keysPressed.K) { 
    this.carObject.position.add(-this.carObject.direction.x * 0.02,-this.carObject.direction.y,-this.carObject.direction.z * 0.02); 
    this.camera.position.set(this.carObject.position.x,this.carObject.position.y+0.1, this.carObject.position.z+0.7);
  } 

  this.lightSource.lightPos.at(1).set(this.carObject.position.x+this.carObject.direction.x * 0.2,
    this.carObject.position.y + this.carObject.direction.y * 0.2,
    this.carObject.position.z + this.carObject.direction.z * 0.2,1);
  this.lightSource.mainDir.set(this.carObject.direction);




  for (var i = 0; i < this.gameObjects.length; i++){
      
      if(this.gameObjects[i].parent == null){
        this.gameObjects[i].scale.set(0.01,0.01,0.01);
      }
      this.gameObjects[i].draw(this.camera, this.lightSource);
      if (!this.gameObjects[i].ground){
        this.gameObjects[i].drawShadow(this.camera, this.shadowMaterial, this.lightSource.lightPos.at(0));
      }
  }

}




