function changeSettings() {
  console.log("colour change time");
    var mazeColor = document.getElementById("mazeColor").value;
    var playerColor = document.getElementById("playerColor").value;
    //var fps = document.getElementById("fps").value;


    // The working function for changing background color.
    visitedColor = mazeColor.toString();
    currentColor = playerColor.toString();

}

function changeframeRate(fps){
  console.log("framerate changed", fps);
  frameRate(fps);
}

document.getElementById("submitSettings").addEventListener("click", changeSettings, false);