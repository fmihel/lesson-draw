import './template/define.css';
import './template/main.css';
import {
    line, out, color, point,
} from './source/draw-init-simple';

$(() => {
    const text = 'Javasript simple project.';
    console.log(text);
    color('red');
    line(0, 0, 100, 100, 'green');
    line(0, 0, -100, 100);
    point(0, 0, 'blue');
    out();
});
