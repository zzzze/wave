import * as PIXI from 'pixi.js'
import {parser} from 'mathjs'

interface IOptions {
    min: number
    max: number
    params?: Record<string, number>
}

class Curve {
    func: string
    options: IOptions
    constructor(func: string, options?: IOptions) {
        this.func = func
        this.options = {
            ...options,
        }
    }
    draw(graphic: PIXI.Graphics) {
        const p = parser()
        if (this.options?.params) {
            Object.keys(this.options.params).map(key => {
                p.set(key, this.options.params[key])
            })
        }
        p.evaluate(this.func)
        const f = p.get('f')
        let x = this.options.min
        const width = this.options.max
        graphic.moveTo(0, 0);
        while (x < width) {
            let y = f(x)
            graphic.lineTo(x, y);
            x += 1
        }
    }
}

export default Curve
