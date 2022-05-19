let candles = [];
let stops = [];
let targets = []
let stop;
let stopX;
let curcandle = 0;
let step = 0;
const STEPS = 60;
const WIDTH = 14;
const GAP = 3;
const SCALE = 2;    // TODO unused

function setup() {
    createCanvas(200, 200);
    // candles[0] = new Candle(100,201,9,100,1,WIDTH,GAP,SCALE)
    let i = 0
    candles[0] = new Candle(100, 111.5,  80,   110.5, i++,WIDTH,GAP,SCALE)
    candles[1] = new Candle(110, 121.5,  89.5, 120.5, i++,WIDTH,GAP,SCALE)
    candles[2] = new Candle(120, 141.5, 110,   141.5, i++,WIDTH,GAP,SCALE)
    candles[3] = new Candle(130, 161.5, 119.5, 150.5, i++,WIDTH,GAP,SCALE)
    candles[4] = new Candle(140, 161.5, 130.5, 160.5, i++,WIDTH,GAP,SCALE)
    candles[5] = new Candle(160, 161.5, 150,   150.5, i++,WIDTH,GAP,SCALE)
    candles[6] = new Candle(160, 171.5, 152.5, 170.5, i++,WIDTH,GAP,SCALE)
    candles[7] = new Candle(170, 171.5, 120.5, 120.5, i++,WIDTH,GAP,SCALE)
    candles[0].start(100, STEPS)
    targets[0] = new Priceline(125, LineTypeEnum.TARGET, StateEnum.ACTIVE)
    targets[1] = new Priceline(150, LineTypeEnum.TARGET, StateEnum.PENDING)
    targets[2] = new Priceline(175, LineTypeEnum.TARGET, StateEnum.PENDING)
    stops[0] = new Priceline(75, LineTypeEnum.STOP, StateEnum.ACTIVE)
    stops[1] = new Priceline(100, LineTypeEnum.STOP, StateEnum.HIDDEN)
    stops[2] = new Priceline(125, LineTypeEnum.STOP, StateEnum.HIDDEN)
  }
  
function draw() {
  background(255)
  translate(width/6, 5*height/4)
  scale(1, -1)

  for( let i=0; i<=curcandle; ++i) {
    if( i < candles.length) {
      let targetHit = -1
      let stopHit = -1
      candles[i].draw()
      targets.forEach( (tgt, i) => {
        if( tgt.isHit(candles[curcandle].p) )
          targetHit = i
        tgt.draw(stopX, width)
      })
      stops.forEach( (stp, i) => {
        if( stp.isHit(candles[curcandle].p) )
          stopHit = i
        stp.draw(stopX, width)
      })

      if( targetHit >= 0 ) {
        console.log("ratcheting up")
        stops[targetHit].state = StateEnum.HIDDEN
        targets[targetHit].state = StateEnum.USED
        if( targetHit+1 < targets.length ) {
          stops[targetHit+1].state = StateEnum.ACTIVE
          targets[targetHit+1].state = StateEnum.ACTIVE
        }
      }
      if( stopHit >= 0 ) {
        console.log("stopped out")
      }

      if( i == curcandle ) {
        // text(candles[i].p, 40, 0)
        if ( !candles[curcandle].isComplete() /*++step < STEPS*/ ) {
          candles[curcandle].tick()
          // console.log(candles[curcandle])
        } else {
          candles[curcandle].complete()
          // candles[curcandle].draw()
          stopX = candles[curcandle].getX()
          // console.log(`complete ${i}`)
          // let prevclose = candles[curcandle].C

          //stop.move(candles[curcandle].L)

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
    targets.forEach(t => t.reset())
    stops.forEach(t => t.reset())
    noLoop()
    setTimeout(() => {loop()}, 1000)
    }

  // stroke(255, 204, 0);

  // reticle
  // ellipse(0,0,50,50)
  // line(20,0,-20,0)
  // line(0,20,0,-20)
}