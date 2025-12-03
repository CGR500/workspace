    function createHyperlink() {
        const url = document.getElementById('urlInput').value;
        const linkText = document.getElementById('textInput').value;
        const linkDisplay = document.getElementById('linkDisplay');

        // Clear previous content
        linkDisplay.innerHTML = '';

        if (url && linkText) {
            // Create an anchor element
            const aTag = document.createElement('a');
            aTag.setAttribute('href', url);
            aTag.textContent = linkText;

            // Append the link to the display area
            linkDisplay.appendChild(aTag);
        } else {
            linkDisplay.textContent = "Please enter both URL and link text.";
        }
    }