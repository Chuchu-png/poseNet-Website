/* 0    nose
1    leftEye
2    rightEye
3    leftEar
4    rightEar
5    leftShoulder
6    rightShoulder
7    leftElbow
8    rightElbow
9    leftWrist
10    rightWrist
11    leftHip
12    rightHip
13    leftKnee
14    rightKnee
15    leftAnkle
16    rightAnkle
*/



var script= []; //empty array that everything is going to be pushed to 
// Grab elements, create settings, etc.
var video = document.getElementById("video");
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
// The detected positions will be inside an array
let poses = [];
let critcism = [];


// Create a webcam capture
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
    video.srcObject = stream;
    video.play();
    });
  }

// A function to draw the video and poses into the canvas.
// This function is independent of the result of posenet
// This way the video will not seem slow if poseNet
// is not detecting a position
function drawCameraIntoCanvas() {
  // Draw the video element into the canvas
  ctx.drawImage(video, 0, 0, video.width, video.height);

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  drawSkeleton();
  window.requestAnimationFrame(drawCameraIntoCanvas);
  
}
// Loop over the drawCameraIntoCanvas function
drawCameraIntoCanvas();

// Create a new poseNet method with a single detection
const poseNet = ml5.poseNet(video, modelReady);
poseNet.on("pose", gotPoses);

// A function that gets called every time there's an update from the model
function gotPoses(results) {

poses = results;
  if(poses.length> 0){
  var rightwristX = poses[0].pose.keypoints[10].position.x;
  var leftwristX = poses[0].pose.keypoints[9].position.x;

   //rightwristX critcism
  if (rightwristX > 200) {
  console.log("move to right wrist to the right"); 
   var critcism1 = "move your right wrist to the right";
    /*critcism.push(critcism1);
    document.getElementById("blah").innerHTML = critcism[0];*/
  }

  else {
        console.log("great!");
  }

  if (leftwristX > 300) {
        console.log("move your left wrist to the right");
  }
  
  else if(leftwristX < 50) {
        console.log("move your left wrist to the left");
  }

  else {
        console.log("great!");
        }
    }
}


function modelReady() {
  console.log("model ready");
  poseNet.multiPose(video);
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i += 1) {
    // For each pose detected, loop through all the keypoints
    for (let j = 0; j < poses[i].pose.keypoints.length; j += 1) {
      let keypoint = poses[i].pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        ctx.beginPath();
        ctx.arc(keypoint.position.x, keypoint.position.y, 12, 0, 2 * Math.PI);
        ctx.stroke();
      }
    }
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i += 1) {
    // For every skeleton, loop through all body connections
    for (let j = 0; j < poses[i].skeleton.length; j += 1) {
      let partA = poses[i].skeleton[j][0];
      let partB = poses[i].skeleton[j][1];
      ctx.beginPath();
      ctx.moveTo(partA.position.x, partA.position.y);
      ctx.lineTo(partB.position.x, partB.position.y);
      ctx.stroke();
    }
  }
}
