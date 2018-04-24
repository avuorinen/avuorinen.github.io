---
layout:     post
title:      CMake Intermediate II
author:     Atte Vuorinen
date:       2017-11-20 10:00:00
summary:    More CMake commands
categories: cmake
header: /img/tutorial2.jpg
draft: true
related: cmake-intermediate
---

# Separate Arguments

Separate arguments separates list values,
this can be used for string values.

Main motivation for using this command is passing
CMake variables to external process, for instance using execute_process command.

<small>
  <code>
  <a href="https://cmake.org/cmake/help/v3.0/command/separate_arguments.html">
    separate_arguments(&lt;variable&gt;)
  </a>
  </code>
</small>

{% highlight cmake %}
list(APPEND MY_LIST "A" "B" "C" "D")
# A;B;C;D;
separate_args(MY_LIST)

set(MY_COMMAND "cmake --build .")
# cmake --build .;
separate_args(MY_COMMAND)
{% endhighlight %}

# Custom

<small>
  <code>
  <a href="https://cmake.org/cmake/help/v3.0/variable/CMAKE_COMMAND.html">
    ${CMAKE_COMMAND}
  </a>
  </code>
</small>


<!--break-->


## Custom Target

<small>
  <code>
  <a href="https://cmake.org/cmake/help/v3.0/command/add_custom_target.html">
    add_custom_target(&lt;name&gt; [COMMAND commands... [ARGS...]] [WORKIGN_DIRECTORY dir] [COMMEND commend] [SOURCES sources...])
  </a>
  </code>
</small>

{% highlight cmake %}
add_custom_target()
{% endhighlight %}

## Custom Command

<small>
  <code>
  <a href="https://cmake.org/cmake/help/v3.0/command/add_custom_command.html">
    add_custom_command(&lt;target&gt; (PRE_BUILD | PRE_LINK | POST_BUILD) COMMAND commands... [ARGS...] [WORKIGN_DIRECTORY dir] [COMMEND commend])
  </a>
  </code>
</small>

{% highlight cmake %}
add_custom_command()
{% endhighlight %}


### DEPENDIES

<small>
  <code>
  <a href="https://cmake.org/cmake/help/v3.0/command/add_custom_command.html">
    add_dependencies(&lt;target&gt; [targets...]) <br>
  </a>
  <a href="https://cmake.org/cmake/help/v3.0/command/add_custom_target.html">
    add_custom_target(&lt;target&gt; [DEPENDS depens...])
  </a>
  </code>
</small>

{% highlight cmake %}
add_dependencies(MyExec MyLibrary)
{% endhighlight %}


# Process

## CMAKE COMMAND

Full path to CMake executable,
this is useful with *add_custom_command* and *execute_process*.

{% highlight cmake %}
${CMAKE_COMMAND}
{% endhighlight %}


## Execute Process

<small>
  <code>
  <a href="https://cmake.org/cmake/help/v3.0/command/execute_process.html">
    execute_process(COMMAND commands... [ARGS...] [WORKIGN_DIRECTORY dir] [RESULT_VARIABLE &lt;variable&gt;] [OUTPUT_VARIABLE &lt;variable&gt;] [ERROR_VARIABLE &lt;variable&gt;])
  </a>
  </code>
</small>

{% highlight cmake %}
execute_process()
{% endhighlight %}

## CMake Command-Line Tool Mode

Cross-Platform commands for printing, zipping (tar or zip), moving, copying and deleting files or directories.
Mostly used with *add_custom_command* and *execute_process*.

<small>
    <code>
        <a href="https://cmake.org/cmake/help/v3.2/manual/cmake.1.html#command-line-tool-mode">
            cmake -E &lt;command&gt; [ARGS...]
        </a>
    </code>
</small>

## CMake Script

<small>
    <code>
        <a href="https://cmake.org/cmake/help/v3.2/manual/cmake.1.html">
        cmake [-DARG1=VALUE1 ...] -P &lt;script&gt; [ARGS...]
        </a> <br>
        <a href="https://cmake.org/cmake/help/latest/variable/CMAKE_ARGC.html">
            CMAKE_ARGC
        </a> <strong>OR</strong>
        <a href="https://cmake.org/cmake/help/latest/variable/CMAKE_ARGV0.html#variable:CMAKE_ARGV0">
            CMAKE_ARGV0, CMAKE_ARGV1, ...
        </a>
    </code>
</small>


{% highlight cmake %}
add_custom_target(test ${CMAKE_COMMAND} -P ${CMAKE_SOURCE_DIR}/test.cmake)
{% endhighlight %}


# Example

{% highlight cmake %}

cmake_minimum_required(VERSION 2.8)

project(MYPROJECT CXX)

file(GLOB SRC
  ${PROJECT_SOURCE_DIR}/src/*.c
  ${PROJECT_SOURCE_DIR}/src/*.cpp
  ${PROJECT_SOURCE_DIR}/include/*.h
  ${PROJECT_SOURCE_DIR}/include/*.hpp
)

add_executable(MyExec ${SRC})
add_library(MyExec STATIC ${SRC})

include_directories(${PROJECT_SOURCE_DIR}/include)

{% endhighlight %}
