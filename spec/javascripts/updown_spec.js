'use strict';

jasmine.getFixtures().fixturesPath = 'base/spec/fixtures';

describe('UpDown Settings', function() {

  it('should throw and Argument Error if no breakpoints are defined', function() {
    expect(function() { updown() }).toThrow(new Error('You must provide an array of breakpoints'));
  });

  it('should return a list of breakpoints when initialized', function() {
    var bp = [200, 400];
    var ud = updown(bp);
    expect(ud).toEqual(bp);
  });

  it('should sort the breakpoints small to large', function() {
    var bp = [200, 400, 1100, 300, 100];
    var ud = updown(bp);
    expect(ud).toEqual([100, 200, 300, 400, 1100]);
  });

  it('should not allow duplicate breakpoints', function() {
    var ud = updown([200, 200]);
    expect(ud).toEqual([200]);
  });

});

describe('UpDown events', function() {

  beforeAll(function() {
    this.resize = updownResizeHelper;
    this.listeners = updownListeners;
    this.listeners.init();
  });

  beforeEach(function() {
    loadFixtures('updown.html');
    jasmine.clock().install();
    this.listeners.uncheckAll();
  });

  afterEach(function() {
    jasmine.clock().uninstall();
  });

  it('fires up events', function() {
    // Resize 300 -> 1200
    this.resize.setWidth(300);
    updown([400, 600, 1100]);
    this.resize.setWidth(1200, true);
    // Wait for event listeners to catch events from debounce
    jasmine.clock().tick(100);
    expect(document.querySelector('#check-400-up')).toBeChecked();
    expect(document.querySelector('#check-600-up')).toBeChecked();
    expect(document.querySelector('#check-1100-up')).toBeChecked();
  });

  it('fires down events', function() {
    this.resize.setWidth(1200);
    updown([400, 600, 1100]);
    this.resize.setWidth(300, true);
    jasmine.clock().tick(100);
    expect(document.querySelector('#check-400-down')).toBeChecked();
    expect(document.querySelector('#check-600-down')).toBeChecked();
    expect(document.querySelector('#check-1100-down')).toBeChecked();
  });

  it('does not fire events if no breakpoint is passed', function() {
    this.resize.setWidth(300);
    updown([400, 600, 1100]);
    this.resize.setWidth(350, true);
    jasmine.clock().tick(100);
    expect(document.querySelector('#check-400-up')).not.toBeChecked();
    expect(document.querySelector('#check-600-up')).not.toBeChecked();
    expect(document.querySelector('#check-1100-up')).not.toBeChecked();
    expect(document.querySelector('#check-400-down')).not.toBeChecked();
    expect(document.querySelector('#check-600-down')).not.toBeChecked();
    expect(document.querySelector('#check-1100-down')).not.toBeChecked();
  });

  it('honors the debounce option', function() {
    this.resize.setWidth(300);
    updown([400, 600, 1100], { lag: 1000 });
    this.resize.setWidth(500, true);
    // Should not be checked before lag timeout (800 < 1000)
    jasmine.clock().tick(800);
    expect(document.querySelector('#check-400-up')).not.toBeChecked();
    // Should be checked after (400+800 > 1000)
    jasmine.clock().tick(400);
    expect(document.querySelector('#check-400-up')).toBeChecked();
  });

});
