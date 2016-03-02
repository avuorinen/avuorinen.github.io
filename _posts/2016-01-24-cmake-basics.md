---
layout:     default
title:      Cmake Basics
author:     Atte Vuorinen
date:       2016-03-01 11:21:29
summary:    This is basic post about Cmake and it's usage.
categories: cmake
header: /img/tutorial.jpg
draft: true
---

# Basics

CMake is cross-platform make tool that generates
project files for target develop environment.

CMake uses *CMakeLists.txt* files for the project files.

## Folder Structure

Example folder structure:

<pre>
MyProject
|-- CMakeLists.txt
|-- include
    |-- MyFile1.h
    |-- MyFile2.h
|-- src
    |-- MyFile1.c
    |-- MyFile2.c
    |-- Main.c
|-- MyLibrary
    |-- CMakeLists.txt
    |-- include
        |-- MyLibrary.h
    |-- src
        |-- MyLibrary.c
</pre>

# Running CMake

For first timers I suggest to use *cmake-gui* so you can easily see
what is happening and you can easily configure your CMake project.
Other option is use CMake's command line tool.

Either ways I won't cover more about running CMake,
you need to do some testing to figure it out yourself.


<!--break-->


# Syntax

Basic syntax elements.

| # | Comment
| ${*VAR*} | Accessing variable
| COMMAND(*VAR*) | Using command

## Setting Project

Project command allows user set project name and project languages.
Setting project languages is optional, but it makes sure it uses those languages.

Example Language options are *C*, *CXX*, *FORTRAN* and *NONE*.

<small>
  <code>
  <a href="https://cmake.org/cmake/help/v3.0/command/project.html">
    project(&lt;PROJECT-NAME&gt; [LANGUAGES...])
  </a>
  </code>
</small>

{% highlight tcl %}

# Optional, but helps with certain things.
# Sets minimum Cmake version for the project.
cmake_minimum_required(VERSION 2.8)

# Sets name of the project and the language,
# and <PROJECT_SOURCE_DIR>, <PROJECT_BINARY_DIR>.
# "PROJECT" can be replaced with "MY_PROJECT"
# <MY_PROJECT_SOURCE_DIR>
project(MYPROJECT C)

{% endhighlight %}

## Variables

<small>
  <code>
  <a href="https://cmake.org/cmake/help/v3.0/command/set.html">
    set(&lt;variable&gt; &lt;value&gt; ...)
  </a>
  </code>
</small>

{% highlight tcl %}
# Simple CMake variable.
set(Hello "World!")
# Prints "World!".
message(${Hello})

# Simple CMake list.
set(List a b c)
# Prints "a", "b" and "c".
message(${List})

{% endhighlight %}

## Files

<small>
  <code>
    <a href="https://cmake.org/cmake/help/v3.0/command/file.html">
      file(GLOB &lt;variable&gt; [files...])
    </a>
  </code>
</small>

### Manual Way

Setting source files manually is generally safer option than using automagic way,
this is because you can manually select source files.

{% highlight tcl %}
file(GLOB MYPROJECT_SRC
  ${MYPROJECT_SOURCE_DIR}/src/MyFile1.c
  ${MYPROJECT_SOURCE_DIR}/include/MyFile1.h
  ${MYPROJECT_SOURCE_DIR}/src/MyFile2.c
  ${MYPROJECT_SOURCE_DIR}/include/MyFile2.h
)
{% endhighlight %}

### Automagic Way

Setting source files automagically is the fastest way to use your source files,
this is because you don't need to add every file manually.

{% highlight tcl %}
# Find .c and .h files from <MYPROJECT_SOURCE_DIR>
# And set them into <MY_PROJECT_SRC> variable.
# Note: This doesn't find files in the nested directories.
file(GLOB MYPROJECT_SRC
  ${MYPROJECT_SOURCE_DIR}/src/*.c
  ${MYPROJECT_SOURCE_DIR}/include/*.h
)
{% endhighlight %}

## Application & Library

<small>
  <code>
  <a href="https://cmake.org/cmake/help/v3.0/command/add_executable.html">
    add_executable(&lt;name&gt; [sources...])
  </a> <br>
  <a href="https://cmake.org/cmake/help/v3.0/command/add_library.html">
    add_library(&lt;name&gt; [STATIC|SHARED|MODULE] [sources...])
  </a>
  </code>
</small>

{% highlight tcl %}
add_executable(MyExec ${MYPROJECT_SRC})

add_library(MyStaticLib STATIC ${MYLIBRARY_SRC}) # .lib, .a
add_library(MySharedLib SHARED ${MYLIBRARY_SRC}) # .dll, .so
{% endhighlight %}

## Including Directories
Allows you add header files from directories.

<small>
  <code>
  <a href="https://cmake.org/cmake/help/v3.0/command/target_include_directories.html">
    target_include_directories(&lt;target&gt; &lt;INTERFACE|PUBLIC|PRIVATE&gt; [items...])
  </a>
  </code>
</small>

{% highlight tcl %}
target_include_directories(myExec PUBLIC
  ${MYPROJECT_SOURCE_DIR}/include
  ${MYPROJECT_SOURCE_DIR}/MyLibrary/include
)
{% endhighlight%}

## Linking Libraries

When linking using *dynamic libraries*, linking order matters like normally.

<small>
  <code>
  <a href="https://cmake.org/cmake/help/v3.0/command/target_link_libraries.html">
  target_link_libraries(&lt;target&gt; <PRIVATE|PUBLIC|INTERFACE> &lt;lib&gt; ...)
  </a>
  </code>
</small>

{% highlight tcl %}
target_link_libraries(MyExec PUBLIC MyStaticLib)
{% endhighlight %}

## Defines

<small>
  <code>
  <a href="https://cmake.org/cmake/help/v3.0/command/target_compile_definitions.html">
    target_compile_definitions(&lt;target&gt; <INTERFACE|PUBLIC|PRIVATE> [items...])
  </a>
  </code>
</small>

{% highlight tcl %}
# This sets USE_MYLIBRARY define value to true.
target_compile_definitions(MyExec PRIVATE USE_MYLIBRARY=1)
{% endhighlight%}

## Subdirectory

Add subdirectory allows you to use another CMakeLists.txt file within nested directories.
This is the common way to use third party libraries.

<small>
  <code>
    <a href="https://cmake.org/cmake/help/v3.0/command/add_subdirectory.html">
    add_subdirectory(source_dir)
    </a>
  </code>
</small>

{% highlight tcl %}
add_subdirectory(${MYPROJECT_SOURCE_DIR}/MyLibrary)
{% endhighlight %}
