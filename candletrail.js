//import { Candle } from './candle.js';

let candles = [];
let curcandle = 0;
let step = 0;
const STEPS = 100;
const WIDTH = 20;
const GAP = 6;
const SCALE = 1;

function setup() {
    createCanvas(1000, 1000);
    // candles[0] = new Candle(100,201,9,100,1,WIDTH,GAP,SCALE)
    candles[0] = new Candle(100,101.5,50,80.5,1,WIDTH,GAP,SCALE)
    candles[1] = new Candle(110,111.5,9.5,100.5,2,WIDTH,GAP,SCALE)
    candles[2] = new Candle(120,121.5,50,101.5,3,WIDTH,GAP,SCALE)
    candles[3] = new Candle(130,131.5,99.5,100.5,4,WIDTH,GAP,SCALE)
    candles[4] = new Candle(140,141.5,110.5,120.5,5,WIDTH,GAP,SCALE)
    candles[5] = new Candle(150,151.5,50,80.5,6,WIDTH,GAP,SCALE)
    candles[6] = new Candle(160,161.5,110.5,120.5,7,WIDTH,GAP,SCALE)
    candles[7] = new Candle(170,171.5,110.5,120.5,8,WIDTH,GAP,SCALE)
    candles[0].start(100)
  }
  
function draw() {
  background(255)
  translate(width/4, height/2)
  scale(1, -1)

  for( let i=0; i<=curcandle; ++i) {
    if( i < candles.length) {
      candles[i].draw()

      if( i == curcandle ) {
        text(candles[i].p, 40, 0)
        if ( ++step < STEPS ) {
          candles[curcandle].tick(STEPS)
          // console.log(candles[curcandle])
        } else {
          // candles[curcandle].complete()
          // candles[curcandle].draw()
          console.log(`complete ${i}`)
          let prevclose = candles[curcandle].C
          step = 0;
          ++curcandle;
          if( curcandle < candles.length) {
            candles[curcandle].start(prevclose)
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
    candles[0].start(100)
    noLoop()
    setTimeout(() => {loop()}, 3000)
    }

  // stroke(255, 204, 0);
  ellipse(0,0,50,50)
  line(20,0,-20,0)
  line(0,20,0,-20)
}