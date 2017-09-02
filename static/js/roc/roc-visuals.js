
// There will be several visualisations on our page that share the same underlying
// data. This state will be managed by a "berryModel"
var berryModel =  {
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
  views: [],
  register : function(callback) {
    this.views.push(callback)
  },
  updateViews : function() {
    for (i = 0; i < this.views.length; i++) {
      this.views[i]();
    }
  }
}

var berryPlot = berryClusterPlot(); // Interactive berry plot
var confusionMatrix = confusionMatrix(); // Confusion matrix visual

// Place our iteractive plot wherever we have berryClasses figures
d3.selectAll("figure.berryClasses")
  .datum(berryModel)
  .call(berryPlot);

// Place our confusion matrix at the berryMatrix figure, and provide a
// callback for the berry model to keep it updated
function updateMatrix() {
  d3.select("figure.berryMatrix")
    .datum(berryModel)
    .call(confusionMatrix);
}
berryModel.register(updateMatrix);
updateMatrix();

// Static berries, draw once with d3
var berrySize = 18;
var berryMargin = {top: 10, right: 5, bottom: 5, left: 5},
    berryWidth = 200  ,
    berryHeight = 50;
var berryStatic = d3.select("figure.berries")
  .append("svg")
  .attr("viewBox", 0 + " " + 0 + " " + (berryWidth + berryMargin.left + berryMargin.right) +
        " " + (berryHeight + berryMargin.bottom + berryMargin.top))
  .attr("preserveAspectRatio", "xMidYMid meet")
  .append("g")
    .attr("transform", "translate(" + berryMargin.left + "," + berryMargin.top + ")");
berryStatic.append("circle")
  .attr("transform", "translate(" + berryWidth / 4 + "," + berryHeight / 2 + ")")
  .attr("r",  berrySize - 7)
  .attr("class", "raspberry")
berryStatic.append("circle")
  .attr("transform", "translate(" + 3 * berryWidth / 4 + "," + berryHeight / 2 + ")")
  .attr("r",  berrySize - 7)
  .attr("class", "blueberry")
berryStatic.append("text")
  .attr("x", berryWidth / 4)
  .attr("y", 5)
  .style("font-weight", "bold")
  .style("text-anchor", "middle")
  .style("alignment-baseline", "bottom")
  .text("+");
berryStatic.append("text")
  .attr("x", 3 * berryWidth / 4)
  .attr("y", 5)
  .style("font-weight", "bold")
  .style("text-anchor", "middle")
  .style("alignment-baseline", "bottom")
  .text("−");

// Static berry label examples
var margin = {top: 0, right: 5, bottom: 5, left: 5},
    width = 120,
    height = 120;
var berryStatic = d3.select("figure.berryLabels")
  .append("svg")
  .attr("viewBox", 0 + " " + 0 + " " + (width + margin.left + margin.right) +
        " " + (height + margin.bottom + margin.top))
  .attr("preserveAspectRatio", "xMidYMid meet")
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// top left
berryStatic.append("circle")
  .attr("transform", "translate(" + width / 4 + "," + height / 4 + ")")
  .attr("r",  berrySize - 7)
  .attr("class", "raspberry")
berryStatic.append("circle")
  .attr("transform", "translate(" + width / 4 + "," + height / 4 + ")")
  .attr("r",  berrySize).attr("class", "pos");
// top right
berryStatic.append("circle")
  .attr("transform", "translate(" + 3 * width / 4 + "," + height / 4 + ")")
  .attr("r",  berrySize - 7)
  .attr("class", "raspberry")
berryStatic.append("circle")
  .attr("transform", "translate(" + 3 * width / 4 + "," + height / 4 + ")")
  .attr("r",  berrySize).attr("class", "neg");
// bottom left
berryStatic.append("circle")
  .attr("transform", "translate(" + width / 4 + "," + 3 * height / 4 + ")")
  .attr("r",  berrySize - 7)
  .attr("class", "blueberry")
berryStatic.append("circle")
  .attr("transform", "translate(" + width / 4 + "," + 3 * height / 4 + ")")
  .attr("r",  berrySize).attr("class", "pos");
// bottom right
berryStatic.append("circle")
  .attr("transform", "translate(" + 3 * width / 4 + "," + 3 * height / 4 + ")")
  .attr("r",  berrySize - 7)
  .attr("class", "blueberry")
berryStatic.append("circle")
  .attr("transform", "translate(" + 3 * width / 4 + "," + 3 * height / 4 + ")")
  .attr("r",  berrySize).attr("class", "neg");
