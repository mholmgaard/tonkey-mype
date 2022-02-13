$(function() {
    let listOfWords = ["escapable","parallactic","pigsticker","superhardened","cresyls","pastrami","regularizes","apocopate","verdancy","nonconcurring","simonizing","vitreouses","percept","pietisms","miniscules","unriddling","cental","eyass","esnes","outheard","cryogens","yokels","preorders","crustacea","protuberant","squalled","kroon"]
    const wordsDiv = $("#words");
    const cursor = $("#cursor");
    let currentLetters = [];
    let wordIndex = 0;

    function initialize() {
        createWords(listOfWords);
        lettersInWord(0);
        moveCursor(currentLetters[wordIndex], false);
        // TODO
    }

    initialize();

    function createWords(words) {
        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            
            // Create div for each word
            jQuery('<div>', {
                id: words[i],
                class: "word",
            }).appendTo(wordsDiv);
            if (i === 0) $(`#${word}`).addClass('active');
            
    
            // Append each word with a span of its chars
            for (let j = 0; j < word.length; j++) {
                const char = word.charAt(j);
                jQuery('<letter>', {
                    text: char,
                }).appendTo($(`#${word}`));
            }
        }
    }

    function lettersInWord(index) {
        currentLetters = $(`#${listOfWords[index]}`).find('letter');
    }

    // TODO: If div contains the 'incorrect' class, word is not correct.
    
    let mistakes = 0;
    let letterIndex = 0;

    $(window).on('keydown', function(event) {
        // a-z
        if (event.which >= 65 && event.which <= 90) {
            type();
        }

        // Space
        if (event.which === 32) {
            space();
        }

        // Backspace
        if (event.which === 8) {
            backspace();
        }
    });

    function type() {
        let letter = $(currentLetters[letterIndex]);
        const char = String.fromCharCode(event.which).toLowerCase();
        (letter.text() === char) ? correct(letter) : incorrect(letter);
        letterIndex++;
        moveCursor(letter, true);
    }

    function space() {
        wordIndex++;
        lettersInWord(wordIndex);
        letterIndex = 0;
        moveCursor(currentLetters[0], false);
    }

    function backspace() {
        if (letterIndex === 0 && wordIndex > 0) {
            if (!isWordCorrect(listOfWords[wordIndex - 1])) {
                wordIndex--;
                lettersInWord(wordIndex);
                letterIndex = currentLetters.length;
                moveCursor(currentLetters[currentLetters.length - 1], true);
            }
        } else {
            // TODO: Skip entire word if CTRL is held
            const prevLetter = $(currentLetters[letterIndex - 1]);
            prevLetter.removeClass();
            if (letterIndex > 0) letterIndex--;
            moveCursor(prevLetter, false);
        }
    }

    function correct(letter) {
        letter.addClass('correct');
    }

    function incorrect(letter) {
        letter.addClass('incorrect');
        mistakes++;
    }

    function moveCursor(letter, after) {
        (after) ? cursor.insertAfter(letter) : cursor.insertBefore(letter);
    }

    function isWordCorrect(word) {
        return ($(`#${word}`).find('.correct').length  === word.length);
    }
});