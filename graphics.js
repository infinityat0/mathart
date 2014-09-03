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

var lTransforms = (function (){
  return {
    // Call this method with initial condidtion and substitutions
    // e.g generateSeq(depth, "A+B+A", "A->A-B+A". "B->A-B-A")
    generateSeq: function (depth, start, substitutions) {
      if (depth == 0) return start;
      else {
        for (var i = 0; i < substitutions.length; i += 1) {
          var letters = [], subs = [];
          var patterns = substitutions[i].split("->");
          letters.push(patterns[0]);
          subs.push(patterns[1]);
        }
        
      }
    }
  };
})();