---
layout:     default
title:      Cmake Basics
author:     Atte Vuorinen
date:       2017-11-06 15:00:00
summary:    This is basic post about Cmake and it's usage.
categories: cmake
header: /img/tutorial.jpg
draft: false
---

# Basics

CMake is cross-platform make tool that generates
project files for the target develop environment.

CMake uses *CMakeLists.txt* files for the project file generation.

## Folder Structure

An example folder structure:

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

For the first timers I suggest to use *cmake-gui* so you can easily see
what is happening and you can easily configure your CMake project.
Other option is use CMake's command line tool.

Either ways I won't cover more about running CMake
you need to do some testing to figure it out yourself.


<!--break-->


# Syntax

Basic syntax elements.

| # | Comment
| ${*VAR*} | Accessing variable
| COMMAND(*VAR*) | Using command

## Documentation

This part is meant to clear how <small><code><a href="https://cmake.org/cmake/help/v3.0/index.html">documentation</a></code></small> works.

| &lt;&gt; | Required
| [] | Optional
| ... |  Multiple
| A&#124;B&#124;C | Option

## Setting Project

Project command allows user to set project name and project languages.
Setting the project languages are optional, but it makes sure it uses those languages.

An example Language options are *C*, *CXX*, *CSharp*, *FORTRAN* and *NONE*.

<small>
  <code>
  <a href="https://cmake.org/cmake/help/v3.3/command/cmake_minimum_required.html">
  cmake_minimum_required(VERSION major[.minor])
  </a>
  <br>
  <a href="https://cmake.org/cmake/help/v3.0/command/project.html">
    project(&lt;PROJECT-NAME&gt; [LANGUAGES...])
  </a>
  </code>
</small>

{% highlight cmake %}

# Sets minimum Cmake version for the project.
cmake_minimum_required(VERSION 2.8)

# Sets name of the project and the language
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

{% highlight cmake %}
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
      file(GLOB variable [files...])
    </a>
  </code>
</small>

### Manual Way

Setting the source files manually is generally safer option than using automagic way
this is because you can manually select the source files which causes less surprises and duplicates.

{% highlight cmake %}
file(GLOB MYPROJECT_SRC
  ${MYPROJECT_SOURCE_DIR}/src/MyFile1.c
  ${MYPROJECT_SOURCE_DIR}/include/MyFile1.h
  ${MYPROJECT_SOURCE_DIR}/src/MyFile2.c
  ${MYPROJECT_SOURCE_DIR}/include/MyFile2.h
)
{% endhighlight %}

### Automagic Way

Setting the source files automagically is the fastest way
this is because you don't need to add every file manually.

{% highlight cmake %}
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
    add_executable(&lt;name&gt; source [sources...])
  </a> <br>
  <a href="https://cmake.org/cmake/help/v3.0/command/add_library.html">
    add_library(&lt;name&gt; [STATIC|SHARED|MODULE] source [sources...])
  </a>
  </code>
</small>

{% highlight cmake %}
add_executable(MyExec ${MYPROJECT_SRC})

add_library(MyStaticLib STATIC ${MYLIBRARY_SRC}) # .lib, .a
add_library(MySharedLib SHARED ${MYLIBRARY_SRC}) # .dll, .so
{% endhighlight %}

## Including Directories
Allows you to add header files from the directories.

<small>
  <code>
  <a href="https://cmake.org/cmake/help/v3.0/command/target_include_directories.html">
    target_include_directories(&lt;target&gt; &lt;INTERFACE|PUBLIC|PRIVATE&gt; [directories...])
  </a>
  </code>
</small>

{% highlight cmake %}
target_include_directories(myExec PUBLIC
  ${MYPROJECT_SOURCE_DIR}/include
  ${MYPROJECT_SOURCE_DIR}/MyLibrary/include
)
{% endhighlight%}

## Linking Libraries

When linking using *dynamic libraries* linking order matters like normally using complier manually.

<small>
  <code>
  <a href="https://cmake.org/cmake/help/v3.0/command/target_link_libraries.html">
  target_link_libraries(&lt;target&gt; <PRIVATE|PUBLIC|INTERFACE> [libraries...])
  </a>
  </code>
</small>

{% highlight cmake %}
target_link_libraries(MyExec PUBLIC MyStaticLib)
{% endhighlight %}

## Defines

<small>
  <code>
  <a href="https://cmake.org/cmake/help/v3.0/command/target_compile_definitions.html">
    target_compile_definitions(&lt;target&gt; <INTERFACE|PUBLIC|PRIVATE> [defines...])
  </a>
  </code>
</small>

{% highlight cmake %}
# This sets USE_MYLIBRARY define value to true.
target_compile_definitions(MyExec PRIVATE USE_MYLIBRARY=1)
{% endhighlight%}

## Subdirectory

Add subdirectory allows you to use another CMakeLists.txt file within nested directories.
This is the common way to use third party libraries.

<small>
  <code>
    <a href="https://cmake.org/cmake/help/v3.0/command/add_subdirectory.html">
    add_subdirectory(source_directory)
    </a>
  </code>
</small>

{% highlight cmake %}
add_subdirectory(${MYPROJECT_SOURCE_DIR}/MyLibrary)
{% endhighlight %}

## Tricks

Here are some neat tricks that can help,
but they too complicated to be covered in basics.

### Install

Long story short this command allows set install process for the CMake project.
In this case it's used to set output directory.

<small>
  <code>
    <a href="https://cmake.org/cmake/help/v3.0/command/install.html">
    install(TARGETS targets...  [ARCHIVE|LIBRARY|RUNTIME] DESTINATION &lt;directory&gt;)
    </a>
  </code>
</small>

{% highlight cmake %}
install(TARGETS MyExec MyStaticLib MySharedLib
  RUNTIME DESTINATION ${MYPROJECT_SOURCE_DIR}/bin
  ARCHIVE DESTINATION ${MYPROJECT_SOURCE_DIR}/bin/lib
  LIBRARY DESTINATION ${MYPROJECT_SOURCE_DIR}/bin/lib
)
{% endhighlight%}

### Visual Studio Project Folders

This one allows you to sort your projects using folders inside the visual studio.

<small>
  <code>
    <a href="https://cmake.org/cmake/help/v3.0/command/set_target_properties.html">
    set_target_properties(targets... PROPERTIES FOLDER &lt;directory&gt;)
    </a>
  </code>
</small>

{% highlight cmake %}

set_target_properties(MyExec PROPERTIES FOLDER MyProject)
set_target_properties(MyStaticLib MySharedLib PROPERTIES FOLDER MyProject/Library)

{% endhighlight %}


# Complete C Example

{% highlight cmake %}
cmake_minimum_required(VERSION 2.8)

project(MYPROJECT C)

# Contains 'MyStaticLib' and 'MySharedLib' projects.
add_subdirectory(${MYPROJECT_SOURCE_DIR}/MyLibrary)

file(GLOB MYPROJECT_SRC
  ${MYPROJECT_SOURCE_DIR}/src/*.c
  ${MYPROJECT_SOURCE_DIR}/include/*.h
)

add_executable(MyExec ${MYPROJECT_SRC})

target_link_libraries(MyExec PUBLIC MyStaticLib)
target_compile_definitions(MyExec PRIVATE USE_MYLIBRARY=1)


{% endhighlight %}

# CMake Template

[SDL2 Example Project](https://github.com/avuorinen/CMake-SDL2-Example)

{% highlight cmake %}

cmake_minimum_required(VERSION 2.8)

project(MYPROJECT CXX)

file(GLOB SRC
  ${PROJECT_SOURCE_DIR}/src/*.c
  ${PROJECT_SOURCE_DIR}/src/*.cpp
  ${PROJECT_SOURCE_DIR}/include/*.h
  ${PROJECT_SOURCE_DIR}/include/*.hpp
)

#add_executable(MyExec ${SRC})
#add_library(MyExec STATIC ${SRC})

include_directories(${PROJECT_SOURCE_DIR}/include)

{% endhighlight %}
