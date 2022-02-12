$(function() {
    let listOfWords = ["escapable","parallactic","pigsticker","superhardened","cresyls","pastrami","regularizes","apocopate","verdancy","nonconcurring","simonizing","vitreouses","percept","pietisms","miniscules","unriddling","cental","eyass","esnes","outheard","cryogens","yokels","preorders","crustacea","protuberant","squalled","kroon"]
                        .join(" ");
    const div = $("#words");
    const cursor = $("#cursor");

    for (let i = 0; i < listOfWords.length; i++) {
        const char = listOfWords.charAt(i);
        div.append($('<span />').attr("id", i).html(char));
    }

    // TODO: Add each word it its own div. If div contains the 'wrong' class, word is not correct.

    let index = 0;
    let mistakes = 0;

    $(window).on('keydown', function(event) {
        // Backspace
        if (event.which === 8) {
        // TODO: Skip entire word if CTRL is held
            const charSpan = $("#" + (index - 1));
            charSpan.removeClass();
            if (index > 0) index--;
            moveCursor(charSpan, false);
            return;
        }

        let charSpan = $("#" + index);

        // Space
        if (event.which === 32) {
            if (charSpan.html() === " ") {
                index++;
            } else {
                wrong(charSpan);
                index++;
            }
            moveCursor(charSpan, true);
            return;
        }

        // a-z
        if (event.which >= 65 && event.which <= 90) {
            const char = String.fromCharCode(event.which).toLowerCase();
            if (charSpan.html() === char) {
                correct(charSpan);
            } else {
                // TODO: Show error if incorrect character at spaces
                wrong(charSpan);
            }
            moveCursor(charSpan, true);
            index++;
        }
    });

    function wrong(charSpan) {
        charSpan.addClass('wrong');
        mistakes++;
    }

    function correct(charSpan) {
        charSpan.addClass('correct');
    }

    function moveCursor(charSpan, after) {
        if (after) {
            cursor.insertAfter(charSpan);
        } else {
            cursor.insertBefore(charSpan);
        }
    }
});