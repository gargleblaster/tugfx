const StateEnum = {
    HIDDEN: "Hidden",
    PENDING: "Pending",
    ACTIVE: "Active",
    REACHED: "Reached"
}
Object.freeze(StateEnum)

class Priceline {
    constructor(price, linetype, state) {
        this.Price = price
        this.Linetype = linetype
        this.price = price
        this.state = state
    }

    reset() {
        this.price = this.Price
        this.state = StateEnum.ACTIVE
    }

    move(price) {
        this.price = price
    }

    isHit(price) {
        // TODO add trade direction, assume long for now
        if( this.Linetype == 'STOP' ) {
            if( price <= this.price ) {
                this.state = StateEnum.REACHED
                return true
            }
        }
        if( this.Linetype == 'TARGET' ) {
            if( price > this.price ) {
                this.state = StateEnum.REACHED
                return true
        }
    }
        return false
    }

    draw(x1, x2) {
        if( this.price < 0 )
            return

        push()

        if( this.Linetype == 'STOP' ) {
            if( this.state == StateEnum.REACHED ) {
                stroke(100,0,0)
                strokeWeight(4)
            } else {
                stroke(200,0,0)
            }
        }

        line(x1, this.price, x2, this.price)

        pop()
    }
}