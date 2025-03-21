import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Blur {

    static _handler(e) {

        if(WBTR.eventTarget.dataset.id === 'cpicker-code-hex-input') this._haxInputBlurHandle();
        console.log(props._color.hexa);
    }

    static _haxInputBlurHandle(){
        const hexa = methods._validateHexaColorCode(WBTR.eventTarget.value.trim());
        props._root.$id.cpickerCodeHexInput.value = hexa.replace('#','');
        const rgba = methods._hexaToRGBA(hexa);
        methods._colorToSupportColorsToProps(rgba);
        const solidColor = methods._getSolidColorCanvasTopRightColor();
        methods._renderSolidColorCanvasColor(solidColor);
        methods._renderSolidColorCanvasPointer();
        methods.updateTransparentSliderPosition();
        methods._updateTransparentSliderColor();
        methods._updateRGBAColorCode();
    }
}

export default Blur;