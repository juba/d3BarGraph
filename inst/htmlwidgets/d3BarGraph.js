HTMLWidgets.widget({

  name: 'd3BarGraph',

  type: 'output',

  renderOnNullValue: true,

  initialize: function(el, width, height) {

    var instance =  d3.select(el).append("svg")
                      .attr("width", width)
                      .attr("height", height);

    return instance;

  },

  renderValue: function(el, params, instance) {
    instance.lastValue = params;

    var df = HTMLWidgets.dataframeToD3(params.data);
    //var margin = {top: 20, right: 10, bottom: 20, left: 10}
    var svg = instance.svg;
    var width = el.offsetWidth;
    var height = el.offsetHeight;
    svg.attr("width", width)
      .attr("height", height);
    var barPadding = 1;

		svg.selectAll("rect")
			 .data(df)
			 .enter()
			 .append("rect")
			 .attr("x", function(d, i) {
			   		return i * (width / df.length);
			   })
			 .attr("y", function(d) {
			   		return height - (d * 4);
			   })
			 .attr("width", width / df.length - barPadding)
			 .attr("height", function(d) {
			   		return d * 4;
			   })
			 .attr("fill", function(d) {
					return "rgb(0, 0, " + (d * 10) + ")";
			   });

    svg.selectAll("text")
			   .data(df)
			   .enter()
			   .append("text")
			   .text(function(d) {
			   		return d;
			   })
			   .attr("text-anchor", "middle")
			   .attr("x", function(d, i) {
			   		return i * (w / df.length) + (w / df.length - barPadding) / 2;
			   })
			   .attr("y", function(d) {
			   		return h - (d * 4) + 14;
			   })
			   .attr("font-family", "sans-serif")
			   .attr("font-size", "11px")
			   .attr("fill", "white");


  },

  resize: function(el, width, height, instance) {
    // Re-render the previous value, if any
    if (instance.lastValue) {
      this.renderValue(el, instance.lastValue, instance);
    }
  }

});
