
function keyPressed(){
  if (playMode){
    if (keyCode === UP_ARROW) {
      move("up");
    } else if (keyCode === DOWN_ARROW) {
      move("down");
    } else if (keyCode === RIGHT_ARROW) {
      move("right");
    } else if (keyCode === LEFT_ARROW) {
      move("left");
    }
  }
}

//top right bottom left
function move(direction){ 
  //walls for each current value
  var top = grid[index(current.x, current.y-1)];
  var right = grid[index(current.x+1, current.y)];
  var bottom = grid[index(current.x, current.y+1)];
  var left = grid[index(current.x-1, current.y)];
  
  
  if (direction == "up" && !current.walls[0]){
    current.show();
    current = top;
    current.highlight();
  }
  else if (direction == "right" && !current.walls[1]){
    current.show();
    current = right;
    current.highlight();
  }
  else if (direction == "down" && !current.walls[2]){
    current.show();
    current = bottom;
    current.highlight();
  }
 else  if (direction == "left" && !current.walls[3]){
   current.show();
   current = left;
   current.highlight();
  }
  checkEnd();
}

function checkEnd(){
  console.log(current.x, current.y);
  if (current.x == cols -1 && current.y == rows - 1){
    console.log("finished");
    document.getElementById("finished").innerHTML = "Winner Winner Chicken Dinner!";
  }
}