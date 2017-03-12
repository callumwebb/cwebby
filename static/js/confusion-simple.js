
var  margin = {top: 20, right: 20, bottom: 20, left: 20},
     width = 200,
     height = 100;

var svg = d3.select("figure.confusionMatrix").append("svg")
  .attr("viewBox", 0 + " " + 0 + " " + (width + margin.left + margin.right) + " " + (height + margin.bottom + margin.top))
  .attr("preserveAspectRatio", "xMidYMid meet")
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

var color = d3.scaleOrdinal(d3.schemeCategory10);


function dragstarted(d) {
  d3.event.subject.fx = d3.event.subject.x;
  d3.event.subject.fy = d3.event.subject.y;
}

function dragged(d) {
  d3.event.subject.fx = d3.event.x;
  d3.event.subject.fy = d3.event.y;
}

function dragended(d) {
  d3.event.subject.fx = null;
  d3.event.subject.fy = null;
}

var nodes = [{"type" : "blueberry", "label" : "blueberry"}, 
             {"type" : "blueberry", "label" : "blueberry"}, 
             {"type" : "blueberry", "label" : "blueberry"}, 
             {"type" : "blueberry", "label" : "raspberry"}, 
             {"type" : "raspberry", "label" : "raspberry"}, 
             {"type" : "raspberry", "label" : "raspberry"}, 
             {"type" : "raspberry", "label" : "raspberry"}, 
             {"type" : "raspberry", "label" : "blueberry"}]

var simulation = d3.forceSimulation(nodes)
  .force("charge", d3.forceManyBody().strength(5))
  .force("collide", d3.forceCollide(10).iterations(2))
  .force("x", d3.forceX())
  .force("y", d3.forceY())
  .alphaTarget(1)
  .on("tick", ticked)

function dragsubject() {
  return simulation.find(d3.event.x, d3.event.y);
}

var g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")"),
    node = g.append("g").attr("stroke", "#fff").attr("stroke-width", 1.5).selectAll(".node");

restart();

function restart() { 
  // apply general update pattern to nodes
  node = node.data(nodes);
  node.exit().remove();

  node = node.enter().append("g").merge(node)
    .append("circle").attr("r",  8).attr("class", "blueberry")
    .call(d3.drag()
      .subject(dragsubject)
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));


  // update and restart the simulation.
  simulation.nodes(nodes);
  simulation.alpha(1).restart();
}

function ticked() {
  node.attr("cx", function(d) {return d.x;})
      .attr("cy", function(d) {return d.y;})
}