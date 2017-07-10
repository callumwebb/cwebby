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
    d3.select("figure.berryClasses")
      .datum(this)
      .call(berryPlot)
  }
}

var berryPlot = berryClusterPlot();
var confusionMatrix = confusionMatrix();

d3.select("figure.berryClasses")
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







