http://stackoverflow.com/questions/6589358/convert-svg-to-png-in-python
http://cairographics.org/pyrsvg/

on mac 

	brew install cairo
	brew install py2cairo
	
on ubuntu

	apt-get install python-dev python-setuptools
	apt-get install  python-rsvg

code:

	import cairo
	import rsvg	
	img = cairo.ImageSurface(cairo.FORMAT_ARGB32, 202,270)	
	ctx = cairo.Context(img)	
	## handle = rsvg.Handle(<svg filename>)
	# or, for in memory SVG data:
	handle= rsvg.Handle(None, str(<svg data>))	
	handle.render_cairo(ctx)	
	img.write_to_png("svg.png")
	
	