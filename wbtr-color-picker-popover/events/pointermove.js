import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Pointermove {

    static _handler(e) {
        
        if (props._root.$id.cpickerBoxCanvas.hasPointerCapture(e.pointerId)) {                        
            const color = methods._getSolidColorCanvasXYColor(e, true);
            color.rgbaA = props._root.$id.cpickerTransparentInput.value;
            methods._updateTransparentSliderColor(color);
            methods._updateRGBAColorCode(color);
            methods._updateCSSColorCode(color);
            methods._updateHEXAColorCode(color);
        }


    }

}

export default Pointermove;
