//import {rect} from './p5/p5.js';

class Candle {
    // OHLC, index, width, gap
    constructor(o,h,l,c,i, w, g, scale) {
        this.O = o
        this.H = h
        this.L = l
        this.C = c
        this.I = i
        this.W = w
        this.G = g
        this.scale = scale
        this.p = -1
    }

    reset() {
        this.p = this.o = this.h = this.c = -1
        this.l = 999999
    }

    start(open, steps) {
        this.p = open
        this.o = open
        this.h = open
        this.l = open
        this.c = open
        console.log(`start ${this.I} ${this.p} ${this.o} ${this.h} ${this.l} ${this.c} `)

        let path;

        if( this.C > this.p ) {
            path = (this.p-this.L)+(this.H-this.L)+(this.H-this.C)
        } else {
            path = (this.H-this.p)+(this.H-this.L)+(this.C-this.L)
        }

        this.stepSize = path / steps
    }

    tick() {
        this.stepSize = Math.abs(this.stepSize)

        let touchedHigh = this.h == this.H
        let touchedLow = this.l == this.L

        if( this.C > this.O ) {
            if( !touchedLow || (touchedLow && touchedHigh) )
                this.stepSize = -this.stepSize
        } else {
            if( touchedHigh && !touchedLow )
                this.stepSize = -this.stepSize
        }

        this.p += this.stepSize

        if (this.p > this.H) { this.p = this.H }
        if (this.p < this.L) { this.p = this.L }

        if( this.p > this.h ) {this.h = this.p}
        if( this.p < this.l ) {this.l = this.p}

        this.c = this.p
        console.log(`tick ${this.stepSize} ${this.I} ${this.p} ${this.o} ${this.h} ${this.l} ${this.c} `)
}

    complete() {
        // this.o = this.O
        this.p = this.C
        this.h = this.H
        this.l = this.L
        this.c = this.C
        console.log(`complete ${this.I} ${this.p} ${this.o} ${this.h} ${this.l} ${this.c} `)
    }

    draw() {
        if( this.p < 0 )
            return

        console.log(`draw ${this.I} ${this.p} ${this.o} ${this.h} ${this.l} ${this.c} `)

        const WICKPCT = .2
        // const wickLeft = this.W - this.W*(1-WICKPCT)
        const wickLeft = this.I * (this.W + this.G) - this.W + (this.W*(1-WICKPCT)/2)
        const wickRight = wickLeft + this.W*(WICKPCT)
        const bodyLeft = this.I * (this.W + this.G) - this.W
        const bodyRight = bodyLeft + this.W


        // push()

        // translate(width/4, height/2)
        // scale(1, -1)
        // translate(this.I * (this.W + this.G), 0)

        // var x = (this.W+this.G)*this.I
        rectMode(CORNERS)

        if( this.o < this.c ) {
            fill(0,200,0)
        } else {
            fill(200,0,0)
        }

        // wicks
        rect(wickLeft,this.l,wickRight,this.h)
        // body
        rect(bodyLeft,this.c,bodyRight,this.o)

        // pop()
    }

}