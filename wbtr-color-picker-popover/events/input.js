
import props from '../utils/props.js';
import methods from '../utils/methods.js';
 
class Input {
	static _handler(){
        const tId = WBTR.eventTarget.dataset.id;
        if(tId == 'cpicker-gradient-input') {
            
           if(WBTR.eventTarget.value == 0 || WBTR.eventTarget.value == WBTR.eventTarget.offsetWidth-1)  {
                props._color.hexa = '#FF0000ff';
                props._color.rgbaR = 255;
                props._color.rgbaG = 0;
                props._color.rgbaB = 0;
                props._color.rgbaA = 1;
                props._color.hsv.h = 0;
                props._color.hsv.s = 100;
                props._color.hsv.v = 100;
           } else {
                props._color = methods._getGradientColorSliderColor();
           }

            methods._renderSolidColorCanvasColor();
            console.log(props._color.hexa);
            props._color.rgbaA = props._root.$id.cpickerTransparentInput.value;
            methods._updateRGBAColorCode();
            methods._updateCSSColorCode();
            methods._updateHEXAColorCode();
            methods._updateTransparentSliderColor();
        } else if(tId == 'cpicker-transparent-input') {            
            const valu = props._root.$id.cpickerTransparentInput.value;
            props._root.$id.cpickerCodeRgbaAinput.value = valu; 
            props._color.rgbaA = valu;
            methods._updateCSSColorCode();
            const alphaHex = Math.round(valu * 255).toString(16).padStart(2, "0");
            props._color.hexa = props._color.hexa.slice(0, -2) + alphaHex;
            methods._updateHEXAColorCode();
        } else if(tId== 'cpicker-code-rgba-rinput' || tId == 'cpicker-code-rgba-ginput' || tId == 'cpicker-code-rgba-binput') {            
            const rgba = {
                r: props._root.$id.cpickerCodeRgbaRinput.value,
                g: props._root.$id.cpickerCodeRgbaGinput.value,
                b: props._root.$id.cpickerCodeRgbaBinput.value,
                a: props._root.$id.cpickerCodeRgbaAinput.value
            }
            methods._colorToSupportColorsToProps(rgba);
            const solidColor = methods._getSolidColorCanvasTopRightColor();
            methods._renderSolidColorCanvasColor(solidColor);        
            methods._renderSolidColorCanvasPointer();
            methods.updateTransparentSliderPosition();       
            methods.renderGradientColorSliderPointer();
            methods._updateHEXAColorCode();    
        } else if (tId== 'cpicker-code-rgba-ainput') {
            props._root.$id.cpickerTransparentInput.value = WBTR.eventTarget.value.trim(); 
        }
	}

}

export default Input;
