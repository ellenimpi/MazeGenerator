
var cols, rows;
var w = 40;
var grid = [];
var current;
var stack = [];
var visitedColor = '';
var currentColor = '';
var playMode = false;
// var gameSpeed = 0;

function setup() {
	createCanvas(400,400);
	cols = floor(width /w);
	rows = floor(height / w);
    frameRate(25);
	for (var y = 0; y < rows; y++) {
		for (var x =0; x < cols; x++) {
			var cell = new Cell(x,y);
			grid.push(cell);
		}
	}
	current = grid[0];
}

function draw() {
  if (visitedColor && !playMode){
	background(51);
	for (var i =0; i < grid.length; i++) {
		grid[i].show();
	}
	current.visited = true;
	current.highlight();
	var next = current.checkNeighbors();
	if (next) {
		next.visited = true;
		stack.push(current);
		removeWalls(current, next);
		current = next;
	} else if (stack.length > 0){
		current = stack.pop();
	}
    else{
      console.log("end");
      noLoop();
      playMode = true;
      loop();
    }
  }
  // else if (playMode){
  //   move();
  // }
}



function removeWalls(a,b) {
	var x = a.x - b.x;
	if (x === 1) {
		a.walls[3] = false;
		b.walls[1] = false;
	} else if (x === -1) {
		a.walls[1] = false;
		b.walls[3] = false;
	}
	var y = a.y - b.y;
	if (y === 1) {
		a.walls[0] = false;
		b.walls[2] = false;
	} else if (y === -1) {
		a.walls[2] = false;
		b.walls[0] = false;
	}
}

function index(x, y) {
	if (x < 0 || y < 0 || x > cols-1 || y > rows-1) {
		return -1;
	}
	return x + y * cols;
}
function Cell(x, y) {
	this.x = x;
	this.y = y;
	this.walls = [true, true, true, true];
	this.visited = false;

	this.checkNeighbors = function() {
		var neighbors = [];

		var top = grid[index(x, y-1)];
		var right = grid[index(x+1, y)];
		var bottom = grid[index(x, y+1)];
		var left = grid[index(x-1, y)];

		if (top && !top.visited) {
			neighbors.push(top);
		}
		if (right && !right.visited) {
			neighbors.push(right);
		}
		if (bottom && !bottom.visited) {
			neighbors.push(bottom);
		}
		if (left && !left.visited) {
			neighbors.push(left);
		}

		if (neighbors.length > 0) {
			var r = floor(random(0, neighbors.length));
			return neighbors[r];
		} else {
			return undefined;
		}
	}

	this.highlight = function() {
		var x = this.x*w;
		var y = this.y*w;
		noStroke();
		fill(currentColor);
		rect(x,y,w,w);
	}
  
    
	this.show = function() {
		var x = this.x*w;
		var y = this.y*w;
		stroke(255);

		

		if (this.walls[0]) {
			line(x,y,x+w,y); // Top line
		}
		if (this.walls[1]) {
		line(x+w,y,x+w,y+w); // Right line
	}
		if (this.walls[2]) {
		line(x+w,y+w,x,y+w); // Bottom line
		}
		if (this.walls[3]) {
		line(x,y+w,x,y); // Left line
		}

		if (this.visited) {
			noStroke();
			fill(visitedColor);
			rect(x,y,w,w);
		}
	}
}