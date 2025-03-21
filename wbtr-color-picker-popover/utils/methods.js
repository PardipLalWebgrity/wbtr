import props from './props.js';


const Methods = {

    // Solid Color Canvas
    _renderSolidColorCanvasColor(color = props._color.hexa.slice(0, -2)){
        const canvasEl = props._root.$id.cpickerBoxCanvas;
        this._clearCanvas(canvasEl);
        const ctx = canvasEl.getContext('2d');

        // set solid color
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);

        // set 1st overlay
        const gradient1 = ctx.createLinearGradient(0, 0, canvasEl.width, 0);
        gradient1.addColorStop(0, "rgba(255, 255, 255, 1)");
        gradient1.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = gradient1;
        ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);

        // 2nd overlay
        const gradient2 = ctx.createLinearGradient(0, 0, 0, canvasEl.height);
        gradient2.addColorStop(0, "transparent");
        gradient2.addColorStop(1, "#000");
        ctx.fillStyle = gradient2;
        ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
    },

    _renderSolidColorCanvasPointer(color = props._color){
        let x = color.hsv.s * 100;
        let y = (1 - color.hsv.v) * 100;

        let leftPos = (x / 100 * props._root.$id.cpickerBoxCanvas.offsetWidth + props._root.$id.cpickerBoxThumb.offsetWidth / 4);
        let topPos = (y / 100 * props._root.$id.cpickerBoxCanvas.offsetHeight + props._root.$id.cpickerBoxThumb.offsetWidth / 4);

        if (leftPos < 0) leftPos = 0;
        if (leftPos > 270) leftPos = 270;

        if (topPos < 0) topPos = 0;
        if (topPos > 270) topPos = 270;

        props._root.$id.cpickerBoxThumb.style.left = leftPos + 'px';
        props._root.$id.cpickerBoxThumb.style.top = topPos + 'px';
    },    

    _getSolidColorCanvasXYColor(e, updatePointer){
        const boxCanvasRect = props._root.$id.cpickerBoxCanvas.getBoundingClientRect();

        let xPos = Math.floor(e.clientX - boxCanvasRect.left);
        let yPos = Math.floor(e.clientY - boxCanvasRect.top);

        if (e.clientX > boxCanvasRect.right) xPos = boxCanvasRect.width - 1;
        if (e.clientX < boxCanvasRect.left) xPos = 0;

        if (e.clientY > boxCanvasRect.bottom) yPos = boxCanvasRect.height - 1;
        if (e.clientY < boxCanvasRect.top) yPos = 0;

        if(updatePointer) {
            props._root.$id.cpickerBoxThumb.style.left = xPos + 'px';
            props._root.$id.cpickerBoxThumb.style.top = yPos + 'px';
        }

        const ctx = props._root.$id.cpickerBoxCanvas.getContext("2d");
        const imgData = ctx.getImageData(xPos, yPos, 1, 1);        
        return this._canvasPixelDataToColor(imgData);
    },

    _getSolidColorCanvasTopRightColor(color = props._color){
        return this._RGBtoHex(this._HSVtoRGB(props._color.hsv.h, 1, 1));
    },


    // Gradient Slider
    renderGradientColorSliderColor() {
        const canvasEl = props._root.$id.cpickerGradientCanvas;
        const ctx = canvasEl.getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, canvasEl.width, 0);

        gradient.addColorStop(0, "red");
        gradient.addColorStop(0.17, "#ff0");
        gradient.addColorStop(0.33, "lime");
        gradient.addColorStop(0.5, "cyan");
        gradient.addColorStop(0.66, "blue");
        gradient.addColorStop(0.83, "#f0f");
        gradient.addColorStop(1, "red");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
    },

    renderGradientColorSliderPointer(color = props._color){
        props._root.$id.cpickerGradientInput.value = ((color.hsv.h * 100) / 100).toFixed(2);
    },

    _getGradientColorSliderColor(){
        const pointX = props._root.$id.cpickerGradientInput.value;       
        const ctx = props._root.$id.cpickerGradientCanvas.getContext("2d");
        const imgData = ctx.getImageData(pointX, 10, 1, 1);        
        return this._canvasPixelDataToColor(imgData);
    },

    updateTransparentSliderPosition(color = props._color){
        props._root.$id.cpickerTransparentInput.value = color.rgbaA;
    },

    _updateTransparentSliderColor(color = props._color){
        props._root.$id.cpickerTransparentOverlay.style.background = `linear-gradient(to right, rgba(0, 42, 255, 0) 0%, rgb(${color.rgbaR}, ${color.rgbaG}, ${color.rgbaB}) 100%)`;
    },

    _updateRGBAColorCode(color = props._color){      
        props._root.$id.cpickerCodeRgbaRinput.value = color.rgbaR;
        props._root.$id.cpickerCodeRgbaGinput.value = color.rgbaG;
        props._root.$id.cpickerCodeRgbaBinput.value = color.rgbaB;
        props._root.$id.cpickerCodeRgbaAinput.value = color.rgbaA; 
    },

    _updateCSSColorCode(color = props._color){
        props._root.$id.cpickerCodeCssInput.value = `rgba(${color.rgbaR}, ${color.rgbaG}, ${color.rgbaB}, ${color.rgbaA})`;        
    },

    _updateHEXAColorCode(color = props._color){
        props._root.$id.cpickerCodeHexInput.value = color.hexa;
    },


    _defaultUI(){
        this._renderSolidColorCanvasColor('rgba(0, 0, 255, 1)');
        this.renderGradientColorSliderColor();
        this._colorToSupportColorsToProps({r:0,g:0,b:255,a:1});
    },

    _clearCanvas(canvasEl) {
        const ctx = canvasEl.getContext("2d");
        ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
    },


    /* Color Validation */
    _validateHexaColorCode(hexaCode) {        
        if(! hexaCode.indexOf('#')==0) hexaCode = '#'+hexaCode;
        const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/;

        if (hexRegex.test(hexaCode)) {
            if(hexaCode.length < 8) hexaCode = hexaCode.padEnd(9, "f");            
            return hexaCode;
        } else {
            let validHexa = '';
            const hexCharRegex = /^[#A-Fa-f0-9]?$/;
            const hexaCodeArr = [...hexaCode];
            for(let i=0; i<9; i++){
                const c = hexaCodeArr[i];
                hexCharRegex.test(c) ? (validHexa+=c) : (validHexa+='f');                
            }
            return validHexa;
        }
    },


    /* Color Converter */    
    _HSVtoRGB(H, S, V) {
        let R, G, B, var_h, var_i, var_1, var_2, var_3, var_r, var_g, var_b;
        if (S === 0) {
            R = V * 255;
            G = V * 255;
            B = V * 255;
        } else {
            var_h = H * 6;
            if (var_h === 6) { var_h = 0; } //H must be < 1
            var_i = parseInt(var_h); //Or ... var_i = floor( var_h )
            var_1 = V * (1 - S);
            var_2 = V * (1 - S * (var_h - var_i));
            var_3 = V * (1 - S * (1 - (var_h - var_i)));

            if (var_i === 0) { var_r = V;
                var_g = var_3;
                var_b = var_1; } else if (var_i === 1) { var_r = var_2;
                var_g = V;
                var_b = var_1; } else if (var_i === 2) { var_r = var_1;
                var_g = V;
                var_b = var_3; } else if (var_i === 3) { var_r = var_1;
                var_g = var_2;
                var_b = V; } else if (var_i === 4) { var_r = var_3;
                var_g = var_1;
                var_b = V; } else { var_r = V;
                var_g = var_1;
                var_b = var_2; }

            R = parseInt(var_r * 255);
            G = parseInt(var_g * 255);
            B = parseInt(var_b * 255);
        }
        return { r: R, g: G, b: B };
    },

    _RGBAtoHSV(rgba) {
        //R, G and B input range = 0 ÷ 255
        //H, S and V output range = 0 ÷ 1.0

        const var_R = (rgba.r / 255);
        const var_G = (rgba.g / 255);
        const var_B = (rgba.b / 255);

        const var_Min = Math.min(var_R, var_G, var_B); //Min. value of RGB
        const var_Max = Math.max(var_R, var_G, var_B); //Max. value of RGB
        const del_Max = var_Max - var_Min; //Delta RGB value

        let V = var_Max;
        let H, S;

        if (del_Max === 0) //This is a gray, no chroma...
        {
            H = 0;
            S = 0;
        } else //Chromatic data...
        {
            S = del_Max / var_Max;

            const del_R = (((var_Max - var_R) / 6) + (del_Max / 2)) / del_Max;
            const del_G = (((var_Max - var_G) / 6) + (del_Max / 2)) / del_Max;
            const del_B = (((var_Max - var_B) / 6) + (del_Max / 2)) / del_Max;

            if (var_R === var_Max) { H = del_B - del_G; } else if (var_G === var_Max) { H = (1 / 3) + del_R - del_B; } else if (var_B === var_Max) { H = (2 / 3) + del_G - del_R; }

            if (H < 0) { H += 1; }
            if (H > 1) { H -= 1; }
        }
        return { h: H, s: S, v: V };
    },

    _RGBAtoHexa(rgba) {
        return '#' + this._toHex(parseInt(rgba.r)) + this._toHex(parseInt(rgba.g)) + this._toHex(parseInt(rgba.b)) + this._toHex(Number(Math.round(rgba.a*255)));
    },

    _RGBtoHex(rgba) {
        return '#' + this._toHex(parseInt(rgba.r)) + this._toHex(parseInt(rgba.g)) + this._toHex(parseInt(rgba.b));
    },

    // https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
    _hexaToRGBA(hexa) {
        // Remove "#" if present
        hexa = hexa.replace(/^#/, '');

        // Extract RGBA components
        let r = parseInt(hexa.substring(0, 2), 16);
        let g = parseInt(hexa.substring(2, 4), 16);
        let b = parseInt(hexa.substring(4, 6), 16);
        let a = hexa.length === 8 ? parseInt(hexa.substring(6, 8), 16) / 255 : 1; // Normalize alpha (0-1)
        
        return {r, g, b, a: a.toFixed(2) }
    },

    _formatHex(val) {
        if (val.charAt(0) !== '#') {
            val = '#' + val;
        }
        while (val.length < 7) {
            val += '0';
        }
        return val;
    },

    _toHex(val) {
        let hex = Number(val).toString(16);
        if (hex.length < 2) {
            hex = "0" + hex;
        }
        return hex;
    },

    _rgbaStringToRGBA(rgbaString) {
        const rgbaArr = rgbaString.replace('rgba(', '').replace('rgb(', '').replace(')', '').split(',');
        const r = rgbaArr[0]?.trim();
        const g = rgbaArr[1]?.trim();
        const b = rgbaArr[2]?.trim();
        const a = rgbaArr[3] ? rgbaArr[3].trim() : 1;
        return { r, g, b, a };
    }, 

    _canvasPixelDataToColor(imgData){
        const [r, g, b, a] = imgData.data;
        const hexa = `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}${a.toString(16).padStart(2, '0')}`;
        let alpha = (a / 255).toFixed(2);
        return {
            hexa,
            rgbaR: r,
            rgbaG: g,
            rgbaB: b,
            rgbaA: alpha,
            hsv: this._RGBAtoHSV({r,g,b,a}),
        };
    },

    _colorToSupportColorsToProps(rgba){
        // **** validation
        props._color.hexa = this._RGBAtoHexa(rgba);        
        props._color.rgbaR = rgba.r;
        props._color.rgbaG = rgba.g;
        props._color.rgbaB = rgba.b;
        props._color.rgbaA = rgba.a;
        props._color.hsv = this._RGBAtoHSV(rgba);        
    }

} 

export default Methods;

