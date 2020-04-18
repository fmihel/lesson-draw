import {
    ut, JX, parentDOM, binds,
} from 'fmihel-browser-lib';

export default class Draw {
    constructor(ownerDOM) {
        binds(this, 'worldX', 'worldY');
        this.owner = ownerDOM;
        this.parent = parentDOM(ownerDOM);
        this.canvas = this.owner.getContext('2d');
        this.resizeObserver = new ResizeObserver((o) => {
            this.resize();
        });
        this.resizeObserver.observe(this.parent);
        this.buffer = [];
        this.resize(true);
    }

    free() {
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
    }

    updateSC() {
        const w = this.owner.width;
        const h = this.owner.height;
        this.world = {
            x1: 0, y1: 0, x2: w - 1, y2: h - 1,
        };
        this.local = {
            x1: -w / 2,
            y1: h / 2,
            x2: w / 2,
            y2: -h / 2,
        };
    }

    resize() {
        if (this.timerOut) {
            clearTimeout(this.timerOut);
        }
        this.timerOut = setTimeout(() => {
            this.timerOut = undefined;
            const size = JX.pos(this.parent);

            this.owner.width = size.w - 5;
            this.owner.height = size.h - 5;

            this.out();
        }, 10);
    }

    worldX(x) {
        const l = this.local;
        const w = this.world;
        return ut.translate(x, l.x1, l.x2, w.x1, w.x2);
    }

    worldY(y) {
        const l = this.local;
        const w = this.world;
        return ut.translate(y, l.y1, l.y2, w.y1, w.y2);
    }

    saveCommand(command) {
        this.buffer.push(command);
    }

    out() {
        this.updateSC();
        const CX = this.worldX;
        const CY = this.worldY;
        const c = this.canvas;
        let strokeStyleStore;
        let fillStyleStore;
        const store = (type, newMean) => {
            if (newMean) {
                if (type === 'fill') {
                    fillStyleStore = c.fillStyle;
                    c.fillStyle = newMean;
                } else if (type === 'color') {
                    strokeStyleStore = c.strokeStyle;
                    c.strokeStyle = newMean;
                }
            }
        };
        const reStore = (type, newMean) => {
            if (newMean) {
                if (type === 'fill') {
                    c.fillStyle = fillStyleStore;
                } else if (type === 'color') {
                    c.strokeStyle = strokeStyleStore;
                }
            }
        };

        this.buffer.forEach((o) => {
            if (o.fill) {
                c.fillStyle = o.color;
            } else if (o.color) {
                c.strokeStyle = o.color;
            } else if (o.line) {
                store('color', o.line.color);
                c.beginPath();
                c.moveTo(CX(o.line.x1), CY(o.line.y1));
                c.lineTo(CX(o.line.x2), CY(o.line.y2));
                c.stroke();
                c.closePath();
                reStore('color', o.line.color);
            } else if (o.point) {
                store('color', o.point.color);
                c.beginPath();
                c.moveTo(CX(o.point.x), CY(o.point.y));
                c.lineTo(CX(o.point.x + 1), CY(o.point.y + 0));
                c.stroke();
                c.closePath();
                reStore('color', o.point.color);
            }
        });
    }


    color(color) {
        this.saveCommand({ color });
    }

    fill(color) {
        this.saveCommand({ fill: color });
    }

    line(x1, y1, x2, y2, color = undefined) {
        this.saveCommand({
            line: {
                x1, y1, x2, y2, color,
            },
        });
    }

    point(x, y, color = undefined) {
        this.saveCommand({
            point: {
                x, y, color,
            },
        });
    }
}
