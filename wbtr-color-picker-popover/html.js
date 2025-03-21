const html = `
<section class="wrapper">
  <div class="cpicker" data-id="cpicker">
    <header data-event-id="moveable-box" data-moveable-box-target="component" data-moveable-box-target-name="colorPickerPopover">   
      <h5 class="popup-title">Appearance</h5>
      <button class="close-popup-btn" data-event-id="popover-close" data-popover-name="colorPickerPopover"></button>
    </header>
    <div class="cpicker-box">
      <canvas class="cpicker-box-canvas" data-id="cpicker-box-canvas" width="271" height="271"></canvas>
      <span class="cpicker-box-thumb" data-id="cpicker-box-thumb"></span>
    </div>
    <div class="cpicker-content">  

      <div class="cpicker-gradient" data-id="cpicker-gradient">
        <canvas data-id="cpicker-gradient-canvas" width="251" height="32"></canvas>       
        <input data-id="cpicker-gradient-input" type="range" min="0" max="250" step="1" value="0.66"> <!-- why min 0, max 1, i think 271 max -->
      </div>

      <div class="cpicker-transparent">       
        <div class="overlay" data-id="cpicker-transparent-overlay"></div> 
        <input data-id="cpicker-transparent-input" type="range" min="0.00" max="1.00" step="0.01" value="0.5">
      </div>

      <div class="cpicker-code">        
        <details class="select-wrapper cpicker-codetype-select">
            <summary class="select-trigger" value="hexa">HEXA</summary>
            <div class="select-options scroll-design" style="top:-105px;left:0;max-height:120px;width:90px;">                      
                <span class="select-option selected" data-class="cpicker-codetype-option" data-event-id="select-option" data-select-option="cpicker-codetype" data-value="rgba">RGBA</span>                
                <span class="select-option" data-class="cpicker-codetype-option" data-event-id="select-option" data-select-option="cpicker-codetype" data-value="css">CSS</span>                
                <span class="select-option" data-class="cpicker-codetype-option" data-event-id="select-option" data-select-option="cpicker-codetype" data-value="hexa">HEXA</span>                
            </div>
        </details>
        <div class="cpicker-code-inputs">
          <div class="cpicker-code-input cpicker-code-hex show" data-class="cpicker-codetype-content" data-cpicker-codetype-content="hexa">
            <input type="text" data-id="cpicker-code-hex-input" placeholder="#000000">
          </div>
          <div class="cpicker-code-input cpicker-code-rgba" data-class="cpicker-codetype-content" data-cpicker-codetype-content="rgba">
            <input type="number" data-id="cpicker-code-rgba-rinput" placeholder="255" step="1" min="0" max="255">
            <input type="number" data-id="cpicker-code-rgba-ginput" placeholder="255" step="1" min="0" max="255">
            <input type="number" data-id="cpicker-code-rgba-binput" placeholder="255" step="1" min="0" max="255">
            <input type="number" data-id="cpicker-code-rgba-ainput" placeholder="0.01" step="0.01" min="0" max="1">
          </div>
          <div class="cpicker-code-input cpicker-code-css" data-class="cpicker-codetype-content" data-cpicker-codetype-content="css">
            <input type="text" data-id="cpicker-code-css-input" placeholder="rgba(255, 255, 255, 0.99)">
          </div>
        </div>
      </div>

    </div>

    <span class="separator"></span>

    
    
  </div>
</section>
`;

export default html;
