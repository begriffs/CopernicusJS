function redraw () {
  _.each(_.keys(style), function (selector) {
    var specs = _.defaults(
      style[selector],
      { affinity: 3 * Math.PI / 4 }
    );
    $(selector).each(function () {
      var elt    = $(this),
        p              = elt.parent(),
        p_offset       = p.offset(),
        p_width        = p.width(),
        p_height       = p.height(),
        p_half_width   = p_width / 2,
        p_half_height  = p_height / 2,
        p_hypotenuse   = Math.sqrt(p_half_width*p_half_width + p_half_height*p_half_height),
        great_circle_x = p_half_width  + (p_hypotenuse * Math.cos(specs.affinity)),
        great_circle_y = p_half_height - (p_hypotenuse * Math.sin(specs.affinity)),

        new_left       = great_circle_x - elt.width()/2,
        new_top        = great_circle_y - elt.height()/2;

      //$(elt).text([Math.round(new_left), Math.round(new_top)].join(' '));

      elt.offset({
        left: p_offset.left + Math.max(0, Math.min(p_width - elt.width(),  new_left)),
        top: p_offset.top + Math.max(0, Math.min(p_height - elt.height(), new_top))
      });
    });
  });
}
