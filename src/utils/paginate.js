import _ from 'lodash';

export function paginate(allItems, pageNumber, pageSize) {
    const startIndex = (pageNumber - 1) * pageSize; // finde the start index of each page
    return _(allItems).slice(startIndex).take(pageSize).value();
} 