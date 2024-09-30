export class StringUtils {
    static STRING_EMPTY = "";

    static isNullOrEmpty(str) {
        return str === null || str.trim() === '';
    }

    static capitalize(str) {
        if (this.isNullOrEmpty(str)) {
            return str;
        }
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    static trim(str) {
        return str ? str.trim() : null;
    }

    static countOccurrences(str, substring) {
        if (this.isNullOrEmpty(str) || this.isNullOrEmpty(substring)) {
            return 0;
        }
        return str.split(substring).length - 1;
    }

    static reverse(str) {
        if (this.isNullOrEmpty(str)) {
            return str;
        }
        return str.split('').reverse().join('');
    }

    static splitIntoWords(str) {
        return this.isNullOrEmpty(str) ? [] : str.trim().split(/\s+/);
    }
}

