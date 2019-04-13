// ==UserScript==
// @name         jbzd - sprawdzanie linków
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Sprawdzanie linków z YT
// @downloadURL  https://github.com/krozum/jbzd---sprawdzanie-linkow/raw/master/script.user.js
// @updateURL    https://github.com/krozum/jbzd---sprawdzanie-linkow/raw/master/script.user.js
// @author       brains
// @match        https://jbzdy.pl/*
// @grant        none
// @require https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==

function inspekcja(){
    var komentarze = document.getElementsByName("comment");
    komentarze.forEach(czyszczenie);
}

function czyszczenie(p,i){
    var b = p.innerText.indexOf('/watch?v=');
    if (b != -1){
        var id = p.innerText.substring(b+9, b+21);
        fetch("https://www.googleapis.com/youtube/v3/videos?part=snippet&id="+id+"&key=AIzaSyCB5JgQZOjv0F8MyWRX_e1kwNYzio2ipkg")
            .then(response => response.json())
            .then(response => {
            var html = p.innerText;
            if(response.items[0].snippet.channelId == "UCtbx4rjJW3CYRZjSDX4HARw"){
                $(p).html(html + "<br><br><span style='color: red'>LINK ZWERYFIKOWANO NEGATYWNIE 👎</span>");
            } else {
                $(p).html(html + "<br><br><span style='color: green'>LINK ZWERYFIKOWANO POZYTYWNIE 👍</span>");
            }
        });
    }
}

window.onload = inspekcja;
