# WebGL_3D-Game
Computer Graphics project - write an interactive 3D demo with OpenGL.


## Prerequisite
The page may not load because Chrome doesn't allow file access. Close Chrome, then start Chrome with the following command lines
```
# Windows - must start Chrome with command line switch
$ --allow_file_access_from_files

# Mac OS X terminal
$ open /Applications/Google\ Chrome.app --args --allow-file-access-from-files
```
## How to Open
```
# Clone this repository
$ git clone https://github.com/meganzhao/WebGL_3D-Game.git

# Go into the repository
$ cd WebGL_3D-Game

# Go into the source folder
$ cd Src

# Open the URL of the game
$ open index.html
```

## Demo
![Alt text](img-demo/slowpoke.png?raw=true "slowpoke")
![Alt text](img-demo/world.png?raw=true "world")


## Key and Mouse Control
 IJKL - MARBLE OBJECT SLOWPOKE       
 WASD - camera      
 mouse drag - camera

## Implementing Features
Avatar -

	The user should be able to move a vehicle or character (the avatar) with the keyboard and/or the mouse.



Sunshine (requires Highlander) - 

	A single non-vertical directional light source should illuminate your game world.



Highlander (requires Sunshine or Spotlight) -

	There should be at least one object with diffuse (Lambertian) shading, possibly combined with texturing.



Shining (requires Highlander, and Sunshine or Spotlight) -

	There should be at least one object with specular (diffuse + Phong-Blinn) shading, possibly combined with texturing.



Spotlight (requires Avatar and Highlander) -

	There should be at least one point light source fixed to the avatar. The point light should not be isotropic, but emit the largest intensity of light along a main direction, and fall off for directions further away from it. The spotlight should move along with the avatar as it moves and rotates.



The Matrix Revolutions (Avatar recommended) -

	The avatar, or some other prominent, moving object, should have at least one rotating part (wheel, propeller, rotor etc.).



Ground Zero -

	There should be a large (possibly infinite) ground plane, with some tileable texture repeated on it indefinitely.



Pitch Black (Ground Zero recommended) -

	Shadows of objects should appear on the ground to give a sense of altitude (or the lack of it). Draw objects in black, flattened to the ground along the light direction, slightly above the ground plane.

Tracking -

	Make the camera move to produce a tracking shot. When holding down key 'T', the camera should move along a path (e.g. a heart curve).


Dead Solid Perfect -

	Have at least one object with procedural solid texturing (e.g. wood or marble)---i.e. the pixel shader should compute color from world space position using some formula.

Keep Watching (requires Avatar) -

	Implement a helicam. The camera should always look at the avatar, or at the point where the avatar is immediately heading (position + velocity * something). The distance from the avatar needs to be kept reasonably constant.


## Potential Features

Who Framed Roger Rabbit (requires airborne Avatar) -

	Use the Frenet frame to rotate your avatar. In case of a fixed-winged aircraft: nose points the same direction as the velocity vector, wing points into direction velocity-cross-acceleration-normalized, and tail fin points into direction nose-cross-wing-normalized.

Planes on a Snake (requires Who Framed Roger Rabbit) -

	Implement path animation. Have at least three objects move along a single 3D rollercoaster curve, but starting at different points. For example, the curve could be given by x=R*cos(t), y=A*sin(3*t), z=R*sin(t), where x, y, z is the object's position at time t, with R and A being arbitrary constants. The model used for the objects must have a distinct ahead direction, and the object must always face ahead when moving (i.e. use Frenet frames). For this, the velocity vector should be analytically computed using the time derivative of the heart curve formula. The upwards vector should also be analytically computed using the second time derivative of the curve formula.

Post (requires extra research) -

	Implement a cartoonish post-processing filter. For this, create a render target texture, render the scene into the texture instead of the frame buffer, then display a single full-viewport quadrilateral with the render-target-texture mapped onto it. In the fragment shader used when displaying the quad, quantize colors from the texture to just a few levels.

A scanner darkly (requires Post and extra research) -

	In the post-processing fragment shader, implement edge detection by reading the render-target-texture at a few nearby sample points, and returning black if the texture colors are very different. 

