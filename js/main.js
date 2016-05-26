function onLoad() {

  // Calculate once.
  var ratio = getEmPixels(document.getElementById("header"))/getEmPixels() * 240; // 240 -> 15em = 16px * 15
  var shrink = ratio/6, //50
  shrinker = ratio/2.5, //100
  shrinkest = ratio/1.5; //160

  onLoad.shrinkLevel = 0;

  window.addEventListener("scroll", function(event) {

    var header = document.getElementById("header");
    var distanceY = window.pageYOffset || document.documentElement.scrollTop;

    function addClass(className) {
      header.className += " " + className;
    }

    function removeClass(className) {
      function escapeRegExp(stringToGoIntoTheRegex) {
          return stringToGoIntoTheRegex.replace(/(?:^|\s)\\^$(?!\S)/g, '\\$&');
      }

      var regex = new RegExp(escapeRegExp(className));

      header.className = header.className.replace(regex , '' );
    }

    if(distanceY > shrinkest ) {
      if(onLoad.shrinkLevel == 2) {
        onLoad.shrinkLevel++;
        addClass("smallest");
      }
    } else if(onLoad.shrinkLevel == 3) {
      onLoad.shrinkLevel--;
      removeClass("smallest");
    }

    if (distanceY > shrinker) {
      if(onLoad.shrinkLevel == 1) {
        onLoad.shrinkLevel++;
        addClass("smaller");
      }
    } else if(onLoad.shrinkLevel == 2) {
      onLoad.shrinkLevel--;
      removeClass("smaller");
    }

    if (distanceY > shrink) {
      if(onLoad.shrinkLevel == 0) {
        onLoad.shrinkLevel++;
        addClass("small");
      }
    } else if(onLoad.shrinkLevel == 1) {
      onLoad.shrinkLevel--;
      removeClass("small");
    }

  });
}
window.onload = onLoad();
