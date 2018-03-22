class Clock {
    constructor(dom, ctx, opts) {
        const t = this
        t.dom = dom
        t.ctx = ctx
        t.options = {
            hCol: '#000',
            mCol: '#999',
            sCol: 'red',
            isNumCol: '#000',
            noNumCol: '#ccc',
            dCol: '#fff',
        }
        opts && Object.assign(t.options, opts)
        t.r = 150 // 半径
    }
    drawBackground() {
        const t = this
        const { ctx, r } = t
        const { isNumCol, noNumCol, dCol } = t.options
        ctx.save()
        ctx.beginPath()
        ctx.translate(r, r)
        // 画圆
        ctx.lineWidth = 15
        ctx.arc(0, 0, r - 7.5, 0*Math.PI, 2*Math.PI)
        ctx.stroke()
        // 画小时数字
        const arr = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2]
        ctx.font = '27px Arial'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        const numArc = 2*Math.PI/12
        const scaleArc = 2*Math.PI/60
        arr.forEach((item, index) => {
            const rNum = r - 45
            const indexArc = index * numArc
            const x = Math.cos(indexArc)*(rNum)
            const y = Math.sin(indexArc)*(rNum)
            ctx.fillText(item, x, y)
        })
        for(let i = 0; i < 60; i++) {
            const rNum = r - 24
            const indexArc = i * scaleArc
            const x = Math.cos(indexArc)*(rNum)
            const y = Math.sin(indexArc)*(rNum)
            ctx.beginPath()
            ctx.fillStyle = i%5 === 0 ? isNumCol : noNumCol
            ctx.arc(x, y, 5, 0*Math.PI, 2*Math.PI)
            ctx.fill()
        }
    }
    drawHour() {
        const t = this
        const { ctx, r } = t
        const {hCol} = t.options
        const now = new Date()
        const hArc = 2*Math.PI/12
        const mArc = 2*Math.PI/12/60
        ctx.save()
        ctx.beginPath()
        ctx.lineWidth = 9
        ctx.lineCap = 'round'
        ctx.strokeStyle = hCol
        ctx.rotate(now.getHours()*hArc + now.getMinutes()*mArc)
        ctx.moveTo(0, 15)
        ctx.lineTo(0, -75)
        ctx.stroke()
        ctx.restore()
    }
    drawMinute() {
        const t = this
        const { ctx, r } = t
        const {mCol} = t.options
        const now = new Date()
        const mArc = 2*Math.PI/60
        ctx.save()
        ctx.beginPath()
        ctx.lineWidth = 4.5
        ctx.lineCap = 'round'
        ctx.strokeStyle = mCol
        ctx.rotate(now.getMinutes()*mArc)
        ctx.moveTo(0, 15)
        ctx.lineTo(0, -112.5)
        ctx.stroke()
        ctx.restore()
    }
    drawSecond() {
        const t = this
        const { ctx, r } = t
        const {sCol} = t.options
        const now = new Date()
        const mArc = 2*Math.PI/60
        ctx.save()
        ctx.beginPath()
        ctx.fillStyle = sCol
        ctx.rotate(now.getSeconds()*mArc)
        ctx.moveTo(-3, 30)
        ctx.lineTo(3, 30)
        ctx.lineTo(1.5, -120)
        ctx.lineTo(-1.5, -120)
        ctx.fill()
        ctx.restore()
    }
    draw() {
        const t = this
        const { ctx } = t
        setInterval(() => {
            ctx.clearRect(0, 0, 300, 300)
            t.drawBackground()
            t.drawHour()
            t.drawMinute()
            t.drawSecond()
            ctx.restore()
        }, 1000)
    }
}