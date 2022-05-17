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

    start(open) {
        this.p = open
        this.o = open
        this.h = open
        this.l = open
        this.c = open
        console.log(`start ${this.I} ${this.p} ${this.o} ${this.h} ${this.l} ${this.c} `)
    }

    tick(steps) {
        var tick = (this.H - this.L) / (steps/2)

        let touchedHigh = this.h == this.H
        let touchedLow = this.l == this.L

        if( this.C > this.O ) {
            if( touchedLow )
                tick = -tick
        } else {
            if( touchedHigh )
                tick = -tick
        }

        this.p += tick

        if (this.p > this.H) { this.p = this.H }
        if (this.p < this.L) { this.p = this.L }

        if( this.p > this.h ) {this.h = this.p}
        if( this.p < this.l ) {this.l = this.p}

        this.c = this.p
        console.log(`tick ${tick} ${this.I} ${this.p} ${this.o} ${this.h} ${this.l} ${this.c} `)
}

    complete() {
        this.o = this.O
        this.p = this.C
        this.h = this.H
        this.l = this.L
        this.c = this.C
        console.log(`complete ${this.I} ${this.p} ${this.o} ${this.h} ${this.l} ${this.c} `)
    }

    draw() {
        if( this.p < 0 )
            return

        const WICKPCT = 0.25
        const wickLeft = this.W - this.W*(1-WICKPCT)
        const wickWidth = wickLeft + this.W*WICKPCT

        push()

        // translate(width/2, height/2)
        // scale(this.scale, -1)
        translate(this.scale * this.I * (this.W + this.G), 0)

        // var x = (this.W+this.G)*this.I

        // wicks
        fill(200,0,0)
        rect(wickLeft,this.l,wickWidth,this.h-this.l)
        // body
        fill(0,200,0)
        if( this.c > this.o )
            rect(0,this.c,this.W,this.c - this.o)
        else
            rect(0,this.o,this.W,this.o - this.c)

        pop()
    }

}