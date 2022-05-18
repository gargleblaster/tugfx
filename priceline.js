class Priceline {
    constructor(price, linetype) {
        this.Price = price
        this.Linetype = linetype
        this.price = price
    }

    reset() {
        this.price = this.Price
    }

    move(price) {
        this.price = price
    }

    draw(x1, x2) {
        if( this.price < 0 )
            return

        push()

        if( this.Linetype == 'STOP' ) {
            stroke(200,0,0)
        }

        line(x1, this.price, x2, this.price)

        pop()
    }
}