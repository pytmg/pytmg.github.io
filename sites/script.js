// https://raw.githubusercontent.com/pytmg/pytmg.github.io/refs/heads/main/README.md

fetch('../README.md')
.then(response => response.text())
.then(data => {
    const markdownContent = data;
    const htmlContent = marked.parse(markdownContent);

    // Create a temporary element to hold the HTML content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;

    // Add IDs to headers
    tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(header => {
        const id = header.textContent.trim().toLowerCase().replace(/\s+/g, '-');
        header.id = id;
    });

    // Set the content of the page
    document.getElementById('content').innerHTML = tempDiv.innerHTML;

    // Add language labels, icons, and copy buttons
    document.querySelectorAll('pre').forEach(pre => {
        const code = pre.querySelector('code');
        if (code) {
            const language = code.className.replace('language-', '');
            const label = document.createElement('div');
            label.style.top = "10px";
            label.style.boxShadow = "0px 2px 10px 0px #0008";
            label.style.backgroundColor = "#444";
            label.className = 'language-label';

            // Add the appropriate icon and text for the language
            let iconSrc = '';
            switch (language) {
                case 'python':
                    iconSrc = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg';
                    break;
                case 'bash':
                    iconSrc = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg';
                    break;
                default:
                    iconSrc = '';
            }

            if (iconSrc) {
                const icon = document.createElement('img');
                icon.src = iconSrc;
                icon.className = "langicon";
                label.appendChild(icon);
            }

            function toTitleCase(str) {
                return str.toLowerCase().split(' ').map(word => {
                    return word.charAt(0).toUpperCase() + word.slice(1);
                }).join(' ');
            }

            label.appendChild(document.createTextNode(toTitleCase(language)));
            pre.appendChild(label);
        }
    });

    Prism.highlightAll(); // Apply syntax highlighting
})
.catch(error => {
    let content = document.getElementById('content');
    content.innerHTML = "<p>Error fetching markdown: " + error + "</p>";
    content.style.color = "#ff0000"
});