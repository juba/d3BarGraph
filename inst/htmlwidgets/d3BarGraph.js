function bard3() {

var width = 600;  //default
var height = 600;  //default

  //  var barPadding = 1;

    var xScale = d3.scale.ordinal()
						.domain(d3.range(df.length))
						.rangeRoundBands([0, width], 0.05); // <--change the w to width, set from el.offsetWidth

		var yScale = d3.scale.linear()
						.domain([0, d3.max(df[0])])
						.range([0, height]); //changed h to height, set from el.offsetHeight




    svg.selectAll("rect")
			   .data(df)
			   .enter()
			   .append("rect")
			   .attr("x", function(d, i) {
			   		return xScale(i);
			   })
			   .attr("y", function(d) {
			   		return h - yScale(d);
			   })
			   .attr("width", xScale.rangeBand())
			   .attr("height", function(d) {
			   		return yScale(d);
			   })
			   .attr("fill", function(d) {
					return "rgb(0, 0, " + (d * 10) + ")";
			   });
					svg.selectAll("text")
			   .data(dataset)
			   .enter()
			   .append("text")
			   .text(function(d) {
			   		return d;
			   })
			   .attr("text-anchor", "middle")
			   .attr("x", function(d, i) {
			   		return xScale(i) + xScale.rangeBand() / 2;
			   })
			   .attr("y", function(d) {
			   		return h - yScale(d) + 14;
			   })
			   .attr("font-family", "sans-serif")
			   .attr("font-size", "11px")
			   .attr("fill", "white");



			   return svg;









}//goes with the the opening bard3(){ bracket








HTMLWidgets.widget({

  name: 'd3BarGraph',

  type: 'output',

  //renderOnNullValue: true,

  initialize: function(el, width, height) {

    var svg =  d3.select(el).append("svg");
    svg
    .attr("width", width)
    .attr("height", height);

    //create barD3 instance

    return bard3().width(width).height(height).svg(svg);

  },
    resize: function(el, width, height, instance) {

    //var svg = instance.svg;
    var svg = d3.select(el).select("svg");
    svg
    .attr('width', width)
    .attr('height', height);

    instance.width(width).height(height).svg(svg).resize();
  },

  renderValue: function(el, params, instance) {
   // instance.lastValue = params;

   // var df = HTMLWidgets.dataframeToD3(params.data);

   instance=instance.svg(svg);

   var df = [8,16,10,18,19,4,12,18,12,11,19,11,15,13,5];

   d3.select(el)
    .call(instance);

   //Time for the bard3 function
   return bard3().width(width).height(height).svg(svg);
  }



});
