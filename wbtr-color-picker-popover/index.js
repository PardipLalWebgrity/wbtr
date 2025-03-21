import {
    Blur,
    Click,
    Keyup,
    Input,
    Pointerdown,
    Pointermove,
    Pointerup,
} from './events/index.js';
 
import methods from './utils/methods.js';
import props from './utils/props.js';

import WBTRCustomElement from '../../../wbtr-custom-element/index.js';
import html from './html.js';


class WBTR_Color_Picker_Popover extends WBTRCustomElement{

    _methods = methods;
    _props = props;    

    constructor(){
        super();
        this.html = html;
        this.moduleURL = import.meta.url;
    }

    connectedCallback(){
        this.attachShadow({mode: 'open'});
        this._defaultSetup();
        this._props._root = this;              
    }

    _pointerdownHandler(e){
        super._pointerdownHandler(e);
        Pointerdown._handler(e);
    }

    _pointermoveHandler(e){
        super._pointermoveHandler(e);
        Pointermove._handler(e);
    }

    _pointerupHandler(e){
        super._pointerupHandler(e);
        Pointerup._handler(e);
    }

    _keyupHandler(e){
        Keyup._handler();
    }

    _inputHandler(e){
        Input._handler();
    }

    _clickHandler(e){
        super._clickHandler();
        Click._handler();
    }
  
    _blurHandler(e){
        Blur._handler();
    }    

    _init(){
        this._methods._defaultUI();            
    }
}

if(!customElements.get('wbtr-color-picker-popover')){
    customElements.define('wbtr-color-picker-popover',WBTR_Color_Picker_Popover);   
}


// rgba must be some value, when user fully remove g input value and change r value, error come, so when g value fully remove, add 0.










