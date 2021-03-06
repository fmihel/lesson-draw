import Draw from './draw';

const draw = new Draw(document.getElementById('canvas'));

export function out() {
    draw.out();
}

export function line(x1, y1, x2, y2, colorLine = undefined) {
    draw.line(x1, y1, x2, y2, colorLine);
}
export function color(newColor) {
    draw.color(newColor);
}
export function point(x, y, colorPoint = undefined) {
    draw.point(x, y, colorPoint);
}
export function grid(step, colorGrid = undefined) {
    draw.grid(step, colorGrid);
}
export function text(msg, x, y, colorText = 'black', size = 10, type = 'fill') {
    draw.text(msg, x, y, colorText, size, type);
}
export function animate(step, param) {
    draw.animate(step, param);
}
