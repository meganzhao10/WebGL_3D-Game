"use strict"; 
let Material = function(gl, program) { 
  this.gl = gl; 
  this.program = program; 
  let theMaterial = this; 

  Object.keys(program.uniforms).forEach(function(uniformName) { 
    let uniform = program.uniforms[uniformName]; 
    let reflectionVariable = 
        UniformReflectionFactories.makeVar(gl,
                              uniform.type, uniform.size,uniform.textureUnit); 
        if(!Material[uniformName]) {
          Object.defineProperty(theMaterial, uniformName,
              {value: reflectionVariable} ); 
        }

  }); 
}; 

Object.defineProperty(Material,
 "modelViewProjMatrix", {value: new Mat4()} );
Object.defineProperty(Material,
 "modelMatrix", {value: new Mat4()} );
Object.defineProperty(Material,
 "modelMatrixInverse", {value: new Mat4()} );
Object.defineProperty(Material,
 "lightPos", {value: new Vec4Array()} );
Object.defineProperty(Material,
 "powerDensity", {value: new Vec4Array()} );


Material.prototype.commit = function() { 
  let gl = this.gl; 
  this.program.commit(); 
  let theMaterial = this; 
  Object.keys(this.program.uniforms).forEach( function(uniformName) { 
    let uniform = theMaterial.program.uniforms[uniformName];
    let reflectionVariable =
         Material[uniformName] || 
         theMaterial[uniformName]; 
    reflectionVariable.commit(gl,
                            uniform.location); 
  }); 
}; 

