var graphics = (function (){
  var context = null;
  return {
    setCanvas: function (canvas) {
      context = canvas.getContext('2d');
    },
    getCanvas: function () {
      return context;
    },
    degreeToRadians: function (degrees) {
      return degrees * Math.PI / 180;
    },
    drawLine: function (start, length, angle) {
      if (!context) {
        console.log("no canvas to draw"); 
        return;
      }
      else {
        var end = [start[0] + length * Math.cos(angle), start[1] + length * Math.sin(angle)];
        context.beginPath();
        context.moveTo(start[0], start[1]);
        context.lineTo(end[0], end[1]);
        context.stroke();
        return end;
      }
    },
    drawSegment: function (start, end) {
      if (!context) {
        console.log("no canvas to draw"); 
        return;
      }
      else {
        context.beginPath();
        context.moveTo(start[0], start[1]);
        context.lineTo(end[0], end[1]);
        context.stroke();
        return end;
      }
    }
  };
})(); 

var lTransforms = (function () {
  var generate = function(depth, start, subs) {
    if (depth == 0) return start;
    else {
      var seq = "";
      for (var i = 0; i < start.length; i += 1) {
        seq += subs[start.charAt(i)] || start[i];
      }
      return generate(depth -1, seq, subs);
    }
  };

  return {
    // Call this method with initial condidtion and substitutions
    // e.g generateSeq(depth, "A+B+A", "A->A-B+A". "B->A-B-A")
    generateSeq: function () {
      var args = Array.prototype.slice.call(arguments), 
      depth = args[0], start = args[1], substitutions = args.slice(2),
      subs = {};
      for (var i = 0; i < substitutions.length; i += 1) {
        var patterns = substitutions[i].split("->");
        subs[patterns[0]] = patterns[1];
      }
      return generate(depth, start, subs);
    }
  };
})();