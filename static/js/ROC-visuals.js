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

var berryPlot = berryClusterPlot();
var confusionMatrix = confusionMatrix();

d3.select("figure.berryClasses")
  .datum(berries)
  .call(berryPlot)

var mat = d3.select("figure.berryMatrix")
  .datum(berries)
  .call(confusionMatrix)

 // confusionMatrix.update()

// setInterval(function () {
//     d3.select("figure.berryMatrix")
//       .datum(berries2)
//       .call(confusionMatrix);
// }, 2000);







