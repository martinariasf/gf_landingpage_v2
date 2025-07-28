// Function to switch between languages
function switchLanguage(language) {
    var englishSection = document.getElementById('english');
    var germanSection = document.getElementById('german');

    if (language === 'english') {
        englishSection.style.display = 'block';
        germanSection.style.display = 'none';
    } else if (language === 'german') {
        englishSection.style.display = 'none';
        germanSection.style.display = 'block';
    }
}
