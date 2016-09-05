var updownResizeHelper = {
  resizeEvent: new Event('resize'),
  setWidth: function(w, trigger) {
    window.innerWidth = w;
    if(trigger) window.dispatchEvent(this.resizeEvent);
  }
}
