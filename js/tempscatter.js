const annotations = [{
  note: {
    label: "Correlation between city and Highway MPG",
    bgPadding: 10,
    wrap: 200,
    align: "left",
    title: "Efficiency"
  },
  connector: {
      end: "arrow"
    },
  className: "show-bg",
  x: 780,
  y: 0,
  dy: 0,
  dx: 0,
  width: 100
}, {
 note: {
    label: "Use Mouse selection to zoom in",
    bgPadding: 10,
    wrap: 400,
    align: "left",
    title: "Zoom"
  },
  connector: {
      end: "arrow"
    },
  className: "show-bg",
  x: 780,
  y: 800,
  dy: 0,
  dx: 0,
  width: 100                   
}                  ]
const makeAnnotations = d3.annotation()
  .editMode(false)
  .notePadding(10)
  .annotations(annotations)

var color = d3.scaleOrdinal(d3.schemeCategory10);
var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 1000 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

var x = d3.scaleLinear()          
          .range([0, width])
          .nice();
var y = d3.scaleLinear()
          .range([height, 0]);

var xAxis = d3.axisBottom(x),
    yAxis = d3.axisLeft(y);


var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

svg.call(makeAnnotations);

var clip = svg.append("defs").append("svg:clipPath")
            .attr("id", "clip")
            .append("svg:rect")
            .attr("width", width )
            .attr("height", height )
            .attr("x", 0)
            .attr("y", 0);

var xmap = function (d) { return parseInt(d.AverageCityMPG); }
var ymap = function (d) { return parseInt(d.AverageHighwayMPG); }
var zmap = function (d) { return d.Make; }

d3.csv("https://flunky.github.io/cars2017.csv", function(error, data) {
  //var xExtent = d3.extent(data, function (d) { return d.AverageHighwayMPG; });
  //var yExtent = d3.extent(data, function (d) { return d.AverageCityMPG; });
  x.domain([0,d3.max(data,xmap)])
  y.domain([0,d3.max(data,ymap)])
  function brushended() {
            var selection = d3.event.selection;
            if (!selection) {
                if (!idleTimeout) return idleTimeout = setTimeout(idled, idleDelay);
                x.domain(0,d3.max(data, function (d) { return d.AverageHighwayMPG; }));
                y.domain(0,d3.max(data, function (d) { return d.AverageCityMPG; }));
            } else {
                x.domain([selection[0][0], selection[1][0]].map(x.invert, x));
                y.domain([selection[1][1], selection[0][1]].map(y.invert, y));
                svg.select(".brush").call(brush.move).on("mousedown touchstart", brushcentered);;
            }
            zoomin();
        }
  function brushcentered() {
      x.domain(0,d3.max(data, function (d) { return d.AverageHighwayMPG; }));
      y.domain(0,d3.max(data, function (d) { return d.AverageCityMPG; }));
      svg.select(".brush").call(brush.move, null);
    }

  function idled() {
            idleTimeout = null;
  }
  function zoomin() {
            var t = svg.transition().duration(650);
            svg.select("#x-axis").transition(t).call(xAxis);
            svg.select("#y-axis").transition(t).call(yAxis);
            svg.selectAll("circle").transition(t)
            .attr("cx", function (d) { return x(d.AverageHighwayMPG); })
            .attr("cy", function (d) { return y(d.AverageCityMPG); });
  }
  var brush = d3.brush().on("end", brushended),
            idleTimeout,            idleDelay = 350;
  svg.append("g")
            .attr("class", "brush")
            .call(brush).on("dblclick", brushcentered);
 
  svg.append("g")
      .attr("class", "x axis")
      .attr('id', "x-axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("x", width - 30)
      .attr("dy", "5em")
      .style("text-anchor", "end")
      .text("AverageCityMPG");

  svg.append("g")
      .attr("class", "y axis")
      .attr('id', "y-axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("AverageHighwayMPG");

  var scatter = svg.append("g")
             .attr("id", "scatterplot")
             .attr("clip-path", "url(#clip)");
  scatter.selectAll("circle")
      .data(data)
      .enter().append("circle")
      //.transition()
      //.delay(function(d,i){return(i*3)})
      //.duration(2000)
      .style("fill", function (d,i) { return color(i); })
      .style("stroke", function (d,i) { return color(i*5); })
      .style("stroke-width",2)
      .attr("r", 6)
      .attr("cx", function(d) { return x(d.AverageHighwayMPG); })
      .attr("cy", function(d) { return y(d.AverageCityMPG); })
      .on("mouseover", function(d,i) {
          d3.select(this).attr("r",10);
          tooltip.transition()
               .duration(100)
               .style("opacity", 1);
	  tooltip.html("City MPG : " + ymap(d) + " <br/> Hwy MPG : " + xmap(d) + " <br/> Make : " + zmap(d))
               .style("left", (d3.event.pageX + 10) + "px")
               .style("top", (d3.event.pageY - 30) + "px");
      })
      .on("mouseout", function(d) {
          d3.select(this).attr("r",5);
          tooltip.transition()
               .duration(400)
               .style("opacity", 0);
      });
	

});
