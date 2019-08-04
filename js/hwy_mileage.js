const annotations = [{
  note: {
    label: "Cars with more power tend to have low mileage",
    bgPadding: 10,
    wrap: 200,
    align: "left",
    title: "Gas Eaters"
  },
  connector: {
      end: "arrow"
    },
  className: "show-bg",
  x: 780,
  y: 230,
  dy: -160,
  dx: 0,
  width: 100
}, {
 note: {
    label: "Electric cars have more mileage",
    bgPadding: 10,
    wrap: 400,
    align: "left",
    title: "Electrified"
  },
  connector: {
      end: "arrow"
    },
  className: "show-bg",
  x: 400,
  y: 0,
  dy: 0,
  dx: 80,
  width: 100                   
}                  ]
const makeAnnotations = d3.annotation()
  .editMode(false)
  .notePadding(10)
  .annotations(annotations)

var colors = d3.scaleOrdinal(d3.schemeCategory10);
var margin = {top: 20, right: 40, bottom: 100, left: 50},
    width = 1050 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
var tooltip = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0.0);
var x = d3.scaleBand().rangeRound([0, width], 0.5)
var y = d3.scaleLinear().range([height, 0]);
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
  y.domain([0, d3.max(data, function (d) {return parseFloat(d.AverageHighwayMPG); })]);
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.7em")
      .attr("dy", "-.5em")
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
      .attr("y", 400 )
      .attr("x",0)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Avg Hwy Mileage");
  svg.selectAll("bar")
      .data(data)
      .enter().append("rect")
      .style("fill", function(d,i) { return colors(i); })
      .style("opacity", 1)
      .attr("x", function(d,i) { return x(d.Make); })
      .attr("width", x.bandwidth())
      .attr("cx", function(d) { return x(d.Make); })
      .attr("y", function(d) { return y(d.AverageHighwayMPG); })
      .attr("height", function(d) { return y(0) - y(d.AverageHighwayMPG); })
      .on("mouseover", function(d) {
          tooltip.transition()
               .style("opacity", 1);
          tooltip.html("" + d.AverageHighwayMPG + "")
               .style("background", "#eee")
               .style("font-size", "12px")
               .style("left", (d3.event.pageX + 8) +"px")
               .style("top", (d3.event.pageY - 30) + "px");
      })
      .on("mouseout",function(d){
          tooltip.style("opacity",0.0); // set as transparent          
       });

});