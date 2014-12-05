define("ghost/utils/word-count", 
  ["exports"],
  function(__exports__) {
    "use strict";
    // jscs: disable
    function wordCount(s) {
        s = s.replace(/(^\s*)|(\s*$)/gi, ''); // exclude  start and end white-space
        s = s.replace(/[ ]{2,}/gi, ' '); // 2 or more space to 1
        s = s.replace(/\n /gi, '\n'); // exclude newline with a start spacing
        s = s.replace(/\n+/gi, '\n');

        return s.split(/ |\n/).length;
    }

    __exports__["default"] = wordCount;
  });