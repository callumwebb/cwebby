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


var berryModel =  {
  nViews : 2,
  updateFlag : false,
  upToDateViews : 2,
  state : [{"type" : 0, "label" : 0},
           {"type" : 0, "label" : 1},
           {"type" : 1, "label" : 1}],
  flagUpdate : function() {
    this.upToDateViews = this.upToDateViews + 1;
    if (this.upToDateViews == this.nViews) {
      this.updateFlag = false;
    }
  },
  updateViews : function() {
    this.updateFlag = true;
    this.upToDateViews = 0;
  }
}

var berryPlot = berryClusterPlot();



d3.selectAll("figure.berryClasses")
  .datum(berryModel)
  .call(berryPlot)

// var foobar = berryPlot(d3.select("figure.berryClasses").datum(berryModel), 2);
