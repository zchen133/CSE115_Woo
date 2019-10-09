# Template Makefile for CMPE105-w19
# You may use and submit this makefile.

# There are some lines below you _will_ need to change. Below that, there are
# lines that you do not _need_ to change, but may do so if you wish.
# USAGE: this Makefile defines 4 targets: all (build project, yielding the executable named in
# TARGET below), clean (remove build artifacts, excluding the executable), spotless
# (remove build artifacts *including* the executable), and format (run
# clang-format on every source file in the directory).

# List the sources, separated by spaces, for your program. 'SOURCES=foo.cpp bar.cpp', for
# example. Do not include anything except sources files that you will compile!
SOURCES=dog.cpp
INCLUDES=$(wildcard *.h)

# This is the name of the executable that this makefile will produce.
TARGET=dog

# Define the compiler flags for compiling your code. You may wish to change these for
# debugging or optimization purposes. We suggest, that when you submit your code, you use
# the flags defined in _submit_CXXFLAGS below.
CXXFLAGS=-std=gnu++11 -Wall -Wextra -Wpedantic -Wshadow -g -Og

# Define the linker flags for your project. You probably don't need to add anything here.
LDFLAGS=

# These are the flags that you should submit your code with. We will make sure that your
# code is compiled with these flags when we grade it.
_submit_CXXFLAGS=-std=gnu++11 -Wall -Wextra -Wpedantic -Wshadow -g -O2

# !!
# !! You need not modify any of the lines below.
# !! We suggest you change lines below here only if you know what you're doing.
# !!

# Generate a list of object files from the source files. If SOURCES is 'foo.cpp bar.cpp', then
# OBJECTS will contain 'foo.o bar.o'. These are the files that will be produced by the compiler,
# one for each compilation unit.
OBJECTS=$(SOURCES:.cpp=.o)

# Generate a list of dependency files, similar to OBJECTS above. This time, however, the files will
# be .d files, and will contain a list of _dependencies_ for each source file. These files are in make
# syntax, and are included into the makefile below. This will let make determine the minimum set of files
# that need be recompiled when something changes. Lets say you have a source file that includes a header,
# and 3 other source files that don't. If you change the header, it would be nice if make only recompiled
# the one source file that included that header. That's the purpose of dependencies. You can specify these
# manually, like 'foo.cpp: foo.h bar.h' if you want, but the method in this makefile generates them
# automatically.
DEPS=$(SOURCES:.cpp=.d)

# We're using clang as our C++ compiler.
CXX=clang++

# provide a default target, with the standard name 'all'.
all: $(TARGET)

clean:
	-rm $(DEPS) $(OBJECTS)

spotless: clean
	-rm $(TARGET)

# This will run clang-format on all the source files and *all* .h files in the directory. 
# It will use .clang-format for formatting rules. Please get the most recent
# .clang-format file, and feel free to add it to your directory. There's no penalty for
# having one copy of .clang-format in each assignment directory.
format:
	clang-format -i $(SOURCES) $(INCLUDES)

# the main target. The target executable depends on the object files, and this recipe describes
# how to link them into the final executable.
$(TARGET): $(OBJECTS)
	$(CXX) $(LDFLAGS) -o $@ $(OBJECTS)

# the object files depend on the source file that generates them. This recipe calls the compiler
# to build the object file. The -c flag tells the compiler not to run the linker, we reserve that
# for the end (see above target).
#
# The -MD flag auto-generates the .d file for this source file. If you're curious about the contents,
# make your program, observe the .d files that are generated, and crack one open.
%.o: %.cpp
	$(CXX) $(CXXFLAGS) -c -MD -o $@ $<

# include the dependency files we've generated (but ignore if there's an error--they may not exist yet).
-include $(DEPS)

# all and clean aren't real targets.
.PHONY: all clean format spotless
