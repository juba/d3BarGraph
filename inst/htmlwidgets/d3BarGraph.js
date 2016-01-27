HTMLWidgets.widget({

  name: 'd3BarGraph',

  type: 'output',

  initialize: function(el, width, height) {
     var instance= d3.select(el).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      return instance;

  },

  renderValue: function(el, x, instance) {

    el.innerText = x.message;

  },

  resize: function(el, width, height, instance) {

  }

});
