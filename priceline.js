const LineTypeEnum = {
    STOP: "Stop",
    TARGET: "Target"
}
Object.freeze(LineTypeEnum)

const StateEnum = {
    HIDDEN: "Hidden",
    PENDING: "Pending",
    ACTIVE: "Active",
    REACHED: "Reached",
    USED: "Used"            // TODO how to distinguish from REACHED?
}
Object.freeze(StateEnum)

class Priceline {
    constructor(price, linetype, state) {
        this.Price = price
        this.Linetype = linetype
        this.price = price
        this.state = state
        this.StartState = state
    }

    reset() {
        this.price = this.Price
        this.state = this.StartState
    }

    move(price) {
        this.price = price
    }

    isHit(price) {
        if( this.state !== StateEnum.ACTIVE )
            return false

        // TODO add trade direction, assume long for now
        if( this.Linetype == LineTypeEnum.STOP ) {
            if( price <= this.price ) {
                this.state = StateEnum.REACHED
                return true
            }
        }
        if( this.Linetype == LineTypeEnum.TARGET ) {
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

        if (this.Linetype == LineTypeEnum.STOP) {
            switch (this.state) {
                case StateEnum.REACHED:
                    stroke(100, 0, 0)
                    strokeWeight(4)
                    break
                case StateEnum.USED:
                    stroke(255, 200, 200)
                    strokeWeight(2)
                    break
                case StateEnum.ACTIVE:
                    stroke(200, 0, 0)
                    break
                case StateEnum.PENDING:
                    stroke(50, 50, 50)
                    break
                case StateEnum.HIDDEN:
                    pop()
                    return
            }
        }
        if (this.Linetype == LineTypeEnum.TARGET) {
            switch (this.state) {
                case StateEnum.REACHED:
                    stroke(0, 200, 0)
                    strokeWeight(4)
                    break
                case StateEnum.USED:
                    stroke(200, 255, 200)
                    strokeWeight(2)
                    break
                case StateEnum.ACTIVE:
                    stroke(0, 100, 0)
                    break
                case StateEnum.PENDING:
                    stroke(50, 50, 50)
                    break
                case StateEnum.HIDDEN:
                    pop()
                    return
            }
        }

        line(x1, this.price, x2, this.price)

        pop()
    }
}