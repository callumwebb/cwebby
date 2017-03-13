
var  margin = {top: 20, right: 20, bottom: 20, left: 20},
     width = 300,
     height = 100;

var svg = d3.select("figure.confusionMatrix").append("svg")
  .attr("viewBox", 0 + " " + 0 + " " + (width + margin.left + margin.right) + " " + (height + margin.bottom + margin.top))
  .attr("preserveAspectRatio", "xMidYMid meet")
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


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

  // Check which cluster the node is nearest, and potentially update the label
  d.label = d.label == "pos" ? "neg" : "pos";
  restart();
}

var nodes = [{"type" : "blueberry", "label" : "neg", "id" : 1}, 
             {"type" : "blueberry", "label" : "neg", "id" : 2}, 
             {"type" : "blueberry", "label" : "neg", "id" : 3}, 
             {"type" : "blueberry", "label" : "pos", "id" : 4}, 
             {"type" : "raspberry", "label" : "pos", "id" : 5}, 
             {"type" : "raspberry", "label" : "pos", "id" : 6}, 
             {"type" : "raspberry", "label" : "pos", "id" : 7}, 
             {"type" : "raspberry", "label" : "neg", "id" : 8}],
  clusters = [{x: (-width / 4), y: 0}, {x: (width / 4), y : 0}];

var forceX = d3.forceX((d) => clusters[d.label == "pos" ? 1 : 0].x).strength(0.01);
var forceY = d3.forceY((d) => clusters[d.label == "pos" ? 1 : 0].y).strength(0.01);

var simulation = d3.forceSimulation(nodes)
  .velocityDecay(0.1)
  // .force("charge", d3.forceManyBody().strength(5))
  .force("collide", d3.forceCollide(24).iterations(2))
  .force('x', forceX)
  .force('y', forceY)
  .alphaTarget(1)
  .on("tick", ticked)

function dragsubject() {
  return simulation.find(d3.event.x, d3.event.y);
}

var g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")"),
    node = g.append("g").selectAll(".node");

restart();

function restart() { 
  // apply general update pattern to nodes
  node = node.data(nodes, function(d) {return d.id;});
  node.exit().remove();
  node = node.enter().append("g").merge(node)
    .attr("class", "node")
    .call(d3.drag()
      .subject(dragsubject)
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));

  node.selectAll("circle").remove();
  node.append("circle").attr("r",  15).attr("class", function(d) {return d.type});
  node.append("circle").attr("r",  22).attr("class", function(d) {return d.label});

  // update and restart the simulation.
  simulation.nodes(nodes);
  simulation.alpha(1).restart();
}

function ticked() {
  node.attr("transform", function(d) {return "translate(" + d.x + "," + d.y + ")"})
}



// TODO .... update berries, not just add more on drag....