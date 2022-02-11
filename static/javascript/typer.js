$(function() {
    let listOfWords = ["reinsures","leftward","gids","wae","thrashings","freehanded","disentangling","endoskeleton","dameworts","maes","inculcations","whams"].join(" ");
    let div = $("#words");

    for (let i = 0; i < listOfWords.length; i++) {
        let char = listOfWords.charAt(i);
        if (char === " ") {
            div.append($('<span />').attr("id", i).html(char));
        } else {
            div.append($('<span />').attr("id", i).html(char));
        }
    }

    // TODO: Add each word it its own div. If div contains the wrong class, word is not correct.

    let index = 0;

    $(window).on('keydown', function(event) {
        let charSpan = $("#" + index);

        // space keycode 32
        if (event.which === 8) {
            charSpan.removeClass();
            if (index > 0) index--;
        }

        if (event.which === 32) {
            if (charSpan.html() === " ") {
                index++;
            } else {
                charSpan.addClass('wrong');
                index++;
            }
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