"use strict";

const fract =  Math.PI / 180;

class Settings {
  constructor(start, depth, color, strokeLength) {
    this.start = start ?? [200, 500];
    this.depth = depth ?? 10;
    this.color = color ?? "#000000";
    this.length = strokeLength ?? (1000 / Math.pow(2, (depth || 10)));
  }
}

class Params {
  constructor(axiom, aTransform, bTransform, angle) {
    this.axiom = axiom.split("");
    this.aTransform = aTransform.split("");
    this.bTransform = bTransform.split("");
    this.angle = angle;
    this.cos = Math.cos(angle)
  }
}

class Graphics {
  static drawLine(context, start, length, angle, color) {
    let end = [start[0] + length * Math.cos(angle), start[1] + length * Math.sin(angle)];
    context.beginPath();
    context.moveTo(start[0], start[1]);
    context.lineTo(end[0], end[1]);
    context.strokeStyle = color;
    context.stroke();
    return end;
  }
}

class LTransforms {
  constructor(context, settings, params) {
    this.context = context;
    this.settings = settings;
    this.params = params;
  }
  
  makeSequence(settings, params) {
    function compileSeq(sequence, aTrans, bTrans, depth) {
      if (depth == 0) return sequence;
      else {
        let newSequence = new Array();
        for (let letter of sequence) {
          switch(letter) {
            case 'A': Array.prototype.push.apply(newSequence, aTrans); break;
            case 'B': Array.prototype.push.apply(newSequence, bTrans); break;
            default : newSequence.push(letter); 
          }
        }
        return compileSeq(newSequence, aTrans, bTrans, depth -1);
      } 
    }

    return compileSeq(params.axiom, params.aTransform, params.bTransform, settings.depth);
  }
  
  makeAngles(angle) {
    let angles = new Array(), start = -10, end = 10;
    for (let i = start; i <= end; i++) {
      angles.push(i * angle * fract);
    }
    return angles;
  } 

  finalRender(context, sequence, settings, params) {
    let angles = this.makeAngles(params.angle),
        angleIndex = Math.floor(angles.length / 2 ),
        start = settings.start;

    for (let letter of sequence) {
      switch(letter) {
        // Move forward for both the cases
        case 'F':
          start = Graphics.drawLine(
            context, start, settings.length, angles[angleIndex], settings.color);
          break;
        // turn right
        case '+': angleIndex += 1; break;
        // turn left
        case '-': angleIndex -= 1; break;
        // do nothing 
        default: 
      }
    }
  }

  render() {
    try {
      let sequence = this.makeSequence(this.settings, this.params);
      this.finalRender(this.context, sequence, this.settings, this.params);
    } catch(error) {
      alert("failed to render");
      console.log("failed to render: " + error);
    }
  }

}

class Page {
  render() {
    let canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height);
    let startX = Number(document.getElementById('startX').value),
        startY = Number(document.getElementById('startY').value),
        slider = document.getElementById('slider').value,
        color  = document.getElementById('strike-color').value,
        length = Number(document.getElementById('strike-length').value),
        axiom = document.getElementById('axiom').value,
        aTrans = document.getElementById('a-transform').value,
        bTrans = document.getElementById('b-transform').value,
        angle = Number(document.getElementById('angle').value);

    let settings = new Settings([startX, startY], slider, color, length);
    let params = new Params(axiom, aTrans, bTrans, angle);
    new LTransforms(context, settings, params).render();
  }
}
