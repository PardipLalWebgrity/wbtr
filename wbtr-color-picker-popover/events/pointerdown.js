import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Pointerdown {

    static _handler(e) {
        if (WBTR.eventTarget.dataset.id == 'cpicker-box-canvas') {
            props._root.$id.cpickerBoxCanvas.setPointerCapture(e.pointerId);
            const color = methods._getSolidColorCanvasXYColor(e, true);
            methods._updateTransparentSliderColor(color);
            methods._updateRGBAColorCode(color);
            methods._updateCSSColorCode(color);
            methods._updateHEXAColorCode(color);
            props._color = color;
        }
    }



}

export default Pointerdown;