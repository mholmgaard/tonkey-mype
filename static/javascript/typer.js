$(function() {
    let listOfWords = ["escapable","parallactic","pigsticker","superhardened","cresyls","pastrami","regularizes","apocopate","verdancy","nonconcurring","simonizing","vitreouses","percept","pietisms","miniscules","unriddling","cental","eyass","esnes","outheard","cryogens","yokels","preorders","crustacea","protuberant","squalled","kroon"]
                        .join(" ");
    let div = $("#words");

    for (let i = 0; i < listOfWords.length; i++) {
        let char = listOfWords.charAt(i);
        if (char === " ") {
            div.append($('<span />').attr("id", i).html(char));
        } else {
            div.append($('<span />').attr("id", i).html(char));
        }
    }

    // TODO: Add each word it its own div. If div contains the 'wrong' class, word is not correct.

    let index = 0;

    $(window).on('keydown', function(event) {
        if (event.which === 8) {
            let charSpan = $("#" + (index - 1));
            charSpan.removeClass();
            if (index > 0) index--;
            return;
        }

        let charSpan = $("#" + index);

        if (event.which === 32) {
            if (charSpan.html() === " ") {
                index++;
            } else {
                charSpan.addClass('wrong');
                index++;
            }
            return;
        }

        if (event.which >= 65 && event.which <= 90) {
            let char = String.fromCharCode(event.which).toLowerCase();
            if (charSpan.html() === char) {
                charSpan.addClass('correct');
            } else {
                charSpan.addClass('wrong');
            }
            index++;
        }
    });
});