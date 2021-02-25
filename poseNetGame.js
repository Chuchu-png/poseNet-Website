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
let brain;

let state = 'waiting';
let targetLabel;

function keyPressed() {
    //when button is pressed poses are collected for alloted time
    //setTimeout is to give user time to get into pose
    targetLabel = key;
    setTimeout(function(){
        console.log("collecting");
        state = 'collecting';
    }, 10000);
}

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.hide()
    //load video and connect to poseNet
    poseNet = ml5.poseNet(video, modelReady);
    //everytime poseNet model detects pose then give me results of pose
    poseNet.on('pose', gotPoses);

    /* sending image as input to poseNet
        poseNet makes coordinates 
        take those coordinates as input to ml5 neuralnetwork
        neural network classify these poses (34 inputs (because 17 * 2 since x and y)) 
        given 4 outputs
    */

    let options = {
        inputs: 34,
        outputs: 4,
        task: 'classfication',
        debug: true,
    }
    brain = ml5.neuralNetwork(options);
    //add training data to neural network

}

function gotPoses(poses) {
    //console.log(poses);
    if(poses.length > 0){
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
    }
}

function modelReady() {
    //when finshed running model
    console.log("model ready");
}
function draw() {
    //flip video for more user friendly 
    translate(video.width, 0);
    //sets x-axis going the opposite direction
    scale(-1,1);
    image(video, 0, 0, video.width, video.height);

   //to see if there is a pose
    if (pose) {
        for (let i = 0; i < pose.keypoints.length; i++) {
            let posX = pose.keypoints[i].position.x;
            let posY = pose.keypoints[i].position.y;
            fill(0,255,0);
            ellipse(posX, posY, 16, 16);
        }

        for (let i = 0; i < skeleton.length; i++) {
            let a = skeleton[i][0];
            let b = skeleton[i][1];
            strokeWeight(2);
            stroke("white");
            line(a.position.x, a.position.y, b.position.x, b.position.y);
        }
    }
}