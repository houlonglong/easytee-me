import cairo
import rsvg
img = cairo.ImageSurface(cairo.FORMAT_ARGB32, 202,270)
ctx = cairo.Context(img)
## handle = rsvg.Handle(<svg filename>)
# or, for in memory SVG data:
handle= rsvg.Handle(None, str(<svg data>))
handle.render_cairo(ctx)
img.write_to_png("svg.png")