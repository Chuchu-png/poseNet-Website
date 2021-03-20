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


let video;
let poseNet;
let pose;
let skeleton;
var script= []; //empty array that everything is going to be pushed to 
let poses = [];

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(poses) {
    //console.log(poses);
    if(poses.length > 0) {
        pose = poses[0].pose;
        skeleton = poses[0].skeleton;
    }
}

function modelLoaded() {
    //console.log("posenet ready");
}

function draw() {
    image(video, 0, 0);
    
    if(pose) {
    var rightwristY = pose.keypoints[10].position.y
    var leftwristY = pose.keypoints[10].position.y
    var rightankleX = pose.keypoints[16].position.y

    for(let i = 0; i < pose.keypoints.length; i++) {
        let x = pose.keypoints[i].position.x;
        let y = pose.keypoints[i].position.y;
        fill(255, 255, 255);
        ellipse(x,y,16,16);
        }

        for(let i = 0; i < skeleton.length; i++) {
      let a = skeleton[i][0];
      let b = skeleton[i][1];
      strokeWeight(1);
      stroke(255);
      line(a.position.x, a.position.y, b.position.x, b.position.y);
        }

   if (rightwristY > 200 && leftwristY > 200) {
    document.getElementById("blah").innerHTML = "move your left and right wrist up";
  }

  else {
    document.getElementById("blah").innerHTML = "great!";
  }
//console.log(rightankleX);
 if (rightankleX < 250) {
      document.getElementById("blah2").innerHTML = "move your right leg down";
 } 

 else if (rightankleX > 350) {
    document.getElementById("blah2").innerHTML = "move your right leg up"
        }

    else {
        document.getElementById("blah2").innerHTML = "great!";
       }
    }
}