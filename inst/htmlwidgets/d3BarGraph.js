function barD3() {

        //var data = HTMLWidgets.dataframeToD3(params.data); //get data from htmlwidgets
        //var data = [8,16,10,18,19,4,12,18,12,11,19,11,15,13,5];
        //var data = data;

        //This is where Rob Moore says to initialize variables you want to make visible to the calling function
        // In this case: data, width, height, svg
        // xScale and yScale are probably not needed here
        // barPadding and fillColor will be set to user defined values later...hardcoded for now

        var data =[]; //Following juba's example on GitHub
        var width = width || 600;  //default--value taken from htmlwidgets arguement, else 600
        var height = height || 600;  //default --value taken from htmlwidgets argueemnt, else 600
        var svg, xScale, yScale;
        var barPadding = 1;
        var fillColor = 'steelblue';




    function chart(selection){
      selection.each(function (data){
        var root = svg.append("g")
            .attr("class", "root")
            .style("fill", "#FFF");
        var barSpacing = width/data.length;
        var barWidth  = barSpacing - barPadding;
        var maxValue = d3.max(data[0]);
        //var minValue = d3.min(data[0]);
        //var heightScale = height/maxValue;
        var xScale = d3.scale.ordinal()
  						.domain(d3.range(data.length))
  						.rangeRoundBands([0, width], 0.05);

  		  var yScale = d3.scale.linear()
  						.domain([0, maxValue])
  						.range([height,0]);

        d3.select(this).append('svg')
          .attr('height', height)
          .attr('width', width)
          .selectAll('rect')
          .data(data)
            .enter()
          .append('rect')
          .attr("x", function(d, i) {return xScale(i);})
			    .attr("y", function(d) {return height - yScale(d);})
			    .attr("width", barWidth)
			    .attr("height", function(d) {return yScale(d);})
			    .style('fill', fillColor);

      }); // with function(data) and selection.each

    }//with chart

    function resize_chart() {
      xScale.range([0, width]);
      yScale.range([height, 0]);
      svg.select(".root").attr('height', height).attr('width', width);


    }

          // resize
      chart.resize = function() {
          resize_chart(); //this lets us use barD3().chart.resize() later on in the resize function in HTMLWidgets
          // need to ensure resize_chart() is a valid function
       };
      chart.width = function(value) {
      	  if (!arguments.length) return width;//if nothing is passed to the function, return the default width
      	  // and chart object
        	width = value;
          return chart;
    	};

    	chart.height = function(value) {
        	if (!arguments.length) return height;
        	height = value;
        	return chart;
    	};
    	chart.data = function(value) {
        if (!arguments.length) return data;
        data = value;
        return chart;
    };
    	chart.svg = function(value) {
          if (!arguments.length) return svg;
          svg = value;
          return chart;
    };
 return chart;
}//goes with the the opening barD3(){ bracket








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
    var data = HTMLWidgets.dataframeToD3(params.data);
   //var data = [8,16,10,18,19,4,12,18,12,11,19,11,15,13,5];

    return barD3().width(width).height(height).svg(svg).data(data); //passing the svg obj & options to the barD3 function.

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
   //var data = [8,16,10,18,19,4,12,18,12,11,19,11,15,13,5];
   // var data = HTMLWidgets.dataframeToD3(params.data);
    var svg =  d3.select(el).select("svg");

   instance=instance.svg(svg).data(data);



   d3.select(el)
    .call(instance);

   //Time for the barD3 function
   return barD3().width(width).height(height).svg(svg);
  }



});
