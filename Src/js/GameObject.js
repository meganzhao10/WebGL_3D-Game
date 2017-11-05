"use strict"; 
let GameObject = function(mesh) { 
  this.mesh = mesh;
  this.parent = null;
  this.position = new Vec3(0, 0, 0); 
  this.orientation = 0;
  this.rotateAxis = new Vec3(0,0,0);
  this.scale = new Vec3(0.45, 0.45, 1); 
  this.angularVelocity = 0;
  this.modelMatrix = new Mat4(); 
};


GameObject.prototype.updateModelMatrix = function(){ 
// TODO: set the model matrix according to the 
// position, orientation, and scale
  this.modelMatrix.set().
    scale(this.scale).
    translate(0,0,0).
    rotate(this.angularVelocity).
    rotate(this.orientation,this.rotateAxis).
    translate(this.position);

};

GameObject.prototype.draw = function(camera,lightSource){ 
  this.updateModelMatrix();
// TODO: Set the uniform modelViewProjMatrix (reflected in the material) to modelMatrix multiplied by the camera’s viewProjMatrix. Use Mat4 methods set() and/or mul().
  //this.mesh.setUniform("modelViewProjMatrix",this.modelMatrix.mul(camera.viewProjMatrix));

  Material.modelViewProjMatrix.set(this.modelMatrix);
  if (this.parent != null){
  	Material.modelViewProjMatrix.mul(this.parent.modelMatrix);
  }
  Material.modelViewProjMatrix.mul(camera.viewProjMatrix);

  Material.modelMatrix.set(this.modelMatrix);
  Material.modelMatrixInverse.set(this.modelMatrix).invert();

  Material.spotLightDirection.set(lightSource.spotLightDirection);
    Material.powerDensity = lightSource.powerDensity;
  Material.lightPos = lightSource.lightPos;
  this.mesh.draw(); 
};


