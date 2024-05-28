class XEventHandler {
    constructor(ipcRenderer) {
        this.ipcRenderer = ipcRenderer;
    }

    splitButtonClickedEvent(targetName, selection, filterWords) {
        if (selection.rangeCount > 0 && filterWords.length > 0) {
            const parentElement = selection.getRangeAt(0).commonAncestorContainer.parentNode;
            if (parentElement.id == 'target-word-div') {
                const selectedText = selection.toString();
                console.log('selectedText:', selectedText);
                const selectedWords = selectedText.split(' ');
    
                // Get the first and last words of the selection
                const firstWord = selectedWords[0];
                const lastWord = selectedWords[selectedWords.length - 1];
    
                // Find the indexes of the first and last words in filterWords
                const firstIndex = filterWords.indexOf(firstWord);
                const lastIndex = filterWords.indexOf(lastWord);
    
                // Check if the first and last words were found in filterWords
                if (firstIndex !== -1 && lastIndex !== -1) {
                    // Create a new array with all the words between the first and last words as one value
                    const combinedWords = filterWords.slice(firstIndex, lastIndex + 1).join(' ');
                    const splitArray = [...filterWords.slice(0, firstIndex), combinedWords, ...filterWords.slice(lastIndex + 1)];
                    console.log('splitArray:', splitArray);
                    this.ipcRenderer.send('split-button-clicked', { splitArray , targetName , selectedText });
                }
            }
        }
    }
}


module.exports = XEventHandler;