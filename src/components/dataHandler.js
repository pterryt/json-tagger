


class DataAnalyzer {
    constructor() {
        this.NameStatus = {
            DELETED: 0,
            INCOMPLETE: 1,
            COMPLETE: 2,
        }
    }

    getWordFilteredData(data, filterWord) {
        const filteredData = {};
        for (const hash in data) {
            if (this.wordInNameArray(data[hash], filterWord)) {
                filteredData[hash] = { Name: data[hash].Name };
            }
        }
        return { filterWord, filteredData };
    }

    getNameFilteredData(data, filterWord) {
        const targetName = Object.values(data).find(item => item.Words.some(wordObj => wordObj.Word === filterWord));
        // console.log('@dataAnalyzer.getNameFilterData targetName:', targetName.Name)
        if (!targetName) { return []; }
        const filteredObjectArray = targetName.Words.map(singleWord => this.getWordFilteredData(data, singleWord.Word));
        return { name: targetName.Name, filteredObjectArray };
    }

    wordInNameArray(dataObject, word) {
        return dataObject.Words.some(item => item.Word === word);
    }

    wordInName(dataObject, word) {
        return dataObject.Name.includes(word);
    }

    splitUpdateName(dataObject, wordCombo) {
        const wordsInCombo = wordCombo.split(' ');
        let firstIndex = -1;

        dataObject.Words = dataObject.Words.filter((item, index) => {
            if (wordsInCombo.includes(item.Word)) {
                if (firstIndex === -1) firstIndex = index;
                return false;
            }
            return true;
        });

        if (firstIndex !== -1) {
            dataObject.Words.splice(firstIndex, 0, { Word: wordCombo });
        }
        console.log(dataObject)

        return dataObject;
    }

    splitUpdateData(data, wordCombo) {
        for (const hash in data) {
            if (this.wordInName(data[hash], wordCombo)) {
                data[hash] = this.splitUpdateName(data[hash], wordCombo);
            }
        }
        return data;
    }

    editNameWordCategory(data, hash, category, word) {
        const wordObj = data[hash].Words.find(item => item.Word === word);
        if (Object.prototype.hasOwnProperty.call(wordObj, 'Category') && wordObj.Category === 'EXCLUDE') return data;
        wordObj.Category = category;
        const allWordsHaveCategory = data[hash].Words.every(item => item.Category !== undefined);
        if (allWordsHaveCategory) {
            data[hash].Status = this.NameStatus.COMPLETE;
        }
        return data;
    }

    handleNameClicked(data, hash, status, filterWord) {
        if (status === 'NONE') {
            data[hash].Status = this.NameStatus.INCOMPLETE;
        } else if (status === 'DELETE') {
            data[hash].Status = this.NameStatus.DELETED;
        } else if (status === 'EXCLUDE') {
            const wordObj = data[hash].Words.find(item => item.Word === filterWord)
            wordObj.Category = 'EXCLUDE';
            return data;
        }
    }
}

module.exports = DataAnalyzer;