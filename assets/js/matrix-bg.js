import * as datGui from "https://cdn.skypack.dev/dat.gui@0.7.7"

const state = {
    fps: 13, size: 12, charset: '0123456789ABCDEF', secDelayTilColorChange: 10,
    hue: 120, saturation: 3, lightness: 54 // init at #878e87 / HSL(120, 3%, 54.31%)
}

const gui = new datGui.GUI(),
      fpsCtrl = gui.add(state, 'fps').min(1).max(120).step(1),
      sizeCtrl = gui.add(state, 'size').min(1).max(120).step(1),
      canvas = document.querySelector('canvas'),
      ctx = canvas.getContext('2d')
gui.add(state, 'charset')

let w, h, p
const resize = () => {
    w = canvas.width = innerWidth
    h = canvas.height = innerHeight
    p = Array(Math.ceil(w / state.size)).fill(0)
}
window.addEventListener('resize', resize)
sizeCtrl.onFinishChange(s => resize())
resize()

const random = items => items[Math.floor(Math.random() * items.length)]

const draw = () => {
    if (Date.now() - startTime >= state.secDelayTilColorChange*1000) { // begin transition thru colors
        state.hue = (state.hue + 1) % 360
        state.saturation = 100 + Math.sin((state.hue * Math.PI) / 180) * 50
        state.lightness = 50 + Math.cos((state.hue * Math.PI) / 180) * 25
    }
    const rgbColor = `hsl(${ state.hue }, ${ state.saturation }%, ${ state.lightness }%)`
    ctx.fillStyle = 'rgba(0,0,0,.05)' ; ctx.fillRect(0, 0, w, h)
    ctx.fillStyle = rgbColor ; ctx.font = state.size + 'px sans-serif'
    for (let i = 0; i < p.length; i++) {
        let v = p[i]
        ctx.fillText(random(state.charset), i * state.size, v)
        p[i] = v >= h || v >= 10000 * Math.random() ? 0 : v + state.size
    }
}

let startTime = Date.now(),
    interval = setInterval(draw, 1000 / state.fps)
fpsCtrl.onFinishChange(fps => {
    if (interval) clearInterval(interval)
    interval = setInterval(draw, 1000 / fps)
})
