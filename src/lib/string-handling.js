import {diffChars} from "diff";
export const comparingStringsDifferencesTitle = (oldVal, newVal) => {
    if (diffChars(oldVal, newVal)[1]?.added) {
        return `<span style="color: #51c02e;"> ${diffChars(oldVal, newVal)[1].value}</span>`;
    }

    if (diffChars(oldVal, newVal)[1]?.removed) {
        return newVal + `<span style="color: #f31010;">${diffChars(oldVal, newVal)[1].value}</span>`;
    }

    return 'Заголовок не изменился.';
}

export const comparingStringsDifferencesBody = (oldVal, newVal) => {
    if (diffChars(oldVal?.body, newVal?.body)[1]?.added) {
        return `<pre style="color: #51c02e;"> ${diffChars(oldVal?.body, newVal?.body)[1].value}</pre>`;
    }

    if (diffChars(oldVal?.body, newVal?.body)[1]?.removed) {
        return `<pre style="color: #f31010;">${diffChars(oldVal?.body, newVal?.body)[1].value}</pre>`;
    }

    return 'Описание не изменилось.';
}