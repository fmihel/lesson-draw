import './template/define.css';
import './template/main.css';
import {
    line, out, color, point, grid,
    text, animate,
} from './source/draw-init-simple';

$(() => {
    let a = 0;
    const pi = 3.14;
    const rad = pi / 180;
    animate(() => {
        grid(20);
        color('silver');
        text('(0;0)', 0, -10);
        text('X', 100, -10);
        text('Y', -10, 100);
        line(-100, 0, 100, 0);
        line(0, -100, 0, 100);


        color('red');
        line(0, 0, 100 * Math.sin(a * rad), 100 * Math.cos(a * rad), 'green');
        line(0, 0, -100, 100);
        text('Y', 0, 0, 'green');
        a += 1;
    },
    { delay: 25, stopTime: 0 });
});
