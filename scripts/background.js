!(function(){
  var width = innerWidth,
      height = innerHeight;

  var canvas = d3.select('#background-canvas').append("canvas")
      .attr({width: width, height: height})


  d3.select(window).on('resize.background', function(){
    width  = innerWidth
    height = innerHeight
    canvas.attr({width: width, height: height})
  })


  var ctx = canvas.node().getContext("2d");

  ctx.fillStyle = '#f94600'
  ctx.fillRect(0, 0, width, height)

  var shapes = [],
      curTime = 0,
      l = 14,
      unload = function(){ shapes = shapes.filter(function(d){ d.start > curTime }) }

  d3.timer(function(t){
    curTime = t

    shapes.forEach(function(s){
      if (t < s.start) return

      var u = (t - s.start)/(s.end - s.start)

      if (u > 1){
        u = 1
        s.done = true
      }

      ctx.fillStyle = s.fill
      if (s.type == 'rect'){
        var a0 = s.sV[0]*(1 - u) + s.eV[0]*u
        var a1 = s.sV[1]*(1 - u) + s.eV[1]*u
        var a2 = s.sV[2]*(1 - u) + s.eV[2]*u
        var a3 = s.sV[3]*(1 - u) + s.eV[3]*u
        ctx.fillRect(a0, a1, a2, a3)
      }
      if (s.type == 'circle'){
        var a0 = s.sV[0]*(1 - u) + s.eV[0]*u
        var a1 = s.sV[1]*(1 - u) + s.eV[1]*u
        var a2 = s.sV[2]*(1 - u) + s.eV[2]*u

        ctx.beginPath()
        ctx.arc(a0, a1, a2, 0, Math.PI*2, true)
        ctx.closePath()
        ctx.fill()
      }
    })

    shapes = shapes.filter(function(s){ return !s.done })
  })


  // wave squares
  !(function(){
    var module = {sel: d3.select('.sectionNum4'), active: false, onunload: unload}
    addModule(module)

    var colors = colorArray.slice(1, 4)
    var offset = 1

    setInterval(function(){
      if (!module.active) return
      var speed = Math.random()*.0003 + .2
      offset++
      d3.range(0, width + l, l).forEach(function(x, i){
        d3.range(0, height + l, l).forEach(function(y, j){
          if (!!((i + j + offset) % 4)) return
          if (Math.random() < .3) return
          var shape =
            { x: x,
              y: y,
              i: i,
              j: j,
              type: 'rect',
              start: curTime + (i + j)*40*speed + Math.random()*200,
              sV: [x, y, 0, 0],
              eV: [x, y, l, l],
              fill: offset % 10 ? colors[offset % 3] : 'white'
            }
          shape.end = shape.start + 500
          shapes.push(shape)
        })
      })

    }, 800)
  })()

  //sprial squares
  !(function(){
    var module = {sel: d3.select('.sectionNum5'), active: false, onunload: unload}
    // addModule(module)

    var colors = colorArray.slice(0, 3)
    var offset = 1
    setInterval(function(){
      if (!module.active) return

      offset++
      d3.range(0, width + l, l).forEach(function(x, i){
        d3.range(0, height + l, l).forEach(function(y, j){
          if (!!((i + j + offset) % 2)) return
          if (Math.random() < .3) return

          var d = Math.random() < .5  //shape moves down
          var r = Math.random() < .5  //shape moves left

          var shape =
            { x: x,
              y: y,
              i: i,
              j: j,
              type: 'rect',
              start: curTime + d*1000 + r*1000 + (d && !r)*1000*2 + Math.random()*400,
              sV: [r ? x : x + l, d ? y : y + l, 0, 0],
              eV: [x, y, l, l],
              fill: offset % 18 ? colors[offset % 3] : 'white'
            }
          shape.end = shape.start + 500
          shapes.push(shape)
        })
      })

    }, 5/4*1000)
  })()

  //circles
  !(function(){
    var module = {sel: d3.select('#headerArt'), active: true, onunload: unload}
    addModule(module)

    var colors = colorArray.slice(0, 3)
    var offset = 1
    setInterval(function(){
      if (!module.active) return

      offset++
      var size = Math.random()
      d3.range(0, width + l, l*10).forEach(function(x, i){
        d3.range(0, height + l, l*10).forEach(function(y, j){
          // if (!!((i + j + offset) % 2)) return
          // if (Math.random() < .3) return

          var shape =
            { x: x,
              y: y,
              i: i,
              j: j,
              type: 'circle',
              start: curTime + Math.random()*4,
              sV: [x, y, 0],
              eV: [x, y, l*3 + Math.random()*l*5*size],
              fill: offset % 18 ? colors[offset % 3] : 'white'
            }
          shape.end = shape.start + 1000
          shapes.push(shape)
        })
      })

    }, 1000/3)
  })()



  //different sized squares
  !(function(){
    // d3.select('.overlay').style('display', 'none')
    var module = {sel: d3.select('.sectionNum2'), active: false, onunload: unload}
    addModule(module)

    // Object.observe(module, function (changes){
    //   console.log("Changes:");
    //   console.log(changes.name);
    //   if (!module.active) debugger
    // })


    var colors = colorArray.slice(0, 3)
    var offset = 1
    setInterval(function(){
      if (!module.active) return

      offset++
      var sizeI = Math.ceil(Math.random()*3.5)
      // size = Math.floor((offset % 2) + Math.random()*2.5)
      // size = offset % 5
      var size = sizeI*sizeI*.8
      d3.range(0, width + l, l*size).forEach(function(x, i){
        d3.range(0, height + l, l*size).forEach(function(y, j){
          if (!!((i + j + sizeI + (Math.random() < .1)) % 2)) return
          if (Math.random() < .3) return

          var shape =
            { x: x,
              y: y,
              i: i,
              j: j,
              type: 'rect',
              start: curTime + Math.random()*4,
              sV: [x + l*size/2, y + l*size/2, 0, 0],
              eV: [x, y, l*size, l*size],
              fill: offset % 18 ? colors[offset % 3] : 'white'
            }
          if (size > 4) shape.fill = colors[Math.floor(Math.random()*3)]
          shape.end = shape.start +800
          shapes.push(shape)
        })
      })

    }, 1/4*1000)
  })()

  //down wave
  !(function(){
    var module = {sel: d3.select('.sectionNum3'), active: false, onunload: unload}
    addModule(module)

    var colors = colorArray.slice(2, 5)
    var offset = 1
    setInterval(function(){
      if (!module.active) return

      var speed = Math.random()*.5 + .5
      speed = 1
      offset++
      var m = offset % 4
      d3.range(0, width + l, l).forEach(function(x, i){
        d3.range(0, height + l, l).forEach(function(y, j){
          if (!((i + j + offset) % 5)) return
          if (Math.random() < .6) return

          var stagger = speed*40 + Math.random()*5
          var start = curTime
          var sV = []
          if        (m == 0){
            start += j*stagger
            sV = [x, y, l, 0]
          } else if (m == 1){
            start += (width /l - i)*stagger
            sV = [x + l, y, 0, l]
          } else if (m == 2){
            start += (height/l - j)*stagger
            sV = [x, y + l, l, 0]
          } else if (m == 3){
            start += i*stagger
            sV = [x, y, 0, l]
          }

          var shape =
            { x: x,
              y: y,
              i: i,
              j: j,
              type: 'rect',
              start: start,
              sV: sV,
              eV: [x, y, l, l],
              fill: offset % 10 ? colors[offset % 3] : 'white'
            }
          shape.end = shape.start + 200*Math.random()
          shapes.push(shape)
        })
      })

    }, 2000)
  })()

})();


