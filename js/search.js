function searchClickListerner(key) {
    $('#' + key).submit(function(event) {
        event.preventDefault();
        removeHighlights(); // Remove previous highlights
        const keyword = $('#searchInput').val().trim();
        if (keyword === '') {
            return;
        }

        $('#projects').children('div').each(function() {
            // Adjust the selector below to target the specific elements in your project divs where you want to search for keywords
            const projectContent = $(this).find('b, p');
            projectContent.each(function() {
                if ($(this).text().toLowerCase().includes(keyword.toLowerCase())) {
                    highlightMatches(this, keyword);
                }
            });
        });
        scrollToFirstHighlighted();
    })
     
}

function removeHighlights() {
    $('#projects').find('.highlight').each(function() {
        $(this).replaceWith($(this).text());
    });
}

function highlightMatches(element, keyword) {
    const regex = new RegExp(`(${keyword})`, 'gi');
    const newText = $(element).text().replace(regex, '<span class="highlight">$1</span>');
    $(element).html(newText);
}

function scrollToFirstHighlighted() {
    const firstHighlighted = $('#projects').find('.highlight').first();
    if (firstHighlighted.length > 0) {
        const yOffset =  firstHighlighted.innerHeight() / 2 - window.innerHeight / 2;
        $('html, body').animate({
            scrollTop: firstHighlighted.offset().top + yOffset
        }, 1000);
    }
}
