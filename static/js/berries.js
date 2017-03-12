

var  margin = {top: 10, right: 20, bottom: 10, left: 20},
     width = 25,
     height = 25;

var svg = d3.select("figure.berryLabels").append("svg")
  .attr("viewBox", 0 + " " + 0 + " " + (width + margin.left + margin.right) + " " + (height + margin.bottom + margin.top))
  .attr("preserveAspectRatio", "xMidYMid meet")
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

var berryGroup = svg.selectAll("g")
  .data([1, 1, 0, 0]) // 1s for raspberries
  .enter().append("g")
    .attr("transform", function(d, i) {
      return ("translate(" + ((i % 2) * width) + ", " + ((1 - d) * height) + ")");
    })
  
berryGroup.append("circle") // the berry
    .attr("r", 5)
    .attr("r", 5)
    .attr("class", function(d) {return (d == 1 ? "raspberry" : "blueberry")});

berryGroup.append("circle") // the label (perimeter circle)
    .attr("r", 8)
    .attr("class", function(d, i) {return ((i % 2) == 0 ? "pos" : "neg")});

// svg.selectAll("circle")
//   .data([1, 1, 0, 0])
//   .enter().append("circle")
//   .attr("cy", function(d) {return (1 - d) * height;})
//   .attr("r", 5)
//   .attr("cx", function(d, i) {return (i % 2) * width;})
//   .attr("r", 5)
//   .attr("fill", function(d) {return (d == 1 ? "orange" : "blue")});

// var berry = svg.selectAll("circle")
//   .data([1, 1, 0, 0]);

// var berryEnter = svg.selectAll("circle").append("circle")
//   .data([1, 1, 0, 0])
//   .attr("cx", function(d, i) {return (i % 2) * 10;})
//   .attr("r", 10);


// svg.append("circle")
//   .attr("class", "raspberry")
//   .attr("fill", "red")
//   .attr("cx", width / 4)
//   .attr("cy", height / 2)    
//   .attr("r", 5)


// svg.append("circle")
//   .attr("class", "blueberry")
//   .attr("fill", "blue")
//   .attr("cx", 3 * width / 4)
//   .attr("cy", height / 2)    
//   .attr("r", 5)