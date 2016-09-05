module.exports = function(config) {
  config.set({
    frameworks: ['jasmine-jquery','jasmine'],
    browsers: ['PhantomJS'],
    files: [
      { pattern: 'src/updown.js', watched: true, nocache: true },
      { pattern: 'spec/fixtures/*.html', watched: true, nocache: true},
      { pattern: 'spec/helpers/*.js', watched: true, nocache: true },
      { pattern: 'spec/javascripts/*.js', watched: true, nocache: true }
    ],
    reporters: ['dots']
  });
};
