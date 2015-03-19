(function (define) {
  define("noBANValidator", function (require, exports) {
    exports.isValid = function (number) {
      if (typeof number !== "string") {
        return false;
      }

      if (number.length !== 11) {
        return false;
      }

      if (!/^\d+$/.test(number)) {
        return false;
      }

      if (exports.calculateChecksum(number.substring(0, 10)).toString() !== number[10]) {
        return false;
      }

      return true;
    };

    exports.calculateChecksum = function (number) {
      if (typeof number !== "string") {
        return false;
      }

      if (number.length !== 10) {
        return false;
      }

      number = number.split("").map(function (number) {
        return parseInt(number);
      });

      var checksum =
          11
        - ( (   5 * number[0]
              + 4 * number[1]
              + 3 * number[2]
              + 2 * number[3]
              + 7 * number[4]
              + 6 * number[5]
              + 5 * number[6]
              + 4 * number[7]
              + 3 * number[8]
              + 2 * number[9]
            )
            % 11
          );

      if (checksum === 10) {
        return false;
      }

      if (checksum === 11) {
        checksum = 0;
      }

      return checksum;
    };
  });
}(typeof define === 'function' && define.amd ? define : function (id, factory) {
  if (typeof exports !== 'undefined') {
    factory(require, exports);
  } else {
    factory(function(value) {
      return window[value];
    }, (window[id] = {}));
  }
}));
