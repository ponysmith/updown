var updownListeners = {
  init: function() {
    var listeners = this;
    var bps = [400, 600, 1100];
    bps.forEach(function(bp) {
      window.addEventListener(bp + '.up', updownListeners.check, false);
      window.addEventListener(bp + '.down', updownListeners.check, false);
    });
  },

  check: function() {
    var event_splits = event.type.split('.');
    var bp = event_splits[0];
    var dir = event_splits[1];
    var el = document.querySelector('#check-' + bp + '-' + dir);
    el.checked = true;
  },

  uncheckAll: function() {
    var inputs = document.querySelectorAll('#updown-checks input[type="checkbox"]');
    for(i=0; i<inputs.length; i++) {
      inputs[i].checked = false;
    }
  }
}
