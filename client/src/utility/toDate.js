const toDate = date => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const formatedDate = new Date(date);
    const day = formatedDate.getDate().toString();
    return `${months[formatedDate.getMonth()]}, ${day.length === 1 ? `0${day}` : day} ${formatedDate.getFullYear()}`;
}

export default toDate;