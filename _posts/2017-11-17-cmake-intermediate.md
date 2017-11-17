---
layout:     post
title:      CMake Intermediate
author:     Atte Vuorinen
date:       2017-11-17 10:00:00
summary:    More CMake commands
categories: cmake
header: /img/tutorial3.jpg
draft: true
---

# Building using CMake Command-Line

CMake also supports building projects by using *cmake --build* command.
This also works with Visual Studio projects and can handy.

<small>
    <code>
        <a href="https://cmake.org/cmake/help/v3.2/manual/cmake.1.html">
            cmake --build &lt;directory&gt; [--target &lt;target&gt;] [-- NATIVE OPTIONS]
        </a>
    </code>
</small>

# Include

Includes a file or a module.
Including a CMake file will execute all included file content.

<small>
  <code>
  <a href="https://cmake.org/cmake/help/v3.0/command/include.html">
    include(&lt;file|module&gt; [OPTIONAL])
  </a>
  </code>
</small>

{% highlight cmake %}

include(${PROJECT_SOURCE_DIR}/include.cmake)

{% endhighlight %}

# Macros & Functions

Macros and Functions are same expect macros doesn't have scope and functions have.
This means that functions cannot access variables outside of *function* and *endfunction*.


<!--break-->


## Macros

<small>
  <code>
  <a href="https://cmake.org/cmake/help/v3.0/command/macro.html">
    macro(&lt;name&gt; [args...]) <br>
    endmacro(&lt;name&gt;)
  </a>
  </code>
</small>

{% highlight cmake %}
macro(Print msg)
    message(STATUS "${info}: ${msg}")
endmacro(MyMacro)

set(info "MyProject")
Print("Hello, World!")
{% endhighlight %}

## Functions

<small>
  <code>
  <a href="https://cmake.org/cmake/help/v3.0/command/function.html">
    function(&lt;name&gt; [args...]) <br>
    endfunction(&lt;name&gt;)
  </a>
  </code>
</small>

{% highlight cmake %}
function(Print msg info)
    message(STATUS "${info}: ${msg}")
endfunction(MyMacro)

Print("Hello, World!" "MyProject")
{% endhighlight %}
