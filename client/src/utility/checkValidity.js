const checkValidity = elm => {
    if (elm.value.trim() !== '' && elm.checkValidity()) {
        elm.classList.remove('__invalid');
        return true;
    }
    elm.classList.add('__invalid');
    return false;
}

export default checkValidity;