class DomHandler {
    constructor(document) {
        this.document = document;
    }

    createDropDownMenu() {
        const dropdown = document.createElement('select');
        const options = ['Fantasy Descriptor', 'Regular Desciptor', 'Common Noun', 'Proper Name'];
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
        const texts = ['', ' (marked for deletion)', ' (marked for noninclusion)'];

        const jsonContainer = document.getElementById('json-container');
        const arrayContainer = document.createElement('div');

        arrayContainer.className = 'array-container';

        arrayContainer.appendChild(this.createDropDownMenu());
    
        const filterWordDiv = document.createElement('div');
        filterWordDiv.textContent = filteredObject.filterWord;
        arrayContainer.appendChild(filterWordDiv);
        filteredObject.filteredArray.forEach((name) => {
            const div = document.createElement('div');
            div.textContent = name;
            div.className = 'name-div'
            div.style.color = colors[0];
            div.addEventListener('click', () => {
                const currentColorIndex = colors.indexOf(div.style.color.replace(/\s/g, ''));
                const nextColorIndex = (currentColorIndex + 1) % colors.length;
                div.textContent = div.textContent.replace(/ \(.*\)$/, '');
                if (nextColorIndex !== 0) {
                    const italicText = document.createElement('span');
                    italicText.style.fontStyle = 'italic';
                    italicText.textContent = ' ' + texts[nextColorIndex];
                    div.appendChild(italicText);
                }
                div.style.color = colors[nextColorIndex];
            });
            arrayContainer.appendChild(div);
        });
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

module.exports = DomHandler;
