function rocPointPlot() {

  // margin around confusion matrix
  var margin = {top:10, right:10, bottom:30, left:30},
      width = 200;
      height = 200;

  var x = d3.scaleLinear().domain([0, 1])
    .range([0, width]);
  var y = d3.scaleLinear().domain([0, 1])
    .range([height, 0])
  var xAxis = d3.axisBottom(x);
  var yAxis = d3.axisLeft(y);

  function plot(selection) {
    selection.each(function(data) {
      var localData = data.state
      var svg = d3.select(this).selectAll("svg > g")
      if (svg.empty()) {
        svg = d3.select(this).append("svg")
          .attr("viewBox", 0 + " " + 0 + " " + (width + margin.left + margin.right) + " " + (height + margin.bottom + margin.top))
          .attr("preserveAspectRatio", "xMidYMid meet")
          .append("g")  // this group exists purely to respect the margins
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // add the ROC axes
        svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);
        svg.append("g")
          .call(yAxis);
      }

      var tp = 0;
      var fp = 0;
      var tn = 0;
      var fn = 0;

      for (var i = 0; i < localData.length; i++) {
        if (localData[i].type == 1) {
          localData[i].label == 1 ? tp++ : fn++;
        } else {
          localData[i].label == 1 ? fp++ : tn++;
        }
      }

      var pointData = [{"fpr" : fp / (tn + fp), "tpr": tp / (fn + tp)}]

      var t = d3.transition()
        .duration(200);

      var points = svg.selectAll(".point").data(pointData);

      points.exit()
        .remove()

      points.transition(t)
        .attr("cx", function(d) { return x(d.fpr); })
        .attr("cy", function(d) { return y(d.tpr); });

      points.enter().append("circle")
        .attr("class", "point")
        .attr("r", 3)
        .attr("fill", "black")
        .attr("cx", function(d) { return x(d.fpr); })
        .attr("cy", function(d) { return y(d.tpr); })
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

  return plot;
}
