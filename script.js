var c = document.getElementById("mycanvas");
const cWidth = c.width,
      cHeight = c.height;


const autocheck = document.getElementById('auto');
var auto= true;
var ctx = c.getContext("2d");


ctx.fillStyle= "#add8e6"

// a,b  1,2
// d,c  4,3  

function drawSquare(arr) {
    ctx.beginPath();
    ctx.moveTo(arr[0][0], arr[0][1]);
    for(let i=1; i<arr.length; i++) {
        ctx.lineTo(arr[i][0], arr[i][1]);
    }
   // ctx.lineTo(arr[0][0], arr[0][1]);
   ctx.closePath();
    ctx.stroke();
}
function drawLines(arr1, arr2) {
    ctx.beginPath();
    if(arr1.length != arr2.length) {
        console.log("Matric sizes inconsistant")
        return
    }
    for(let i=0; i<arr1.length; i++) {
        ctx.moveTo(arr1[i][0], arr1[i][1]);
        ctx.lineTo(arr2[i][0], arr2[i][1]);
        ctx.stroke();
    }
}

// x,y,sideLenght, angleX, angleY
function drawCube(x,y,sideLenght, angleX=0 , angleY=0)
{
    //[x,y,z]
    var arr1 = [
        [200, 200, -100],
        [400, 200, -100],
        [400, 400, -100],
        [200, 400, -100]
    ];
    var arr2 = [
        [200, 200, 100],
        [400, 200, 100],
        [400, 400, 100],
        [200, 400, 100]
    ]
    //changing just the x angle
    for(let i=0; i<arr1.length; i++) {
        arr1[i][0] += Math.round(arr1[i][2]*Math.cos(angleX))
        arr1[i][1] += Math.round(arr1[i][2]*Math.cos(angleY))

        arr2[i][0] += Math.round(arr2[i][2]*Math.cos(angleX))
        arr2[i][1] += Math.round(arr2[i][2]*Math.cos(angleY))
    }

    ctx.strokeStyle = "#00f";
    drawSquare(arr1)
    // console.log('arr1: ', arr1);
    drawSquare(arr2)
    // console.log('arr2: ', arr2);
    drawLines(arr1, arr2)
}

function setup() {
    drawCube(250,200,150,0,90)
}
setup();
var clearCanvas = function() {
   ctx.clearRect(0, 0, c.width, c.height);
}
let angX = 90;
let angY = 0;
function update() {

    angX = (angX+0.01)%360;
    angY = (angY+0.01)%360;

    clearCanvas()
    drawCube(250,200,150,angX,angY)
    if(auto) {
        setTimeout(()=> {
            update()
        },10)
    }
}

function mouseUpdate(mAngX, mAngY) {
    mAngX /=-100;
    mAngY /=-100;
    mAngX = (mAngX)%360;
    mAngY = (mAngY)%360;
    clearCanvas()
    drawCube(250,200,150,mAngX,mAngY)
}

function mouseMoveWhilstDown(target, whileMove) {
    var endMove = function (e) {
        window.removeEventListener('mousemove', whileMove);
        window.removeEventListener('mouseup', endMove);
    };

    target.addEventListener('mousedown', function (event) {
        event.stopPropagation(); // remove if you do want it to propagate ..
        window.addEventListener('mousemove', whileMove);
        window.addEventListener('mouseup', endMove);   
    });
}

mouseMoveWhilstDown(
    document.getElementById('box'),
    function (event) {
        mouseUpdate(event.clientX, event.clientY)
     }
);


autocheck.addEventListener( 'change', function() {
    if(this.checked) {
        auto= true;
        update()
    } else {
        auto= false;
    }
});