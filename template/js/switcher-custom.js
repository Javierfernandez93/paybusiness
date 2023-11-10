

/*jQuery*/

(function ($) {
    // USE STRICT
    "use strict";


    $(document).ready(function () {

        jQuery(".color1").on("click", function(){
            jQuery("#colors").attr("href", "css/colors/primary.css");
        });

        jQuery(".color2").on("click", function(){
            jQuery("#colors").attr("href", "css/colors/red.css");
        });

        jQuery(".color3").on("click", function(){
            jQuery("#colors").attr("href", "css/colors/green.css");
        });

        jQuery(".color4").on("click", function(){
            jQuery("#colors").attr("href", "css/colors/yellow.css");
        });

        jQuery(".color5").on("click", function(){
            jQuery("#colors").attr("href", "css/colors/skyblue.css");
        });

        jQuery(".color6").on("click", function(){
            jQuery("#colors").attr("href", "css/colors/red2.css");
        });

        jQuery(".color7").on("click", function(){
            jQuery("#colors").attr("href", "css/colors/orange.css");
        });

        $(".switcher-cog").on("click", function(){
            $('#switcher').toggleClass("show");
        });
    });

})(jQuery);

