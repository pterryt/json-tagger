class xDomHandler {
    constructor(document, ipcRenderer) {
        this.document = document;
        this.ipcRenderer = ipcRenderer;
    }

    createDropDownMenu() {
        const dropdown = document.createElement('select');
        dropdown.className = 'category-dropdown';
        const options = ['Uncategorized', 'Fantasy Descriptor', 'Regular Desciptor', 'Common Noun', 'Proper Name'];
        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.text = option;
            dropdown.appendChild(optionElement);
        });
        return dropdown;
    }

    createFilteredListDisplay(filteredObject) {
        const colors = ['rgb(186,255,201)', 'rgb(255,179,186)', 'rgb(255,255,186)'];
        const texts = ['NONE', 'DELETE', 'EXCLUDE'];

        const jsonContainer = document.getElementById('json-container');
        const arrayContainer = document.createElement('div');
        arrayContainer.className = 'array-container';
        const dropdown = this.createDropDownMenu();
        arrayContainer.appendChild(dropdown);
    
        const filterWord = filteredObject.filterWord;
        const filterWordDiv = document.createElement('div');
        filterWordDiv.className = 'filter-word-div';
        filterWordDiv.textContent = filterWord
        arrayContainer.appendChild(filterWordDiv);
        const filteredData = filteredObject.filteredData;
        dropdown.addEventListener('change', () => {
            this.ipcRenderer.send('category-change', { category: dropdown.value, filterWord });
        });



        for (const hash in filteredData) {
            const div = document.createElement('div');
            div.textContent = filteredData[hash].Name;
            div.className = 'name-div'
            div.style.color = colors[0];
            div.addEventListener('click', () => {
                const currentColorIndex = colors.indexOf(div.style.color.replace(/\s/g, ''));
                const nextColorIndex = (currentColorIndex + 1) % colors.length;
                div.textContent = div.textContent.replace(/ \(.*\)$/, '');
                if (nextColorIndex !== 0) {
                    const italicText = document.createElement('span');
                    italicText.style.fontStyle = 'italic';
                    italicText.textContent = ' (' + texts[nextColorIndex] + ')';
                    div.appendChild(italicText);
                }
                div.style.color = colors[nextColorIndex];
                this.ipcRenderer.send('special-name-case', { hash, status: texts[currentColorIndex], filterWord });
            });
            arrayContainer.appendChild(div);
        };
        jsonContainer.appendChild(arrayContainer);
    }

    createTargetWordDiv(targetWord) {
        const topHalfDiv = document.getElementById('top-half');
        const oldtargetWordDiv = document.getElementById('target-word-div');
        if (oldtargetWordDiv) { topHalfDiv.removeChild(oldtargetWordDiv); }

        const targetWordDiv = document.createElement('div');
        targetWordDiv.id = 'target-word-div'
        targetWordDiv.textContent = targetWord;
        targetWordDiv.style.fontSize = '2em';
        topHalfDiv.appendChild(targetWordDiv);
    }
}

module.exports = xDomHandler;
