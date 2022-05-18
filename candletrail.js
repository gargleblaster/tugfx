let candles = [];
let curcandle = 0;
let step = 0;
const STEPS = 30;
const WIDTH = 20;
const GAP = 6;
const SCALE = 1;

function setup() {
    createCanvas(400, 400);
    // candles[0] = new Candle(100,201,9,100,1,WIDTH,GAP,SCALE)
    let i = 0
    candles[0] = new Candle(100, 111.5,  80,   110.5, i++,WIDTH,GAP,SCALE)
    candles[1] = new Candle(110, 121.5,  89.5, 120.5, i++,WIDTH,GAP,SCALE)
    candles[2] = new Candle(120, 141.5, 110,   131.5, i++,WIDTH,GAP,SCALE)
    candles[3] = new Candle(130, 181.5, 119.5, 140.5, i++,WIDTH,GAP,SCALE)
    candles[4] = new Candle(140, 161.5, 130.5, 150.5, i++,WIDTH,GAP,SCALE)
    candles[5] = new Candle(150, 161.5, 150,   160.5, i++,WIDTH,GAP,SCALE)
    candles[6] = new Candle(160, 171.5, 150.5, 170.5, i++,WIDTH,GAP,SCALE)
    candles[7] = new Candle(170, 171.5, 120.5, 120.5, i++,WIDTH,GAP,SCALE)
    candles[0].start(100, STEPS)
  }
  
function draw() {
  background(255)
  translate(width/4, height/2)
  scale(1, -1)

  for( let i=0; i<=curcandle; ++i) {
    if( i < candles.length) {
      candles[i].draw()

      if( i == curcandle ) {
        // text(candles[i].p, 40, 0)
        if ( !candles[curcandle].isComplete() /*++step < STEPS*/ ) {
          candles[curcandle].tick()
          // console.log(candles[curcandle])
        } else {
          candles[curcandle].complete()
          candles[curcandle].draw()
          // console.log(`complete ${i}`)
          // let prevclose = candles[curcandle].C
          step = 0;
          ++curcandle;
          if( curcandle < candles.length) {
            let prevclose = candles[curcandle].O
            candles[curcandle].start(prevclose, STEPS)
          }
        }
      }
    }
  }

  if( curcandle >= candles.length ) {
    curcandle = 0;
    step = 0;
    for( let j=0; j<candles.length; ++j)
      candles[j].reset()
    candles[0].start(100, STEPS)
    noLoop()
    setTimeout(() => {loop()}, 500)
    }

  // stroke(255, 204, 0);

  // reticle
  // ellipse(0,0,50,50)
  // line(20,0,-20,0)
  // line(0,20,0,-20)
}