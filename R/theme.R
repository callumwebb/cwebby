
#' Custom website plot theme
#'
#' Uses the same gray in the sidebar for panel background, and a slightly darker gray than the page body for text.
#'
#' @param base_size base text size
#' @param base_family base text family
#' @param vertical_y_title boolean - do you want the y axis title to be rotated vertically?
#'
#' @return A modified theme object
#' @export
theme_cwebby <- function(base_size = 12, base_family = "", vertical_y_title = FALSE) {
  half_line <- base_size / 2
  theme_grey() %+replace%
    theme(text = element_text(family = base_family, face = "plain", colour = "#555555", size = base_size, hjust = 0.5, vjust = 0.5, angle = 0, lineheight = 0.9, margin = rep(unit(0, "pt"), 4), debug = FALSE),
          line = element_line(colour = "gray20", size = 0.5, linetype = 1, lineend = "butt"),
          axis.title.y = element_text(angle = ifelse(vertical_y_title, 90, 0), margin = margin(0, base_size, 0, 0)),
          panel.background = element_rect(fill = "#f4f4f4", colour = NA))
}


