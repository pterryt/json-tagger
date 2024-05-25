


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
        const name = nameArray.find(name => name.includes(word.trim()));
        if (!name) {
            return [];
        }
        const wordArray = name.split(' ');
        return wordArray.map(singleWord => this.filterNamesByWord(nameArray, singleWord));
    }
}

module.exports = DataAnalyzer;