export const stringValidation = (str, num) => str.length >= num ? str.slice(0, num) + '...' : str;

export const showAnimationAccept = (el, className) => {
    const htmlElement = document.getElementById(el);

    htmlElement.classList.add(className);

    setTimeout(() => {
        document.getElementById(el).classList.remove(className);
    }, 1000);

}