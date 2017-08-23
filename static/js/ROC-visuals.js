// Visualisation initial data
var berries = [{"type" : 0, "label" : 0},
               {"type" : 0, "label" : 1},
               {"type" : 1, "label" : 1},
               {"type" : 1, "label" : 1},
               {"type" : 1, "label" : 0},
               {"type" : 0, "label" : 0},
               {"type" : 0, "label" : 0},
               {"type" : 0, "label" : 0},
               {"type" : 0, "label" : 1},
               {"type" : 1, "label" : 1},
               {"type" : 0, "label" : 0},
               {"type" : 0, "label" : 1}];

var berries2 = [{"type" : 1, "label" : 0},
               {"type" : 1, "label" : 1},
               {"type" : 1, "label" : 1},
               {"type" : 1, "label" : 1},
               {"type" : 1, "label" : 0},
               {"type" : 1, "label" : 0},
               {"type" : 1, "label" : 0},
               {"type" : 1, "label" : 0},
               {"type" : 1, "label" : 1},
               {"type" : 1, "label" : 1},
               {"type" : 0, "label" : 0},
               {"type" : 1, "label" : 1}];

var berries3 =  {
  state : [{"type" : 0, "label" : 0},
           {"type" : 0, "label" : 1},
           {"type" : 1, "label" : 1},
           {"type" : 1, "label" : 1},
           {"type" : 1, "label" : 0},
           {"type" : 0, "label" : 0},
           {"type" : 0, "label" : 0},
           {"type" : 0, "label" : 0},
           {"type" : 0, "label" : 1},
           {"type" : 1, "label" : 1},
           {"type" : 0, "label" : 0},
           {"type" : 0, "label" : 1}],
  // get: function() {return this.state;},
  // set: function(x) {
  //   this.state = x;
  //   d3.select("figure.berryMatrix")
  //     .datum(this)
  //     .call(confusionMatrix);
  // }

  updatePlots : function() {
    d3.select("figure.berryMatrix")
      .datum(this)
      .call(confusionMatrix);
    d3.selectAll("figure.berryClasses")
      .datum(this)
      .call(berryPlot)
  }
}

//
// // New approach where we have a global simulation that gets passed to instances
// // of the berry visualisation
// // force functions for layout of berries
// var  margin = {top: 15, right: 5, bottom: 5, left: 5},  // default margin
//      width = 390  ,  // default width
//      height = 170;  // default height
//
//
// var clusters = [{x: (-width / 4), y: 0}, {x: (width / 4), y : 0}];
// var forceX = d3.forceX((d) => clusters[d.label == 1 ? 1 : 0].x).strength(0.04);
// var forceY = d3.forceY((d) => clusters[d.label == 1 ? 1 : 0].y).strength(0.04);
//
// var berrySize = 18
//
// var simulation = d3.forceSimulation()
//   .velocityDecay(0.2)
//   .force("collide", d3.forceCollide(berrySize + 3).iterations(2))
//   .force('x', forceX)
//   .force('y', forceY)
//   .alphaTarget(1)
//   .on("tick", ticked)
//
// // simulation interaction functions
// function dragstarted(d) {
//   d3.event.subject.fx = d3.event.subject.x;
//   d3.event.subject.fy = d3.event.subject.y;
//   d.label = d.label == 1 ? 0 : 1;
//   // data.state = localData;
// }
// function dragged(d) {
//   d3.event.subject.fx = d3.event.x;
//   d3.event.subject.fy = d3.event.y;
// }
// function dragended(d) {
//   d3.event.subject.fx = null;
//   d3.event.subject.fy = null;
//   data.updatePlots()
// }
// function dragsubject() {
//   return simulation.find(d3.event.x, d3.event.y);
// }
//
// // simulation tick function
// function ticked() {
//   nodes.attr("transform", function(d) {return "translate(" + d.x + "," + d.y + ")"})
// }
//


var berryPlot = berryClusterPlot();
var confusionMatrix = confusionMatrix();

d3.selectAll("figure.berryClasses")
  .datum(berries3)
  .call(berryPlot)

var mat = d3.select("figure.berryMatrix")
  .datum(berries3)
  .call(confusionMatrix)

 // confusionMatrix.update()

// setInterval(function () {
//     d3.select("figure.berryMatrix")
//       .datum(berries2)
//       .call(confusionMatrix);
// }, 2000);
