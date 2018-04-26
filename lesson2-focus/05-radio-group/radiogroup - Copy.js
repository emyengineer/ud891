(function() {
  'use strict';

  // Define values for keycodes
  var VK_ENTER      = 13;
  var VK_SPACE      = 32;
  var VK_LEFT       = 37;
  var VK_UP         = 38;
  var VK_RIGHT      = 39;
  var VK_DOWN       = 40;
  var TAB           = 9;
  var SPACE         = 32;

  // Helper function to convert NodeLists to Arrays
  function slice(nodes) {
    return Array.prototype.slice.call(nodes);
  }

  function RadioGroup(id) {
    this.el = document.querySelector(id);
    this.buttons = slice(this.el.querySelectorAll('.radio'));
    this.focusedIdx = 0;
    this.focusedButton = this.buttons[this.focusedIdx];

    this.el.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  RadioGroup.prototype.handleKeyDown = function(e) {
    switch(e.keyCode) {

      case VK_UP:
      case VK_LEFT: {

        e.preventDefault();

        // This seems like a good place to do some stuff :)
        if(this.focusedIdx > 0) {
           this.focusedIdx --;
        } else {
          this.focusedIdx = 0;
          this.focusedButton = this.buttons[this.focusedIdx];
        }
         this.changeFocus(this.focusedIdx); // <-- Hmm, interesting...

        break;

      }

      case VK_DOWN:
      case VK_RIGHT: {

        e.preventDefault();

        // This seems like a good place to do some stuff :)
        if(this.focusedIdx < this.buttons.length ) {

            console.log('Focused Index before increment '+ this.focusedIdx);
            this.focusedIdx++;
            this.focusedButton = this.buttons[this.focusedIdx];
            console.log('Focused Index after increment '+ this.focusedIdx);

        } else {
          this.focusedIdx = 0  ;
          this.focusedButton = this.buttons[this.focusedIdx];
        }
         this.changeFocus(this.focusedIdx); // <-- Hmm, interesting...

        break;
      }

      case TAB: {
        e.preventDefault();
        if(this.focusedIdx < this.buttons.length ) {
                console.log('Focused Index', this.focusedIdx);
                this.focusedIdx++;
               // Set the old button to tabindex -1
                this.focusedButton.tabIndex = -1;
                // Set the new button to tabindex 0 and focus it
                this.focusedButton = this.buttons[this.focusedIdx];
                this.focusedButton.tabIndex = 0;
                this.focusedButton.focus();
          }
          else {
                this.focusedIdx = 0  ;
                this.focusedButton = this.buttons[this.focusedIdx];
        }
        break;

      }
      case SPACE: {
        e.preventDefault();
        if(this.focusedButton.getAttribute('checked') === null) {
          var checkedBtn = document.querySelector('[tabIndex="0"]');
          checkedBtn.removeAttribute('checked');
          this.focusedButton.setAttribute('checked', 'checked');

        } else {

          this.focusedButton.removeAttribute('checked');
        }
        break;
      }
    
    }

   
  };

  RadioGroup.prototype.changeFocus = function(idx) {
    // Set the old button to tabindex -1
    this.focusedButton.tabIndex = -1;
    this.focusedButton.removeAttribute('checked');

    // Set the new button to tabindex 0 and focus it
    this.focusedButton = this.buttons[idx];
    this.focusedButton.tabIndex = 0;
    this.focusedButton.focus();
    this.focusedButton.setAttribute('checked', 'checked');
  };

  var group1 = new RadioGroup('#group1');

}());
