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

var berryPlot = berryClusterPlot().berrySize(22);

d3.selectAll("figure.berryClasses")
  .datum(berries)
  .call(berryPlot)
