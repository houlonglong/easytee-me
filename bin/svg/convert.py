import sys
import cairo
import rsvg
local_svg = sys.argv[1]
local_png = sys.argv[2]

img = cairo.ImageSurface(cairo.FORMAT_ARGB32, 500,500)
ctx = cairo.Context(img)
handle = rsvg.Handle(local_svg)
# or, for in memory SVG data:
#handle= rsvg.Handle(None, str(<svg data>))
handle.render_cairo(ctx)
img.write_to_png(local_png)