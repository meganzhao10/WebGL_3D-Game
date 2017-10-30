"use strict"; 
let Mesh = function(geometry, material) {
  this.geometry = geometry;
  this.material = material;
};
 
Mesh.prototype.draw = function(){
  this.material.commit();
  this.geometry.draw();
};

Mesh.prototype.setUniform = function(uniformName,uniformValue){
	this.material[uniformName].set(uniformValue);
};