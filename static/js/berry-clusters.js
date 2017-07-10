
function berryClusterPlot() {
  
  var  margin = {top: 15, right: 5, bottom: 5, left: 5},  // default margin
       width = 390  ,  // default width
       height = 170;  // default height

  var berrySize = 18 // default berry (outermost) diameter

  function plot(selection) {
    selection.each(function(data) {
      // console.log(data)
      // create a local copy of the data
      // var data = JSON.parse(JSON.stringify(data));

      // Select the svg element, if it exists.
      var svg = d3.select(this).selectAll("svg").data([data]);

      // Otherwise, create the skeletal chart.
      var gEnter = svg.enter().append("svg")
        .attr("viewBox", 0 + " " + 0 + " " + (width + margin.left + margin.right) + " " + (height + margin.bottom + margin.top))
        .attr("preserveAspectRatio", "xMidYMid meet")
        .append("g")  // this group exists purely to respect the margins
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      
      // for simplicity of coordinates, append a group for the nodes where (0, 0) is in the centre
      var nodeGroup = gEnter.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")"),
          node = nodeGroup.append("g").selectAll(".node").data(data); // bind nodes to our data

      // text labels 
      gEnter.append("text")
        .attr("x", width / 4)
        .attr("y", 0)
        .style("text-anchor", "middle")
        .style("alignment-baseline", "bottom")
        .text("blueberries");
      gEnter.append("text")
        .attr("x", 3 * width / 4)
        .attr("y", 0)
        .style("text-anchor", "middle")
        .text("raspberries");

      // create the cluster centroids
      clusters = [{x: (-width / 4), y: 0}, {x: (width / 4), y : 0}];

      // force functions for layout of berries
      var forceX = d3.forceX((d) => clusters[d.label == 1 ? 1 : 0].x).strength(0.04);
      var forceY = d3.forceY((d) => clusters[d.label == 1 ? 1 : 0].y).strength(0.04);

      // set up force simulation
      var simulation = d3.forceSimulation(data.state)
        .velocityDecay(0.2)
        .force("collide", d3.forceCollide(berrySize + 3).iterations(2))
        .force('x', forceX)
        .force('y', forceY)
        .alphaTarget(1)
        .on("tick", ticked)

      // simulation interaction functions
      function dragstarted(d) {
        d3.event.subject.fx = d3.event.subject.x;
        d3.event.subject.fy = d3.event.subject.y;
        d.label = d.label == 1 ? 0 : 1;
        // data.set(data.get())
        data.updatePlots()
        update();
      }
      function dragged(d) {
        d3.event.subject.fx = d3.event.x;
        d3.event.subject.fy = d3.event.y;
      }
      function dragended(d) {
        d3.event.subject.fx = null;
        d3.event.subject.fy = null;
      }
      function dragsubject() {
        return simulation.find(d3.event.x, d3.event.y);
      }

      // simulation tick function
      function ticked() {
        node.attr("transform", function(d) {return "translate(" + d.x + "," + d.y + ")"})
      }

      function update() {
        // apply general update pattern to nodes
        node = node.data(data.state);
        node.exit().remove();
        node = node.enter().append("g").merge(node)
          .attr("class", "node")
          .call(d3.drag()
            .subject(dragsubject)
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

        node.selectAll("circle").remove();
        node.append("circle").attr("r",  berrySize - 7).attr("class", function(d) {return d.type == 1 ? "raspberry" : "blueberry"});
        node.append("circle").attr("r",  berrySize).attr("class", function(d) {return d.label == 1 ? "pos" : "neg"});

        // update and restart the simulation
        simulation.nodes(data.state);
        simulation.alpha(1).restart();
      }

      update()
    })
  }

  plot.width = function(value) {
    if (!arguments.length) return width;
    width = value;
    return plot;
  };

  plot.height = function(value) {
    if (!arguments.length) return height;
    height = value;
    return plot;
  };

  plot.berrySize = function(value) {
    if (!arguments.length) return berrySize;
    berrySize = value;
    return plot;
  }

  return plot;
}

