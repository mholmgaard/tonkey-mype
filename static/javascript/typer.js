$(function() {
    let listOfWords = ["escapable","parallactic","pigsticker","superhardened","cresyls","pastrami","regularizes","apocopate","verdancy","nonconcurring","simonizing","vitreouses","percept","pietisms","miniscules","unriddling","cental","eyass","esnes","outheard","cryogens","yokels","preorders","crustacea","protuberant","squalled","kroon"]
    const words = $("#words");
    const cursor = $("#cursor");
    let spanIndex = 0;
    
    for (let i = 0; i < listOfWords.length; i++) {
        // Create div for each word
        jQuery('<div>', {
            id: listOfWords[i],
            class: "single-word-div",
        }).appendTo(words);


        const word = listOfWords[i];
        // Append each word with a span of its chars
        for (let j = 0; j < word.length; j++) {
            const char = word.charAt(j);
            jQuery('<span>', {
                id: spanIndex,
                html: char
            }).appendTo($("#" + word));
            spanIndex++;
        }

        // Add space after each word, unless it is the last word of the list.
        if (i !== listOfWords.length - 1) {
            jQuery('<span>', {
                id: spanIndex,
                html: "&nbsp;"
            }).appendTo($("#" + word));
            spanIndex++;
        }
    }

    spanIndex = 0;
    
    // TODO: Add each word it its own div. If div contains the 'wrong' class, word is not correct.
    
    let mistakes = 0;

    $(window).on('keydown', function(event) {
        // Backspace
        if (event.which === 8) {
        // TODO: Skip entire word if CTRL is held
            const charSpan = $("#" + (spanIndex - 1));
            charSpan.removeClass();
            if (spanIndex > 0) spanIndex--;
            moveCursor(charSpan, false);
            return;
        }

        let charSpan = $("#" + spanIndex);

        // Space
        if (event.which === 32) {
            if (charSpan.html() === " ") {
                spanIndex++;
            } else {
                wrong(charSpan);
                spanIndex++;
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
            spanIndex++;
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