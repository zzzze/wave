import * as PIXI from 'pixi.js'
import Curve from 'curve'

const app = new PIXI.Application();

document.body.appendChild(app.view);
// app.renderer.backgroundColor = 0xffffff

const container = new PIXI.Container()
const curves = new PIXI.Container()

app.loader.add('bg', 'assets/bg.jpg').load((loader, resources) => {
    const bg = new PIXI.Sprite(resources.bg.texture)
    bg.x = 0
    bg.y = 0
    bg.width = app.renderer.width
    bg.height = app.renderer.height
    container.addChild(bg)
    app.stage.addChild(container)

    let graphic1 = new PIXI.Graphics()
    let graphic2 = new PIXI.Graphics()
    let graphic3 = new PIXI.Graphics()
    let n = 0
    graphic1.position.x = 0;
    graphic1.position.y = app.renderer.height / 2
    graphic2.position.x = 0;
    graphic2.position.y = app.renderer.height / 2
    graphic3.position.x = 0;
    graphic3.position.y = app.renderer.height / 2
    app.ticker.add(() => {
        graphic1.clear()
        graphic2.clear()
        graphic3.clear()
        graphic1.lineStyle(1, 0xFFFFFF, 1);
        graphic2.lineStyle(1, 0xFFFFFF, 1);
        graphic3.lineStyle(1, 0xFFFFFF, 1);
        new Curve("f(x) = sin((x + n) / frequency) * amplitude * (sin(x / frequency2 - pi / 2) + 1) * 1.2", {
            min: 0,
            max: app.renderer.width,
            params: {
                n,
                frequency: app.renderer.width / 2 / (2 * Math.PI),
                amplitude: 100,
                frequency2: app.renderer.width / (2 * Math.PI),
            },
        }).draw(graphic1)


        new Curve("f(x) = sin((x + n + 90) / frequency) * amplitude * (sin(x / frequency2 - pi / 2) + 1) * 0.8", {
            min: 0,
            max: app.renderer.width,
            params: {
                n,
                frequency: app.renderer.width / 2 / (2 * Math.PI),
                amplitude: 100,
                frequency2: app.renderer.width / (2 * Math.PI),
            },
        }).draw(graphic2)


        new Curve("f(x) = sin((x + n - 90) / frequency) * amplitude * (sin(x / frequency2 - pi / 2) + 1) * 0.6", {
            min: 0,
            max: app.renderer.width,
            params: {
                n,
                frequency: app.renderer.width / 2 / (2 * Math.PI),
                amplitude: 100,
                frequency2: app.renderer.width / (2 * Math.PI),
            },
        }).draw(graphic3)


        n = n % app.renderer.width + 5
    })
    curves.addChild(graphic1)
    curves.addChild(graphic2)
    curves.addChild(graphic3)
    curves.width = app.renderer.width
    curves.height = app.renderer.height
    container.mask = curves
})
