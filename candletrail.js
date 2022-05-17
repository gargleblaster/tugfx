//import { Candle } from './candle.js';

let candles = [];
let curcandle = 0;
let step = 0;
let prevclose = 0;
const STEPS = 200;
const WIDTH = 20;
const GAP = 6;
const SCALE = 1;

function setup() {
    createCanvas(600, 600);
    candles[0] = new Candle(100,201,9,100,1,WIDTH,GAP,SCALE)
    candles[1] = new Candle(100.5,101.5,-99.5,100.5,2,WIDTH,GAP,SCALE)
    candles[2] = new Candle(100.5,101.5,0,100.5,3,WIDTH,GAP,SCALE)
    candles[3] = new Candle(100.5,101.5,99.5,100.5,4,WIDTH,GAP,SCALE)
    candles[4] = new Candle(110.5,121.5,110.5,120.5,5,WIDTH,GAP,SCALE)
    candles[0].start(100)
  }
  
function draw() {
  background(255)
  for( let i=0; i<=curcandle; ++i) {
    if( i < candles.length) {
      candles[i].draw()
      if( i == curcandle ) {
        if ( ++step < STEPS ) {
          candles[curcandle].tick(STEPS)
          // console.log(candles[curcandle])
        } else {
          candles[curcandle].complete()
          candles[curcandle].draw()
          console.log(`complete ${i}`)
          prevclose = candles[curcandle].C
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
    }

  // stroke(255, 204, 0);
  ellipse(0,0,50,50)
  line(20,0,-20,0)
  line(0,20,0,-20)
}