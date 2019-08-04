async function init() {

var width = 400, height = 400;
var xScale = d3.scaleLog().domain([10,150]).range([0,width]);
var yScale = d3.scaleLog().domain([10,150]).range([height,0]);

var svg = d3.select("svg"),
            width = 1050,
            height = 450;
var g = svg.append("g")
            .attr("transform", "translate(" + 450 + "," + 150 + ")");


d3.csv("https://flunky.github.io/cars2017.csv")
  .then(function(data){
data.forEach(function(d) {
d.AverageCityMPG = +d.AverageCityMPG;
d.AverageHighwayMPG = +d.AverageHighwayMPG;
d.EngineCylinders = +d.EngineCylinders;
d.make = d.make;
d.fuel = d.fuel;
});


g.selectAll("circle")
			   .data(data)
			   .enter()
			   .append("circle")
			   .attr("cx", function(d) {
			   		return xScale(d.AverageCityMPG);
			   })
			   .attr("cy", function(d) {
			   		return yScale(d.AverageHighwayMPG);
			   })
			   .attr("r", function(d) {
			   		return (2+ d.EngineCylinders);
                           });
        
        g.append("g")
         .attr("transform", "translate(" + 50 + "," + 50 + ")")
         .call(d3.axisLeft(yScale).tickValues([10, 20, 50, 100]).tickFormat(d3.format("~s")));
 g.append("g")
         .attr("transform", "translate(" + 50 + "," + 250 + ")")
         .call(d3.axisBottom(xScale).tickValues([10, 20, 50, 100]).tickFormat(d3.format("~s")));

});
	
}
