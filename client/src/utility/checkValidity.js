const checkValidity = elm => elm.value.trim() !== '' && elm.checkValidity() ? elm.classList.remove('__invalid') : elm.classList.add('__invalid');

export default checkValidity;