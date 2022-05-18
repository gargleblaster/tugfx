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

        if( Math.max(this.O, this.H, this.L, this.C) != this.H || Math.min(this.O, this.H, this.L, this.C) != this.L ) {
            console.log(`Invalid candle O: ${this.O} H ${this.H} L ${this.L} C ${this.C}`)
        }
    }

    reset() {
        this.p = this.o = this.h = this.c = -1
        this.l = 999999
        this.touchedHigh = this.touchedLow = false
    }

    start(open, steps) {
        this.p = open
        this.o = open
        this.h = open
        this.l = open
        this.c = open
        // console.log(`start ${this.I} ${this.p} ${this.o} ${this.h} ${this.l} ${this.c} `)

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
            if( !this.touchedLow || (this.touchedLow && this.touchedHigh) )
                this.stepSize = -this.stepSize
        } else {
            if( this.touchedHigh && !this.touchedLow )
                this.stepSize = -this.stepSize
        }

        this.p += this.stepSize

        if (this.p >= this.H) { 
            this.p = this.H 
            this.touchedHigh = true
        }
        if (this.p <= this.L) { 
            this.p = this.L 
            this.touchedLow = true
        }

        if( this.p > this.h ) {this.h = this.p}
        if( this.p < this.l ) {this.l = this.p}

        this.c = this.p
        // console.log(`tick ${this.stepSize} ${this.I} ${this.p} ${this.o} ${this.h} ${this.l} ${this.c} `)
}

    isComplete() {
        // console.log(`isComplete touchedHigh ${this.touchedHigh} touchedLow ${this.touchedLow} stepSize ${this.stepSize} I ${this.I} p ${this.p} o ${this.o} h ${this.h} l ${this.l} c ${this.c} C ${this.C}`)

        if( this.touchedHigh && this.touchedLow ) {
            if( Math.abs(this.C - this.p) <= Math.abs(2*this.stepSize) )
                return true
        } 
        
        return false;
    }

    complete() {
        // this.o = this.O
        this.p = this.C
        this.h = this.H
        this.l = this.L
        this.c = this.C
        // console.log(`complete ${this.I} ${this.p} ${this.o} ${this.h} ${this.l} ${this.c} `)
    }

    draw() {
        if( this.p < 0 )
            return

        // console.log(`draw ${this.I} ${this.p} ${this.o} ${this.h} ${this.l} ${this.c} `)

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
        noStroke()

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