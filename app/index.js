import './template/define.css';
import './template/main.css';
import {
    line, out, color, point, grid,
    text,
} from './source/draw-init-simple';

$(() => {
    grid(20);
    color('silver');
    text('(0;0)', 0, -10);
    text('X', 100, -10);
    text('Y', -10, 100);
    line(-100, 0, 100, 0);
    line(0, -100, 0, 100);


    color('red');
    line(0, 0, 100, 100, 'green');
    line(0, 0, -100, 100);
    point(0, 0, 'blue');
    point(-10, -10);
    text('Y', 0, 0, 'green');
    out();
});
