import props from '../utils/props.js';

class Click {
  
    static _handler(e) {
        // select        
        if (WBTR.eventTarget.closest('[data-select-option="cpicker-codetype"]')) this.switchColorCodeType();

        // radio
        if (WBTR.eventTarget.type === 'radio') {
            if (WBTR.eventTarget.closest('[data-event-id="switch-backgroundtype"]')) this.switchBackgroundType();
        }
    }

    static switchColorCodeType() {
        const selectedOptionValue = WBTR.eventTarget.closest('[data-event-id="select-option"]').dataset.value;
        props._root.$class.cpickerCodetypeContent.forEach((el)=>{
          el.classList.remove('show');
        })
        props._root.shadowRoot.querySelector(`[data-cpicker-codetype-content='${selectedOptionValue}']`).classList.add('show');
    }

    static _switchBackgroundType(tValue) {
        
    }

}

export default Click;