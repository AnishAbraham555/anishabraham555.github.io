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

//svg.append("g").call(makeAnnotations);

var clip = svg.append("defs").append("svg:clipPath")
            .attr("id", "clip")
            .append("svg:rect")
            .attr("width", width )
            .attr("height", height )
            .attr("x", 0)
            .attr("y", 0);





//var xmap = function (d) { return parseInt(d.AverageCityMPG); }
//var ymap = function (d) { return parseInt(d.AverageHighwayMPG); }

d3.csv("https://flunky.github.io/cars2017.csv", function(error, data) {
	x.domain(d3.extent(data, function (d) { return d.AverageCityMPG; })).nice();
	y.domain(d3.extent(data, function (d) { return d.AverageHighwayMPG; })).nice();

	var scatter = svg.append("g")
					.attr("id", "scatterplot")
					.attr("clip-path", "url(#clip)");
	
	scatter.selectAll(".dot")
            .data(data)
			.enter().append("circle")
            .attr("class", "dot")
            .attr("r", 4)
            .attr("cx", function (d) { return x(d.AverageCityMPG); })
            .attr("cy", function (d) { return y(d.AverageHighwayMPG); })
            .attr("opacity", 0.5)
            .style("fill", "#4292c6");	

	// x axis
    svg.append("g")
           .attr("class", "x axis")
           .attr('id', "axis--x")
           .attr("transform", "translate(0," + height + ")")
           .call(xAxis);

    svg.append("text")
         .style("text-anchor", "end")
            .attr("x", width)
            .attr("y", height - 8)
         .text("X Label");

    // y axis
    svg.append("g")
            .attr("class", "y axis")
            .attr('id', "axis--y")
            .call(yAxis);

    svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "1em")
            .style("text-anchor", "end")
            .text("Y Label");
	
	svg.append("g")
            .attr("class", "brush")
            .call(brush);
	
	var brush = d3.brush().extent([[0, 0], [width, height]]).on("end", brushended),
            idleTimeout,
            idleDelay = 350;
	
	function brushended() {
            var s = d3.event.selection;
            if (!s) {
                if (!idleTimeout) return idleTimeout = setTimeout(idled, idleDelay);
                x.domain(d3.extent(data, function (d) { return d.AverageHighwayMPG; })).nice();
                y.domain(d3.extent(data, function (d) { return d.AverageCityMPG; })).nice();
            } else {
                x.domain([s[0][0], s[1][0]].map(x.invert, x));
                y.domain([s[1][1], s[0][1]].map(y.invert, y));
                scatter.select(".brush").call(brush.move, null);
            }
            zoom();
        }
	function idled() {
            idleTimeout = null;
	}
	function zoom() {
            var t = scatter.transition().duration(700);
            svg.select("#axis--x").transition(t).call(xAxis);
            svg.select("#axis--y").transition(t).call(yAxis);
            scatter.selectAll("circle").transition(t)
            .attr("cx", function (d) { return x(d.AverageHighwayMPG); })
            .attr("cy", function (d) { return y(d.AverageCityMPG); });
	}
  
});
