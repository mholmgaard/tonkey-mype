$(function() {
    const cursor = jQuery('<span>', { id: "cursor", text: "|"});
    const listOfWords = [
        "the",
        "be",
        "of",
        "and",
        "a",
        "to",
        "in",
        "he",
        "have",
        "it",
        "that",
        "for",
        "they",
        "with",
        "as",
        "not",
        "on",
        "she",
        "at",
        "by",
        "this",
        "we",
        "you",
        "do",
        "but",
        "from",
        "or",
        "which",
        "one",
        "would",
        "all",
        "will",
        "there",
        "say",
        "who",
        "make",
        "when",
        "can",
        "more",
        "if",
        "no",
        "man",
        "out",
        "other",
        "so",
        "what",
        "time",
        "up",
        "go",
        "about",
        "than",
        "into",
        "could",
        "state",
        "only",
        "new",
        "year",
        "some",
        "take",
        "come",
        "these",
        "know",
        "see",
        "use",
        "get",
        "like",
        "then",
        "first",
        "any",
        "work",
        "now",
        "may",
        "such",
        "give",
        "over",
        "think",
        "most",
        "even",
        "find",
        "day",
        "also",
        "after",
        "way",
        "many",
        "must",
        "look",
        "before",
        "great",
        "back",
        "through",
        "long",
        "where",
        "much",
        "should",
        "well",
        "people",
        "down",
        "own",
        "just",
        "because",
        "good",
        "each",
        "those",
        "feel",
        "seem",
        "how",
        "high",
        "too",
        "place",
        "little",
        "world",
        "very",
        "still",
        "nation",
        "hand",
        "old",
        "life",
        "tell",
        "write",
        "become",
        "here",
        "show",
        "house",
        "both",
        "between",
        "need",
        "mean",
        "call",
        "develop",
        "under",
        "last",
        "right",
        "move",
        "thing",
        "general",
        "school",
        "never",
        "same",
        "another",
        "begin",
        "while",
        "number",
        "part",
        "turn",
        "real",
        "leave",
        "might",
        "want",
        "point",
        "form",
        "off",
        "child",
        "few",
        "small",
        "since",
        "against",
        "ask",
        "late",
        "home",
        "interest",
        "large",
        "person",
        "end",
        "open",
        "public",
        "follow",
        "during",
        "present",
        "without",
        "again",
        "hold",
        "govern",
        "around",
        "possible",
        "head",
        "consider",
        "word",
        "program",
        "problem",
        "however",
        "lead",
        "system",
        "set",
        "order",
        "eye",
        "plan",
        "run",
        "keep",
        "face",
        "fact",
        "group",
        "play",
        "stand",
        "increase",
        "early",
        "course",
        "change",
        "help",
        "line"
    ];
    const wordsDiv = $("#words");
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
                class: 'word',
            }).appendTo(wordsDiv);
    
            // Append each word with a span of its chars
            for (let j = 0; j < word.length; j++) {
                const char = word.charAt(j);
                jQuery('<letter>', {
                    text: char
                }).appendTo($(`#${word}`));
            }
        }
    }

    function lettersInWord(wordIndex) {
        currentLetters = getWordDiv(wordIndex).find('letter');
    }
    
    let mistakes = 0;
    let correctWords = 0;

    let letterIndex = 0;

    $(window).on('keydown', function(event) {
        // a-z
        if (event.which >= 65 && event.which <= 90) {
            type(event);
        }

        if (event.which === 32) {
            space();
        }

        if (event.which === 8) {
            backspace();
        }
    });

    function type(event) {
        if (!wordIsFinished(wordIndex)) {
            let letter = $(currentLetters[letterIndex]);
            const char = String.fromCharCode(event.which).toLowerCase();
            (letter.text() === char) ? correct(letter) : incorrect(letter);
            letterIndex++;
            moveCursor(letter, true);
        }
    }

    function space() {
        if (wordIsStarted(wordIndex)) {
            if (!isWordCorrect(wordIndex)) {
                getWordDiv(wordIndex).addClass('underline');
            } else {
                correctWords++
            }
            wordIndex++;
            lettersInWord(wordIndex);
            letterIndex = 0;
            moveCursor(currentLetters[0], false);
        }
    }

    function backspace() {
        if (letterIndex === 0 && wordIndex > 0) {
            if (!isWordCorrect(wordIndex - 1)) {
                wordIndex--;
                getWordDiv(wordIndex).removeClass('underline');
                lettersInWord(wordIndex);
                letterIndex = currentLetters.length;
                // TODO: Fix bug with one-letter word
                const lettersTyped = getClassesInWord(wordIndex);
                letterIndex = lettersTyped.length;
                moveCursor(lettersTyped[lettersTyped.length - 1], true);
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

    function getWordDiv(wordIndex) {
        return $(`#${listOfWords[wordIndex]}`);
    }

    function isWordCorrect(wordIndex) {
        const wordDiv = getWordDiv(wordIndex);
        return wordDiv.find('.correct').length  === wordDiv.attr('id').length;
    }

    function wordIsFinished(wordIndex) {
        return getClassesInWord(wordIndex).length  === getWordDiv(wordIndex).attr('id').length;
    }

    function getClassesInWord(wordIndex) {
        return getWordDiv(wordIndex).find('.correct, .incorrect');
    }

    function wordIsStarted(wordIndex) {
        return getClassesInWord(wordIndex).length > 0;
    }
});