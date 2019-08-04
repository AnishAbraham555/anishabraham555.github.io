const annotations = [{
  note: {
    label: "Every car has cylinders, and the engine size is generally denoted by how many cylinders a car has.",
    bgPadding: 10,
    wrap: 400,
    align: "left",
    title: "Engine Cylinders"
  },
  connector: {
      end: "arrow"
    },
  className: "show-bg",
  x: 500,
  y: 200,
  dy: 15,
  dx: 80,
  width: 300
}, {
 note: {
    label: "More cylinders means more power and hence less mileage",
    bgPadding: 10,
    wrap: 400,
    align: "left",
    title: "Power vs Mileage"
  },
  connector: {
      end: "arrow"
    },
  className: "show-bg",
  x: 500,
  y: 20,
  dy: 10,
  dx: 80,
  width: 300                   
}                  ]
const makeAnnotations = d3.annotation()
  .editMode(false)
  .notePadding(10)
  .annotations(annotations)

var colors_a = d3.scaleOrdinal(d3.schemeCategory10);
var margin = {top: 20, right: 40, bottom: 100, left: 50},
    width = 1050 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
var tooltip = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0.0);
var x = d3.scaleBand().rangeRound([0, width], 0.5)
var y = d3.scaleLinear().range([height, 0]);
//var xAxis = d3.axisBottom(x);
//var yAxis = d3.axisLeft(y);
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");
svg.call(makeAnnotations);

d3.csv("https://flunky.github.io/cars2017.csv", function(error, data) {
    console.log(data);
  x.domain(data.map(function(d) { return d.Make; }));	
  y.domain([0, d3.max(data, function (d) {return parseFloat(d.EngineCylinders); })]);
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );
  svg.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top + 80) + ")")
      .style("text-anchor", "middle")
      .text("Cars");
  svg.append("g")
      .attr("class", "y axis")
      .call(d3.axisLeft(y))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 )
      .attr("x",0)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("EngineCylinders");
  svg.selectAll("bar")
      .data(data)
    .enter().append("circle")
      .style("fill", function(d,i) { return colors_a(i); })
      .style("opacity", 1)
      .attr("cx", function(d) { return x(d.Make); })
      .attr("r", function(d) { return d.EngineCylinders; })
      .attr("cy", function(d) { return y(d.EngineCylinders); })
      .on("mouseover", function(d) {
          tooltip.transition()
               .style("opacity", 1);
          tooltip.html("" + d.EngineCylinders + "")
               .style("left", (d3.event.pageX + 5) + "px")
               .style("top", (d3.event.pageY - 28) + "px");
      });

});
