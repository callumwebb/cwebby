
// dimensions and margins
var margin = {top: 20, right:20, bottom: 30, left: 60},
     width = 500 - margin.left - margin.right,
     height = 500 - margin.top - margin.bottom

// append the svg object to the body of the page
// appends a "group" element to "svg"
// moves the "group" element to the top left margin
var svg = d3.select(".foo").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// set the range
var x = d3.scaleLinear().domain([0, 1])
  .range([0, width])
  .clamp(true);

var xROC = d3.scaleLinear().domain([0, 1])
  .range([0, width / 2]);

var yROC = d3.scaleLinear().domain([0, 1])
  .range([height - margin.bottom - margin.top, height - margin.bottom - margin.top - width / 2]);

var yROCAxis = d3.axisLeft(yROC);

// add the X axis
svg.append("g")
  .attr("transform", "translate(0," + 20 + ")")
  .call(d3.axisBottom(x));

// add the ROC axes
svg.append("g")
  .attr("transform", "translate(0," + (height - margin.bottom - margin.top) + ")")
  .call(d3.axisBottom(xROC));
svg.append("g")
 // .attr("transform", "translate(0," + 0 + ")")
  .call(yROCAxis);

// line values
var valueLine = d3.line()
  .x(function(d) {return xROC(d.fpr)})
  .y(function(d) {return yROC(d.tpr)});

// add a slider!
var slider = svg.append("g")
  .attr("class", "slider")
  .attr("transform", "translate(0," + 50 + ")");

slider.append("line")
  .attr("class", "track")
  .attr("x1", x.range()[0])
  .attr("x2", x.range()[1])
  .select(function() {return this.parentNode.appendChild(this.cloneNode(true));})
    .attr("class", "track-inset")
  .select(function() {return this.parentNode.appendChild(this.cloneNode(true));})
    .attr("class", "track-overlay")
    .call(d3.drag()
      .on("start.interrupt", function() {slider.interrupt();})
      .on("start drag", function() {slide(x.invert(d3.event.x));}))

var handle = slider.insert("circle", ".track-overlay")
    .attr("class", "handle")
    .attr("r", 8)
    .attr("cx", x(0.5));

// slider.transition()

// data initialisation function
function getData(n, p) {
  var data = []
  for (var i = 0; i < n; i++) {
    var y = d3.randomUniform(0, 1)();
    var c = d3.randomUniform(0, 1)() > 0.5 ? 1 : 0;
    var cx = x((1 - p / 2) * y + (c * p / 2));
    var tpr = -1;
    var fpr = -1;
    data.push({"y": y, "c": c, "cx" : cx, "tpr" : tpr, "fpr" : fpr});
  }
  data.sort(function(a, b) {return a.cx - b.cx;});
  return data;
}

function updateData(data, p) {
  // update predicted values based on discrimination performance
  data.map(function(x){
    x.cx = (1 - p / 2) * x.y + (x.c * p / 2);
  });
  data.sort(function(a, b) {return a.cx - b.cx;});

  // if the ordering of anything changed, we need to recalculate the roc curve coordinates
  // We'll start with a threshold of 100% and work down (initially everything predicted negative)
  tp = 0; // true positive count is initially zero
  tn = nn; // all negatives are currently marked negative
  for (var i = data.length - 1; i >= 0; i--) {
    if (data[i].c == 1) {
      tp++;
    } else {
      tn--;
    }
    data[i].tpr = tp / np;
    data[i].fpr = (nn - tn) / nn;
  }
}


function update(data, p) {
  updateData(data, p);

  var t = d3.transition()
    .duration(75);

  // JOIN new data with old elements
  var dots = svg.selectAll(".dot")
    .data(data, function(d) {return d.y});
    // .data(data, function(d) {return x(d.x);});

  // EXIT old elements not present in new data.
  dots.exit()
    .remove();

  // UPDATE old elements present in new data.
  dots.transition(t)
    .attr("cx", function(d) {
      return x(d.cx);});
      // return x((1 - p / 2) * d.x + (d.c * p / 2));});

  // ENTER new elements present in new data
  dots.enter().append("circle")
    .attr("class", "dot")
    .attr("r", 5)
    .attr("fill",  function(d) {return d.c == 0 ? "blue" : "red";})
    .attr("cx", function(d) {return x(0);})
    .transition(t)
    .attr("cx", function(d) {return x(d.cx);})


  // roc plot yo
  var rocLine = svg.selectAll(".rocL")
    .data([data]);

  // rocLine.exit().remove();

  rocLine.enter()
    .append("path")
    .style("shape-rendering", "crispEdges")
    .attr("d", valueLine)
    .attr("class", "rocL")
    .attr("stroke", "black")
    .attr("stroke-width", 2)
    .attr("fill", "none");

  rocLine.transition(t)
    .attr("d", valueLine);

  var rocP = svg.selectAll(".rocP")
    .data(data);

  rocP.exit().remove()

  rocP.transition(t)
    .attr("cx", function(d) {
      return xROC(d.fpr);})
    .attr("cy", function(d) {
      return yROC(d.tpr);});

  rocP.enter().append("circle")
    .attr("class", "rocP")
    .attr("r", 2)
    .attr("fill", "black")
    .attr("cx", function(d) {
      return xROC(d.fpr);})
    .attr("cy", function(d) {
      return yROC(d.tpr);});
}

// Get the data
var data = getData(20, 0.5);
var np = data.reduce(function(previous, current) {
  return previous + current.c;
}, 0);
var nn = data.length - np;

// Initial display
update(data, 0.5);

function slide(h) {
  handle.attr("cx", x(h));
  update(data, h);
}