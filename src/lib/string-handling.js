import {diffChars} from "diff";

const checkLinkInString = new RegExp(/(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/);

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

export const checkLinkMatch = (str) => {
    if (checkLinkInString.test(str)) {
        return `<a target="_blank" style="color: #5658ee; text-decoration: underline;" href="${str.match(checkLinkInString)[0]}">${str.match(checkLinkInString)[0]}</a>`
    } else {
        return 'Ссылок в тексте нет'
    }


}