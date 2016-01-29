#' D3BarGraph from R
#'
#' Making a bar graph with D3 and R
#'
#'
#' @param barData a numerical list of values as a dataframe from R. Used for bar height
#' @param height numeric height for the graph's height in pixels.
#' @param width numeric width for the network graph's width in pixels.
#' @return hopefully a graph...and not just a list in the console
#' @import htmlwidgets
#'
#' @export
d3BarGraph <- function(barData, width = NULL, height = NULL) {
  if(!is.data.frame(barData)){
    barData<- as.data.frame(barData)
    barData
  }
  #return(barData)

  # forward options using params list
  options = list(height=height, width=width)

  params = list(data=barData, options=options)



  # create widget
  htmlwidgets::createWidget(
    name = 'd3BarGraph',
    x=params,
    width = width,
    height = height,
    htmlwidgets::sizingPolicy(padding = 10, browser.fill = TRUE),
    package = 'd3BarGraph'
  )
}

#' Shiny bindings for d3BarGraph
#'
#' Output and render functions for using d3BarGraph within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a d3BarGraph
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name d3BarGraph-shiny
#'
#' @export
d3BarGraphOutput <- function(outputId, width = '100%', height = '400px'){
  shinyWidgetOutput(outputId, 'd3BarGraph', width, height, package = 'd3BarGraph')
}

#' @rdname d3BarGraph-shiny
#' @export
renderD3BarGraph <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  shinyRenderWidget(expr, d3BarGraphOutput, env, quoted = TRUE)
}
