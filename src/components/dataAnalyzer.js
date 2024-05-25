


class DataAnalyzer {

    createNpcNameArray(data) {
        return data.map(item => item.Text)
    }

    filterNamesByWord(nameArray, word) {
        const trimmedWord = word.trim();
        const filteredArray = nameArray.filter(name => {
            const words = name.split(' ');
            return words.includes(trimmedWord);
        });
        return { filterWord: trimmedWord, filteredArray: filteredArray }
    }

    getAllFilteredArrays(nameArray, word) {
        const name = nameArray.find(name => name.split(' ').includes(word));
         if (!name) {
            return [];
        }
        const wordArray = name.split(' ');
        return wordArray.map(singleWord => this.filterNamesByWord(nameArray, singleWord));
    }

    // TODO: fix this jank, ex. Spirit will pick up Spirit-walker
    filterNamesByWordChunk(nameArray, word) {
        const trimmedWord = word.trim();
        console.log('trimmedWord: ', trimmedWord)
        const filteredArray = nameArray.filter(name => {
            return name.includes(trimmedWord);
        });
        return { filterWord: trimmedWord, filteredArray: filteredArray }
    }

    getAllFilteredArraysFromSplitArray(nameArray, splitArray) {
        return splitArray.map(singleWord => this.filterNamesByWordChunk(nameArray, singleWord));
    }


}

module.exports = DataAnalyzer;