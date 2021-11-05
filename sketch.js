const SCALE = 2;
const SIZE = 540 * SCALE;
const EXPORT_IMAGE = !true;
const DRAW_BOUNDING_TRIANGLE = !true;

const presets = {
  alpha: {
    label: "alpha",
    min: 0.1,
    // max: 0.8,
    range: 0.6,
  },
};

let config = presets.alpha;

const RANGE = config.range;
const MIN = SIZE * config.min;
const MAX = SIZE * ( 1 - config.min );

function setup() {
  createCanvas( SIZE, SIZE );
  noFill();
  strokeWeight( 2 * SCALE );
  // Default Stroke
  stroke( 255 );

  frameRate( 8 );
  // noLoop();
}

function draw() {
  background( 32 );
 
  // TOP
  let p1 = createVector( MIN + midRandom( MAX-MIN, RANGE ), MIN );

  // LEFT
  let p2 = createVector( MIN, MIN + midRandom( MAX-MIN, RANGE ) );

  // BOTTOM
  let p3 = createVector( MIN + midRandom( MAX-MIN, RANGE ), MAX );

  // RIGHT
  let p4 = createVector( MAX, MIN + midRandom( MAX-MIN, RANGE ) );

  // USE MOUSE TO CONTROL
  // let mx = Math.min( Math.max( 0, mouseX ), SIZE )
  // let my = Math.min( Math.max( 0, mouseY ), SIZE )

  // let blob1 = buildBlob( p1, p2, p3 );
  let blob2 = buildBlob(
    p1,
    createVector( MIN, MIN ),
    p2
  );

  let blob3 = buildBlob(
    p2,
    createVector( MIN, MAX ),
    p3
  );

  let blob4 = buildBlob(
    p3,
    createVector( MAX, MAX ),
    p4
  );

  let blob5 = buildBlob(
    p4,
    createVector( MAX, MIN ),
    p1
  );

  let blob6 = buildBlob(
    p2,
    p4,
    p1
  );

  let blob7 = buildBlob(
    p4,
    p2,
    p3
  );


  // QUAD BLOB
  // drawQuadBlob( blob1 );
  drawQuadBlob2( blob2 );
  drawQuadBlob2( blob3 );
  drawQuadBlob2( blob4 );
  drawQuadBlob2( blob5 );
  drawQuadBlob2( blob6 );
  drawQuadBlob2( blob7 );


  if ( EXPORT_IMAGE && frameCount > 761 ) {
    save(`${getName()}.png`);
    noLoop();
  }
}

function buildBlob ( p1, p2, p3 ) {
  let mid1 = p5.Vector.lerp( p1, p2, 0.5 );
  let mid2 = p5.Vector.lerp( p2, p3, 0.5 );
  let mid3 = p5.Vector.lerp( p3, p1, 0.5 );

  return [
    mid1,
    p2,
    mid2,
    p3,
    mid3,
    p1,
    mid1
  ];
}

function midRandom ( size, range ) {
  // no checks for correctness
  let mrange = size * range;
  let m = Math.random() * mrange - mrange * 0.5;
  return size * 0.5 + m;
}

function drawQuadBlob( points ) {

  if( DRAW_BOUNDING_TRIANGLE ) {
    push();
    // BASE TRIANGLE
    stroke( "#fff" );
    fill( "#323232" );
    beginShape();
    vertex( points[5].x, points[5].y );
    vertex( points[1].x, points[1].y );
    vertex( points[3].x, points[3].y );
    endShape(CLOSE);
    pop();
  }

  push();
  noStroke();
  fill( 64 );
  beginShape();
  vertex( points[0].x, points[0].y );
  quadraticVertex( points[1].x, points[1].y, points[2].x, points[2].y );
  quadraticVertex( points[3].x, points[3].y, points[4].x, points[4].y );
  quadraticVertex( points[5].x, points[5].y, points[6].x, points[6].y );
  endShape();
  pop();
}

function drawQuadBlob2( points ) {

  if( DRAW_BOUNDING_TRIANGLE ) {
    push();
    // BASE TRIANGLE
    stroke( "#fff" );
    fill( "#323232" );
    beginShape();
    vertex( points[5].x, points[5].y );
    vertex( points[1].x, points[1].y );
    vertex( points[3].x, points[3].y );
    endShape(CLOSE);
    pop();
  }

  let m = 0.6,
      m_inv = 1.0 - m,
      tmp;

  push();
  // noStroke();
  // stroke( 32 );
  stroke( 64 );
  // fill( 64 );
  noFill();
  beginShape();

  tmp = p5.Vector.lerp( points[0], points[1], m );
  vertex( tmp.x, tmp.y );

  tmp = p5.Vector.lerp( points[1], points[2], m_inv );
  quadraticVertex(
    points[1].x, 
    points[1].y, 
    tmp.x,
    tmp.y
  );

  tmp = p5.Vector.lerp( points[2], points[3], m );
  vertex( tmp.x, tmp.y );

  tmp = p5.Vector.lerp( points[3], points[4], m_inv ),
  quadraticVertex(
    points[3].x, 
    points[3].y, 
    tmp.x,
    tmp.y
  );

  tmp = p5.Vector.lerp( points[4], points[5], m );
  vertex( tmp.x, tmp.y );

  tmp = p5.Vector.lerp( points[5], points[6], m_inv ),
  quadraticVertex(
    points[5].x, 
    points[5].y, 
    tmp.x,
    tmp.y
  );

  endShape(CLOSE);
  pop();
}

function keyPressed() {
  if (key == "d" || keyCode == 68) {
    save(`${getName()}.png`);
  } else if (key == "x") {
    noLoop();
  }
}

function getName() {
  return `Quad-Blobs-${config.label}-${new Date().toISOString()}`;
}
