// constants
const EMPTY_NAME_HELP_TEXT = 'Поле не может быть пустым';
const ONLY_SPACES_NAME_HELP_TEXT = 'Поле не может состоять только из пробелов';
const MAX_LENGTH_NAME_HELP_TEXT = 'Максимальная длина 15 букв';
const SUPPLIER_EMAIL_HELP_TEXT = 'Несоответствие формату e-mail';

// special
const BLACK_CIRCLE = '\u25CF';

const EMPTY_ROW_HTML = '<td><a data-click-event="view" href="#" class="text-info"></a><span class="badge"></span></td>' +
    '<td data-column-name="price"></td>' +
    '<td>' +
    '<div class="row">' +
    '<div class="col-md-2 col-md-offset-4 col-xs-3 col-xs-offset-3">' +
    '<button data-click-event="edit" class="btn btn-default">Edit</button>' +
    '</div>' +
    '<div class="col-md-2 col-xs-3">' +
    '<button data-click-event="delete" class="btn btn-default">Delete</button>' +
    '</div>' +
    '</div>' +
    '</td>';

// helper functions
function reverseString(string) {
    return string.split('').reverse().join('');
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}