function onLoad() {

  onLoad.isSmaller = false;
  onLoad.isSmallest = false;

  window.addEventListener("scroll", function(event){
    var distanceY = window.pageYOffset || document.documentElement.scrollTop,
    shrinkOn = 50, //35,40
    header = document.getElementById("header");

    if(distanceY / 2 > shrinkOn ) {
      if(!onLoad.isSmallest) {
        onLoad.isSmallest = true;
        header.className += " smallest";
      }
    }
    else if(onLoad.isSmallest) {
      onLoad.isSmallest = false;
      header.className = header.className.replace( /(?:^|\s)smallest(?!\S)/g , '' )
    }

    if (distanceY > shrinkOn) {

      if(!onLoad.isSmaller) {
        onLoad.isSmaller = true;
        header.className += " smaller";
      }
    } else if(distanceY < shrinkOn && onLoad.isSmaller) {
      onLoad.isSmaller = false;
      header.className = header.className.replace( /(?:^|\s)smaller(?!\S)/g , '' )
    }
  });
}
window.onload = onLoad();
