
import props from '../utils/props.js';
import methods from '../utils/methods.js';

class Pointerup {

	static _handler(e){		
   if (WBTR.eventTarget.dataset.id == 'cpicker-box-canvas') {
     props._root.$id.cpickerBoxCanvas.releasePointerCapture(e.pointerId); 
     props._color = methods._getSolidColorCanvasXYColor(e);
   }
    
	}


}

export default Pointerup;