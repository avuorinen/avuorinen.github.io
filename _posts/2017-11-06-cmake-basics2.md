---
layout:     default
title:      CMake Basics II
author:     Atte Vuorinen
date:       2017-11-06 15:00:00
summary:    More CMake commands
categories: cmake
header: /img/tutorial2.jpg
draft: true
---


# Variables

## Files Recursion

<small>
  <code>
    <a href="https://cmake.org/cmake/help/v3.0/command/file.html">
      file(GLOB_RECURSE variable [files...])
    </a>
  </code>
</small>

{% highlight cmake %}
# Only include directory
file(GLOB INCLUDES ${PROJECT_SOURCE_DIR}/include/*.h)
# All directories inside src
file(GLOB_RECURSE SRC ${PROJECT_SOURCE_DIR}/src/*)
{% endhighlight %}

## Set Cache

Cached variables will be shown in CMake-GUI.

| Type     | Info                                   |
| -------- | -------------------------------------- |
| FILEPATH | File dialog                            |
| PATH     | Directory dialog                       |
| STRING   | String                                 |
| BOOL     | Checkbox                               |
| INTERNAL | Hidden, can be used in sub directories |

<small>
  <code>
  <a href="https://cmake.org/cmake/help/v3.0/command/set.html">
    set(&lt;variable&gt; &lt;value&gt; ... [CACHE &lt;TYPE&gt; &lt;DOC&gt;] | [PARENT_SCOPE])
  </a>
  </code>
</small>


<!--break-->

## Unset

Unsets CMake variable.

<small>
  <code>
  <a href="https://cmake.org/cmake/help/v3.0/command/unset.html">
    unset(&lt;variable&gt; [CACHE | PARENT_SCOPE])
  </a>
  </code>
</small>


## Env
CMake can access environment variables by *$ENV{&lt;name&gt;}*.

## Set
Sets environment variable.

<small>
  <code>
  <a href="https://cmake.org/cmake/help/v3.0/command/set.html">
    set(ENV{&lt;variable&gt;} &lt;value&gt;)
  </a>
  </code>
</small>


### Env
Unsets environment variable.

<small>
  <code>
  <a href="https://cmake.org/cmake/help/v3.0/command/unset.html">
    unset(ENV{&lt;variable&gt;})
  </a>
  </code>
</small>

{% highlight cmake %}
# CMake-GUI Path,
# uses PYTHON_PATH environment variable as default value
set(MY_PYTHON $ENV{PYTHON_PATH} CACHE PATH "Path to python.")

# Hidden List value, can edited in subdirectories
set(MY_SHARED_LIST "" CACHE INTERNAL "Hidden value")

# Unsets value
unset(MY_SHARED_LIST CACHE)
{% endhighlight %}


## Dropdown
Custom dropdown menu in CMake-GUI.

<small>
  <code>
  <a href="https://cmake.org/cmake/help/v3.0/manual/cmake-properties.7.html">
    Properties
  </a> <br>
  <a href="https://cmake.org/cmake/help/v3.0/command/set_property.html">
    set_property(&lt;TYPE&gt; [targets...] PROPERTY &lt;name&gt; [values...])
  </a>
  </code>
</small>

{% highlight cmake %}
# List of valid values
set(VALUES "First;Second;Last;")

set(MY_VALUE "DEFAULT" CACHE STRING "Dropdown menu")

# Sets valid values
set_property(CACHE MY_VALUE PROPERTY STRINGS ${VALUES})
{% endhighlight %}


# Conditions
CMake supports conditions like most of programming languages.

| [Expressions](https://cmake.org/cmake/help/v3.0/command/if.html) |
| ----------------------------------------- |
| &lt;variable&gt;                          |
| NOT &lt;expression&gt;                    |
| &lt;expr1&gt; AND &lt;expr2&gt;           |
| &lt;expr1&gt; OR &lt;expr2&gt;            |
| TARGET &lt;target-name&gt;                |
| EXISTS &lt;file&gt;                       |
| EXISTS &lt;directory&gt;                  |

<small>
  <code>
  <a href="https://cmake.org/cmake/help/v3.0/command/if.html">
    if(expression)
  </a> <br>
  <a href="https://cmake.org/cmake/help/v3.0/command/if.html">
    endif()
  </a> <br>
  <a href="https://cmake.org/cmake/help/v3.0/command/elseif.html">
    elseif(expression)
  </a> <br>
  <a href="https://cmake.org/cmake/help/v3.0/command/else.html">
    else()
  </a>
  </code>
</small>

{% highlight cmake %}
# CMake-GUI toggle
set(MY_BUILD_EXAMPLE TRUE CACHE BOOL "Build Example")

# File src/main.cpp exists and MY_BUILD_EXAMPLE is TRUE
if(EXISTS ${PROJECT_SOURCE_DIR}/src/main.cpp AND MY_BUILD_EXAMPLE)
    add_executable(example ${SRC})
else()
    message(STATUS "Skipping example")
endif()
{% endhighlight %}


# Example
{% highlight cmake %}

cmake_minimum_required(VERSION 3.0)

project(MYPROJECT CXX)

file(GLOB_RECURSE SRC
  ${PROJECT_SOURCE_DIR}/src/*.c
  ${PROJECT_SOURCE_DIR}/src/*.cpp
  ${PROJECT_SOURCE_DIR}/include/*.h
  ${PROJECT_SOURCE_DIR}/include/*.hpp
)

#add_executable(MyExec ${SRC})
#add_library(MyLib STATIC ${SRC})

set(MY_BUILD_EXAMPLE TRUE CACHE BOOL "Build Example")

if(EXISTS ${PROJECT_SOURCE_DIR}/src/main.cpp AND MY_BUILD_EXAMPLE)
    add_executable(example ${PROJECT_SOURCE_DIR}/src/main.cpp)

    if(TARGET MyLib)
        target_link_libraries(example PUBLIC MyLib)
    endif(TARGET MyLib)

else()
    message(STATUS "Skipping example")
endif()

include_directories(${PROJECT_SOURCE_DIR}/include)

{% endhighlight %}
