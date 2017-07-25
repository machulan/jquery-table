const EMPTY_NAME_HELP_TEXT = 'Поле не может быть пустым';
const ONLY_SPACES_NAME_HELP_TEXT = 'Поле не может состоять только из пробелов';
const MAX_LENGTH_NAME_HELP_TEXT = 'Максимальная длина 15 букв';
const SUPPLIER_EMAIL_HELP_TEXT = 'Несоответствие формату e-mail';

// special
const BLACK_CIRCLE = '\u25CF';

function reverseString(string) {
    return string.split('').reverse().join('');
}