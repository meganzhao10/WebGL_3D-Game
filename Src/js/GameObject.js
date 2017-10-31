"use strict"; 
let GameObject = function(mesh) { 
  this.mesh = mesh;
  this.position = new Vec3(0, 0, 0); 
  this.orientation = 0; 
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
    rotate(this.orientation).
    translate(this.position);
};

GameObject.prototype.draw = function(camera,lightSource){ 
  this.updateModelMatrix();
// TODO: Set the uniform modelViewProjMatrix (reflected in the material) to modelMatrix multiplied by the camera’s viewProjMatrix. Use Mat4 methods set() and/or mul().
  //this.mesh.setUniform("modelViewProjMatrix",this.modelMatrix.mul(camera.viewProjMatrix));
  
  Material.modelViewProjMatrix.set(this.modelMatrix).mul(camera.viewProjMatrix);
  Material.modelMatrix.set(this.modelMatrix);
  Material.modelMatrixInverse.set(this.modelMatrix).invert();
  Material.lightPos.set(lightSource.lightPos);
  Material.powerDensity.set(lightSource.powerDensity);
  //this.mesh.setUniform("lightPos",lightSource);
  // this.mesh.material.modelViewProjMatrix.set().
  // 	mul(this.modelMatrix).
  //   mul(camera.viewProjMatrix);
  //Material.lightPos[0].set(0.5,0.7,0.3);
  this.mesh.draw(); 
};

