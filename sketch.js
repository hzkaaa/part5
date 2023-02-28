let num = 70;

let scl = 10;
let offset = scl / 2

let cols, rows;
let xoff = 0;
let yoff = 0;

let density = 25
let attractor 
let speedAttractor = 4
let texture
function setup() {

    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0,0);
    canvas.style('z-index','-1');

	pixelDensity(1)


	noStroke()
//texture-- noise with a bit randomness thrown in, pixel array of buffer,
	//which is rendered once in setup and drawn over canvas every frame at the end of draw
	texture=createGraphics(windowWidth, windowHeight)
	texture.pixelDensity(1)
	texture.loadPixels()
	for(let x=0; x<width; x++){
		for(let y=0; y<height; y+=floor(random(0, 10))){
	var index = (x + y * width)*4;
		let avalue= map(noise(x/00, y/100), -1, 1, 0, 60)
	  texture.pixels[index+0]= 0;
    texture.pixels[index+1]= 0;
    texture.pixels[index+2]= 0;
    texture.pixels[index+3]= avalue;		
		}
	}
	texture.updatePixels()

	cols = floor(width / scl);
	rows = floor(height / scl);
	  initialize() 
  
}
function initialize() {

	xoff = random()
	  yoff = random()		
	  let x = (width) / 2
	  let y = (height) / 2
	  attractor = createVector(x, y);
  }
  
  function mouseClicked() {
	  initialize() 
	  attractor.x = mouseX
	  attractor.y = mouseY	
  }

function draw() {

	textFont("koshy",30);

	background(255);
	push();
	for (let y = 0; y < height; y += height / num) {
		drawingContext.save();
		noStroke(0);
		fill(147,127,56);
		rect(0, y, width, height / num);
		drawingContext.clip();
		fill(88,44,15);
		translate(-500,-500)
		text("That with music loud and long,", width   , height  + 30* tan(frameCount * 0.05 + 1.5 * noise(y)));
		translate(-500,-450)
		text("I would build that dome in air,", width  , height + 30 * tan(frameCount * 0.05 + 1.5 * noise(y)));
		
		translate(100,100)
		text("That sunny dome! those caves of ice!", width-30 * tan(frameCount * 0.05 + 1.5 * noise(y)) , height / 2 + 50 * tan(frameCount * 0.05 + 1.5 * noise(y)));
		
		translate(200,100)
		text("And all who heard should see them there,", width / 2  , height / 2 + 50 * tan(frameCount * 0.05 + 1.5 * noise(y)));
		translate(200,150)
		text("And all should cry, Beware! Beware!", width / 2  , height / 2 + 50 * tan(frameCount * 0.05 + 1.5 * noise(y)));
		
		translate(-250,300)
		text("His flashing eyes, his floating hair!", width / 2  , height / 2 + 50 * tan(frameCount * 0.05 + 1.5 * noise(y)));
		
		translate(400,400)
		text("And all who heard should see them there,", width / 2  , height / 2 + 50 * tan(frameCount * 0.05 + 1.5 * noise(y)));
		translate(400,450)
		text("And close your eyes with holy dread:", width / 2  , height / 2 + 50 * tan(frameCount * 0.05 + 1.5 * noise(y)));
		
		translate(-300,500)
		text("For he on honey-dew hath fed,", width / 2  , height / 2 + 50 * tan(frameCount * 0.05 + 1.5 * noise(y)));
		translate(-300,550)
		text("And drank the milk of Paradise.", width / 2  , height / 2 + 50 * tan(frameCount * 0.05 + 1.5 * noise(y)));
		drawingContext.restore();
	}
	pop();

	xoff += 0.01;
	yoff += 0.001;
	  
	  showAttractor() 
	  
	  // strokeWeight(1);
	  noStroke()
	  let maxDistance = maxDist()
	for (let x = 0; x < cols; x++) {
	  for (let y = 0; y < rows; y++) {
			  let angle = noise((x / density)*xoff, (y/density) * yoff) * TWO_PI ;
		let index = x + y * cols;
			  let v = p5.Vector.fromAngle(angle);
			  let xx = offset/2 + x * scl
			  let yy = offset/2 + y * scl
			  let distance = dist(xx, yy, attractor.x, attractor.y);
		let colorValue = map(distance, 0, maxDistance, 0, 152);
		fill(colorValue, 60, 22, 50);
		
		push();
		translate(xx, yy);
		rotate(v.heading());
			  ellipse(0, 0, distance/2, scl/2);
		pop(); 
	  }
	}

	  moveAttractor()

	  image(texture, 0, 0)
  }
  

  function maxDist() {
	let maxDistance = dist(0, 0, attractor.x, attractor.y);
	maxDistance = max(maxDistance, dist(width, 0, attractor.x, attractor.y));
	maxDistance = max(maxDistance, dist(0, height, attractor.x, attractor.y));
	maxDistance = max(maxDistance, dist(width, height, attractor.x, attractor.y));
	return maxDistance / 3 * 2
  }
  
  function showAttractor() {
	  let c = color("#503714" + "AA")
	  let numberOfCircles = 30;
	  let circleSpace = 20
	  
	  noStroke();
	  fill(c)
	  // circle(attractor.x, attractor.y, 20)
	  noFill()  
	  strokeWeight(circleSpace/10)
	  
	  for (let i = 0; i <= numberOfCircles; i++) {
	  let r = circleSpace * (i+ 2 );
	  let alpha = lerp(100, 50, i / numberOfCircles);
	  let c = color("#503714");
	  c.setAlpha(alpha);
	  stroke(c); 
	  circle(attractor.x, attractor.y, r);
	}
	  return
	  line(0,0,attractor.x, attractor.y)
	  line(width,0,attractor.x, attractor.y)		
	  line(0,height,attractor.x, attractor.y)
	  line(width,height,attractor.x, attractor.y)		
  }
  
  function moveAttractor() {
	attractor.x += random(-speedAttractor, speedAttractor);
	attractor.y += random(-speedAttractor, speedAttractor);
	if (attractor.x < 0) {
	  attractor.x = width;
	} else if (attractor.x > width) {
	  attractor.x = 0;
	}
	if (attractor.y < 0) {
	  attractor.y = height;
	} else if (attractor.y > height) {
	  attractor.y = 0;
	}
  }
  
  