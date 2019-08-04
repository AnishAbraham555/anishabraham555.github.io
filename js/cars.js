const annotations = [{
  note: {
    label: "A cylinder is the power unit of an engine; Most cars and SUV engines have four, six, or eight cylinders. The more the cylinders  more the power.",
    bgPadding: 20,
    wrap: 300,
    align: "left",
    title: "Engine Cylinders"
  },
  connector: {
      end: "dot",   
      type: "line",  
      lineType : "vertical",
      endScale: 2
    },
  className: "show-bg",
  x: 600,
  dy: 40,
  dx: 10,
  width: 500
}]
const annotations2 = [{
  note: {
    label: "Depending on how one drives and what one's typical commute looks like, one might want to compare how a vehicle fares in city versus highway mileage. Least gas is typically used in highways whereas congested roads consume the most fuel and gives low mileage.",
    bgPadding: 20,
    wrap: 300,
    align: "left",
    title: "Highway mileage per gallon"
  },
  connector: {
      end: "dot",  
      type: "line", 
      lineType : "vertical",
      endScale:   2
    },
  className: "show-bg",
  x: 450,
  dy: 0,
  dx: 10,
  width: 500
}]
const annotations3 = [{
  note: {
    label: "Depending on how one drives and what one's typical commute looks like, one might want to compare how a vehicle fares in city versus highway mileage. Least gas is typically used in highways whereas congested roads consume the most fuel and gives low mileage.",
    bgPadding: 20,
    wrap: 300,
    align: "left",
    title: "City mileage per gallon"
  },
  connector: {
      end: "dot",
      type: "line",
      lineType : "vertical",
      endScale: 3    
    },
  className: "show-bg",
  x: 500,
  dy: 0,
  dx: 10,
  width: 500
}]
const makeAnnotations = d3.annotation()
  .editMode(false)
  .notePadding(10)
  .annotations(annotations)
const makeAnnotations2 = d3.annotation()
  .editMode(false)
  .notePadding(10)
  .annotations(annotations2)
const makeAnnotations3 = d3.annotation()
  .editMode(false)
  .notePadding(10)
  .annotations(annotations3)
var colors_a = d3.scaleOrdinal(d3.schemeCategory20);
var colors_b = d3.scaleOrdinal(d3.schemeCategory20b);
var colors_c = d3.scaleOrdinal(d3.schemeCategory20c);
var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 1000 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;
var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0.5);
var x = d3.scaleBand().rangeRound([0, width], 0.5)
var y = d3.scaleLinear().range([height, 0]);
var x2 = d3.scaleBand().rangeRound([0, width], 0.5)
var y2 = d3.scaleLinear().range([height, 0]);
var x3 = d3.scaleBand().rangeRound([0, width], 0.5)
var y3 = d3.scaleLinear().range([height, 0]);
var xAxis = d3.axisBottom(x);
var yAxis = d3.axisLeft(y);
var x2Axis = d3.axisBottom(x2);
var y2Axis = d3.axisLeft(y2);
var x3Axis = d3.axisBottom(x3);
var y3Axis = d3.axisLeft(y3);
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");
var svg2 = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");
var svg3 = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");
svg.call(makeAnnotations);
svg2.call(makeAnnotations2);
svg3.call(makeAnnotations3);
d3.csv("https://flunky.github.io/cars2017.csv", function(error, data) {
    console.log(data);
  x.domain(data.map(function(d) { return d.Make; }));	
  y.domain([0, d3.max(data, function (d) {return parseFloat(d.EngineCylinders); })]);
  x2.domain(data.map(function(d,i) { return d.Make; }));	
  y2.domain([0, d3.max(data, function (d) {return parseFloat(d.AverageHighwayMPG); })]);
  x3.domain(data.map(function(d,i) { return d.Make; }));	
  y3.domain([0, d3.max(data, function (d) {return parseFloat(d.AverageCityMPG); })]);
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("EngineCylinders");
  svg2.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );
  svg2.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("AverageHighwayMPG");
  svg3.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(x3Axis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );
  svg3.append("g")
      .attr("class", "y axis")
      .call(y3Axis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("AverageCityMPG");
  svg.selectAll("bar")
      .data(data)
    .enter().append("circle")
      .style("fill", function(d,i) { return colors_a(i); })
      .style("opacity", 0.5)
      .attr("cx", function(d) { return x(d.Make); })
      .attr("r", function(d) { return d.EngineCylinders; })
      .attr("cy", function(d) { return y(d.EngineCylinders); })
      .on("mouseover", function(d) {
          tooltip.transition()
               .style("opacity", .8);
          tooltip.html("" + d.EngineCylinders + "")
               .style("left", (d3.event.pageX + 5) + "px")
               .style("top", (d3.event.pageY - 28) + "px");
      });
  svg2.selectAll("bar")
      .data(data)
    .enter().append("rect")
      .style("fill", function(d,i) { return colors_b(i); })
      .style("opacity", 0.5)
      .attr("x", function(d,i) { return x2(d.Make); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y2(d.AverageHighwayMPG); })
      .attr("height", function(d) { return y2(0) - y2(d.AverageHighwayMPG); })
      .on("mouseover", function(d) {
          tooltip.transition()
               .style("opacity", .8);
          tooltip.html("" + d.AverageHighwayMPG + "")
               .style("left", (d3.event.pageX + 5) + "px")
               .style("top", (d3.event.pageY - 28) + "px");
      })
  svg3.selectAll("bar")
      .data(data)
    .enter().append("rect")
      .style("fill", function(d,i) { return colors_c(i); })
      .style("opacity", 0.5)
      .attr("x", function(d,i) { return x3(d.Make); })
      .attr("width", x3.bandwidth())
      .attr("y", function(d) { return y3(d.AverageCityMPG); })
      .attr("height", function(d) { return y3(0) - y3(d.AverageCityMPG); })
      .on("mouseover", function(d) {
          tooltip.transition()
               .style("opacity", .8);
          tooltip.html("" + d.AverageCityMPG + "")
               .style("left", (d3.event.pageX + 5) + "px")
               .style("top", (d3.event.pageY - 28) + "px");
      })
});