// ==UserScript==
// @name         jbzd - sprawdzanie linków
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Sprawdzanie linków z YT
// @downloadURL  https://github.com/krozum/jbzd---sprawdzanie-linkow/raw/master/script.user.js
// @updateURL    https://github.com/krozum/jbzd---sprawdzanie-linkow/raw/master/script.user.js
// @author       brains
// @match        https://jbzdy.pl/*
// @grant        none
// ==/UserScript==

$(window).load(function(){
    function inspekcja(){
        console.log('--------------');
        console.log('jbzd - sprawdzanie linków');
        console.log('--------------');
        $('*[name="comment"]:contains("watch?v")').each(function(index, element) {
            var THAT = $(element);
            var html = $(element).html();
            var indexOf = html.indexOf("watch?v");
            var idVideo = html.substring(indexOf+8, indexOf + 19);

            $.getJSON("https://www.googleapis.com/youtube/v3/videos?part=snippet&id="+idVideo+"&key=AIzaSyCB5JgQZOjv0F8MyWRX_e1kwNYzio2ipkg", {
                format: "json"
            }).done(function (data) {
                if(data['items'].length != 0){
                    if(data['items'][0]['snippet']['channelId'] == "UCtbx4rjJW3CYRZjSDX4HARw"){
                        THAT.append("<br><br><span style='color: red'>LINK ZWERYFIKOWANO NEGATYWNIE 👎</span>");
                    } else {
                        THAT.append("<br><br><span style='color: green'>LINK ZWERYFIKOWANO POZYTYWNIE 👍</span>");
                    }
                } else {
                    THAT.append("<br><br><span style='color: orange'>FILM NIEDOSTEPNY</span>");
                }
            });
        })

    }
    inspekcja();
});
