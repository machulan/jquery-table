$(document).ready(function() {

    // 'NO' button click handler
    $('#no-button').on('click', function() {
        $('html, body').css('overflow', 'auto');

        $('#delete-modal').hide();
    });

    // closes modal
    $('#close-button').on('click', function() {
        $('html, body').css('overflow', 'auto'); // TODO

        $('#edit-modal').hide();
        // enableEditModal();
    });

    // clears edit-modal form (resets inputs, borders, help-texts)
    function clearForm() {
        document.getElementById('add-update-form').reset();

        enableEditModal();

        $('#name').removeClass('input-highlighting');
        $('#supplier-email').removeClass('input-highlighting');
        $('#count').removeClass('input-highlighting');

        $('.help-block').text('');

        $('#delivery-country-radio-group').addClass('invisible');
        $('#delivery-city-checkbox-group').addClass('invisible');
    }

    function fillForm(product) {
        $('#name').val(product.name);
        $('#supplier-email').val(product.supplierEmail);
        $('#count').val(product.count);
        $('#price').val(getFormattedPrice(product.price));
        var delivery = product.delivery;
        $('#delivery-type-select').val(delivery.type);
        switch (delivery.type) {
            case '':
                break;
            case 'country':
                $(':radio[name="country"][value="' + delivery.value + '"]').prop('checked', true);
                $('#delivery-country-radio-group').removeClass('invisible');
                break;
            case 'city':
                delivery.value.forEach(function(city) {
                    $(':checkbox[name="city"]:not(#select-all-checkbox)[value="' + city + '"]').prop('checked', true);
                });
                $('#delivery-city-checkbox-group').removeClass('invisible');
                break;
            default:
                throw new Error('Unknown delivery type: ' + delivery.type);
        }
    }

    // checks string on the name format
    function validateName(name) {
        return 0 < name.length && name.length <= 15 && !/^ +$/.test(name);
    }

    // checks string on the name format and returns {valid, error-message}
    function nameValidation(name) {
        var result = { valid: false };
        if (name.length == 0) {
            result.message = EMPTY_NAME_HELP_TEXT;
            return result;
        }
        if (/^ +$/.test(name)) {
            result.message = ONLY_SPACES_NAME_HELP_TEXT;
            return result;
        }
        if (name.length > 15) {
            result.message = MAX_LENGTH_NAME_HELP_TEXT;
            return result;
        }
        result.valid = true;
        return result;
    }

    // checks string on the email format
    function validateEmail(email) {
        var symbols = '([\\w.-])+';
        var domain = '([a-zA-Z]){2,3}';
        var regexp = '^' + symbols + '@' + symbols + '\\.' + domain + '$';

        return new RegExp(regexp).test(email);
    }

    // checks string on the email format and returns {valid, error-message}
    function emailValidation(email) {
        return {
            valid: validateEmail(email),
            message: SUPPLIER_EMAIL_HELP_TEXT
        };
    }

    // checks string on the count format
    function validateCount(count) {
        var re = /^\d+$/;
        return count == '' || re.test(count);
    }

    // checks string on the price format
    function validateUnformattedPrice(unformattedPrice) {
        // var re = /^[\d\.]+$/;
        // return unformattedPrice == '' || re.test(unformattedPrice); // !isNaN()
        return isNumeric(unformattedPrice);
    }

    // checks string on the US currency format
    function validateFormattedPrice(formattedPrice) {
        var leftPartWithoutCommas = '([0-9]){1,3}';
        var leftPartWithCommas = '(([0-9]){1,3}\\,)(([0-9]){3}\\,)*(([0-9]){3})';
        var leftPart = '(' + leftPartWithoutCommas + '|' + leftPartWithCommas + ')';
        var rightPart = '(\\.([0-9]){1,2})?';
        var regexp = '^\\$' + leftPart + rightPart + '$';
        return formattedPrice == '' || new RegExp(regexp).test(formattedPrice);
    }

    // adds validation to edit-modal inputs
    function addValidation() {

        // email validation
        // on focus
        var firstNameFocus = true;
        $('#name').off();
        $('#name').focus(function() {
            if (firstNameFocus) {
                firstNameFocus = !firstNameFocus;
                return;
            }

            var validation = nameValidation($(this).val());
            if (!validation.valid) {
                $(this).addClass('input-highlighting');
                $('#name-help-block').text(BLACK_CIRCLE + ' ' + validation.message);
            } else {
                $(this).removeClass('input-highlighting');
                $('#name-help-block').text('');
            }
        });
        // on blur

        $('#name').blur(function() {
            var validation = nameValidation($(this).val());
            if (!validation.valid) {
                $(this).addClass('input-highlighting');
                $('#name-help-block').text(BLACK_CIRCLE + ' ' + validation.message);
            } else {
                $(this).removeClass('input-highlighting');
                $('#name-help-block').text('');
            }
        });

        // email validation
        // on focus
        var firstSupplierEmailFocus = true;
        $('#supplier-email').off();
        $('#supplier-email').focus(function() {
            if (firstSupplierEmailFocus) {
                firstSupplierEmailFocus = !firstSupplierEmailFocus;
                return;
            }

            var validation = emailValidation($(this).val());
            if (!validation.valid) {
                $(this).addClass('input-highlighting');
                $('#supplier-email-help-block').text(BLACK_CIRCLE + ' ' + validation.message);
            } else {
                $(this).removeClass('input-highlighting');
                $('#supplier-email-help-block').text('');
            }
        });
        // on blur
        $('#supplier-email').blur(function() {
            var validation = emailValidation($(this).val());
            if (!validation.valid) {
                $(this).addClass('input-highlighting');
                $('#supplier-email-help-block').text(BLACK_CIRCLE + ' ' + validation.message);
            } else {
                $(this).removeClass('input-highlighting');
                $('#supplier-email-help-block').text('');
            }
        });

        // count validation 
        $('#count').off();
        // prevent paste
        $('#count').on('paste', function(e) {
            var pasteData = e.originalEvent.clipboardData.getData('Text');
            return validateCount(pasteData);
        });

        $('#count').keypress(function(e) {
            var e = e || window.event;
            var keyCode = e.keyCode || e.which;
            var key = String.fromCharCode(keyCode);

            // for firefox
            if (keyCode == 8) {
                return true;
            }

            return validateCount(key);
        });

        // price validation
        $('#price').off();
        $('#price').on('paste', function(e) {
            var pasteData = e.originalEvent.clipboardData.getData('Text');
            return /^[\d\.]+$/.test(pasteData);
        });

        $('#price').keypress(function(e) {
            var e = e || window.event;
            var keyCode = e.keyCode || e.which;
            var key = String.fromCharCode(keyCode);

            // for firefox
            if (keyCode == 8) {
                return true;
            }

            // return validateUnformattedPrice(key);
            return /^[\d\.]+$/.test(key);
            // TODO add isNaN on input.val()???
        });

        $('#price').focus(function() {
            var formattedPrice = $(this).val();
            if (formattedPrice) {
                // delete all commas and dollar sign
                $(this).val(getUnformattedPrice(formattedPrice));
            }
            // console.log('caret position: ', $(this).selectionStart);
        });
        $('#price').blur(function() {
            var unformattedPrice = $(this).val().toString();
            if (unformattedPrice.length == 0) {
                // return;
            }
            // 000786 00.789
            unformattedPrice = unformattedPrice.replace(/^(0){1,}/g, '');
            if (unformattedPrice.length == 0 || unformattedPrice.startsWith('.')) {
                // .123456789 add 0
                unformattedPrice = '0' + unformattedPrice;
            }

            $(this).val(getFormattedPrice(+unformattedPrice));
        });
    }

    // gets unformatted price (string or number) and returns that formatted to US currency format
    function getFormattedPrice(unformattedPrice) {
        var parts = unformattedPrice.toString().split('.');
        var leftPart = '$' + reverseString(reverseString(parts[0]).match(/.{1,3}/g).join(','));
        return leftPart + (parts[1] ? '.' + parts[1].substr(0, 2) : '');
    }

    // gets price formatted in US currency format and returns that unformatted 
    function getUnformattedPrice(formattedPrice) {
        return formattedPrice.replace(/[\,\$]/g, '');
    }

    // add-new-product-button click handler
    $('#add-new-button').on('click', function() {

        $('html, body').css('overflow', 'hidden');

        // clearing form
        clearForm();

        $('#add-update-button').text('Add');

        // making event handler for add-button
        $('#add-update-button').off('click').on('click', function() {
            var valid = validateName($('#name').val()) &&
                emailValidation($('#supplier-email').val()).valid &&
                validateCount($('#count').val()) &&
                validateFormattedPrice($('#price').val());

            if (valid) {
                var delivery = { type: $('#delivery-type-select').val() };
                switch (delivery.type) {
                    case '':
                        break;
                    case 'country':
                        delivery.value = $('input[type=radio]:checked').val();
                        break;
                    case 'city':
                        var chechboxValues = [];
                        $('input[type=checkbox]:not(#select-all-checkbox):checked').each(function() {
                            chechboxValues.push($(this).val());
                        });
                        delivery.value = chechboxValues;
                        break;
                    default:
                        throw new Error('Unknown delivery type: ' + delivery.type);
                }

                var price = +getUnformattedPrice($('#price').val());

                addIntoTable(new Product($('#name').val(), $('#supplier-email').val(), $('#count').val(), price, delivery));

                $('html, body').css('overflow', 'auto');

                $('#edit-modal').hide();
            } else {
                // no valid
                if (!validateEmail($('#supplier-email').val())) {
                    $('#supplier-email').focus().blur().focus();
                }
                if (!validateName($('#name').val())) {
                    $('#name').focus().blur().focus();
                }
            }
        });

        addValidation();

        $('#edit-modal').show();
    });

    // 'Delivery option (empty, city, country)' change handler
    $('#delivery-type-select').change(function() {
        switch ($(this).val()) {
            case '':
                $('#delivery-country-radio-group').addClass('invisible');
                $('#delivery-city-checkbox-group').addClass('invisible');
                break;
            case 'country':
                $('#delivery-country-radio-group').removeClass('invisible');
                $('#delivery-city-checkbox-group').addClass('invisible');
                break;
            case 'city':
                $('#delivery-country-radio-group').addClass('invisible');
                $('#delivery-city-checkbox-group').removeClass('invisible');
                break;
            default:
                throw new Error('Unknown option value');
        }
    });

    // 'Select All' change handler
    $('#select-all-checkbox').change(function() {
        if ($(this).first().prop('checked')) {
            $('input[type=checkbox]').prop('checked', true);
        }
    });

    // 'City checkbox' change handler
    $('input[type=checkbox]:not(#select-all-checkbox)').change(function() {
        var selectAllCheckbox = $('#select-all-checkbox');
        if (!selectAllCheckbox.prop('checked')) {
            return;
        }

        $(this).each(function() {
            if (!$(this).prop('checked')) {
                selectAllCheckbox.prop('checked', false);
            }
        });
    });

    // search by name
    $('#search-button').on('click', function(e) {
        e.preventDefault();

        var filterString = $('input[id="search"]').last().val().toLowerCase();

        clearTable();

        for (var id in window.products) {
            var product = products[id];
            if (~product.name.toLowerCase().indexOf(filterString)) {
                addRowIntoTable(product); // TODO product.row
            }
        }
        addEventListenersToAllRows();
    });

    // returns table rows as array of { row-id, row-data }
    function getTableRows() {
        var trs = [];
        $('tr:has(td)').each(function() {
            var tr = $(this).clone(true);
            // 'tr-id' => 'id'
            trs.push({
                id: tr.data('product-id'),
                data: tr
            });
        });
        return trs;
    }

    // inserts rows to table from array of { row-id, row-data }
    function setTableRows(trs) {
        trs.forEach(function(tr) {
            $('tbody').append(tr.data);
        });
    }

    // row sorting (by name and by price)
    $('th[data-column-name]').on('click', function() {
        var columnName = $(this).data().columnName;

        // exclude actions column
        if (columnName == 'actions') {
            return;
        }

        // table rows with their ids // array of { id: row-id, data: row-data }
        var trs = getTableRows();

        // sorting trs
        var ps = window.products;
        trs.sort(function(f_tr, s_tr) {
            var f_id = f_tr.id;
            var s_id = s_tr.id;

            if (ps[f_id][columnName] < ps[s_id][columnName]) {
                return -1;
            }
            if (ps[f_id][columnName] > ps[s_id][columnName]) {
                return 1;
            }
            return 0;
        });

        // if descending order then reverse trs
        if (!ascendingOrderOfSortingBy[columnName]) {
            trs.reverse();
        }

        // clear table body
        clearTable();

        // add rows to table body
        setTableRows(trs);

        // toggle sorting order arrow direction
        $('th[data-column-name="' + columnName + '"]').children().last().toggleClass('rotate180deg');

        // toggle sorting order
        ascendingOrderOfSortingBy[columnName] = !ascendingOrderOfSortingBy[columnName];
    });

    // adds new product into products and table; adds event handlers to rows
    function addIntoTable(product) {
        window.products[product.id] = product;
        addRowIntoTable(product);
        addEventListenersToAllRows();
    }

    // adds new row into table
    function addRowIntoTable(product) {
        var newRow = $('<tr></tr>').html(EMPTY_ROW_HTML);

        newRow.attr('data-product-id', product.id); // because of tr selecting in updateTableRow | maybe Product.prototype.row???
        // newRow.data('product-id', product.id);

        $('tbody').append(newRow);

        updateTableRow(product);
    }

    // updates table row with new-product by new-product-id
    function updateTableRow(newProduct) {
        var tr = $('[data-product-id="' + newProduct.id + '"]');
        tr.find('a').text(newProduct.name);
        tr.find('span.badge').text(newProduct.count);
        tr.find('[data-column-name="price"]').text(getFormattedPrice(newProduct.price));
    }

    function addEventListenersToAllRows() {
        // delete button
        $('[data-click-event="delete"]').off('click').on('click', function() {
            console.log('delete clicked');

            $('html, body').css('overflow', 'hidden');

            var row = $(this).parents('tr');
            var product = window.products[row.data('product-id')];

            // making delete-modal text
            $('#delete-modal').find('h4').html('Вы действительно хотите<br>удалить "' + product.name + '"?');

            // add event handler
            $('#yes-button').off('click').on('click', function() {
                // deleting from tbody
                row.remove();

                // deleting the product
                delete window.products[product.id];

                $('html, body').css('overflow', 'auto');

                $('#delete-modal').hide();
            });

            $('#delete-modal').show(); // .css('display', 'block');
        });

        // edit button
        $('[data-click-event="edit"]').off('click').on('click', function() {
            console.log('edit clicked');

            $('html, body').css('overflow', 'hidden');

            var product = window.products[$(this).parents('tr').data('product-id')];

            // reseting form
            clearForm();

            $('#add-update-button').text('Update');

            // fill form fields
            fillForm(product);

            // making event handler for update-button
            $('#add-update-button').off('click').on('click', function() {
                var valid = validateName($('#name').val()) &&
                    emailValidation($('#supplier-email').val()).valid &&
                    validateCount($('#count').val()) &&
                    validateFormattedPrice($('#price').val());

                if (valid) {
                    var delivery = { type: $('#delivery-type-select').val() };
                    switch (delivery.type) {
                        case '':
                            break;
                        case 'country':
                            delivery.value = $('input[type=radio]:checked').val();
                            break;
                        case 'city':
                            var chechboxValues = [];
                            $('input[type=checkbox]:not(#select-all-checkbox):checked').each(function() {
                                chechboxValues.push($(this).val());
                            });
                            delivery.value = chechboxValues;
                            break;
                        default:
                            throw new Error('Unknown delivery type: ' + delivery.type);
                    }

                    var price = +getUnformattedPrice($('#price').val());

                    var newProductData = {
                        id: product.id,
                        name: $('#name').val(),
                        supplierEmail: $('#supplier-email').val(),
                        count: $('#count').val(),
                        price: price,
                        delivery: delivery
                    };

                    window.products[newProductData.id].update(newProductData);

                    // update table row
                    updateTableRow(newProductData);

                    $('html, body').css('overflow', 'auto');

                    $('#edit-modal').hide();
                } else {
                    // no valid
                    if (!validateEmail($('#supplier-email').val())) {
                        $('#supplier-email').focus().blur().focus();
                    }
                    if (!validateName($('#name').val())) {
                        $('#name').focus().blur().focus();
                    }
                }
            });

            addValidation();

            // show modal dialog
            $('#edit-modal').show();
        });

        // view product info link
        $('[data-click-event="view"]').off('click').on('click', function(e) {
            console.log('view clicked');

            // prevent scroll to the # anchor (top)
            e.preventDefault();

            $('html, body').css('overflow', 'hidden');

            var product = window.products[$(this).parents('tr').data('product-id')];

            // reseting form
            clearForm();

            $('#add-update-button').text('OK');

            // fill form fields
            fillForm(product);

            // making event handler for update-button
            $('#add-update-button').off('click').on('click', function() {
                $('html, body').css('overflow', 'auto');
                $('#edit-modal').hide();
            });

            // disable all 
            disableEditModal();

            // show modal dialog
            $('#edit-modal').show();
        });
    }

    // disable all inputs of edit-modal
    function disableEditModal() {
        var selector = ['name', 'supplier-email', 'count', 'price', 'delivery-type', 'country', 'city'].map(function(name) {
            return '[name="' + name + '"]';
        }).join(',');

        $(selector).prop('disabled', true);

        // $('[name="name"], [name="supplier-email"], [name="count"], [name="price"], [name="delivery-type"], [name="country"], [name="city"]').prop('disabled', true);
    }

    // enable all inputs of edit-modal
    function enableEditModal() {
        $('[name="name"], [name="supplier-email"], [name="count"], [name="price"], [name="delivery-type"], [name="country"], [name="city"]').prop('disabled', false);
    }

    // clears table body (without header (th-s))
    function clearTable() {
        var headerRow = $('tr').first().clone(true);
        var tbody = $('tbody');
        tbody.empty();
        tbody.append(headerRow);
    }

    // clears table and adds each product of window.products into table
    function showAllProducts() {
        clearTable();

        for (var id in window.products) {
            var product = products[id];
            addRowIntoTable(product);
        }

        addEventListenersToAllRows();
    }

    // table initialization
    showAllProducts();
});

// TODO fix caret position changing in price input (and maybe in count input)
// TODO delete shift when opening modal // LOOK AT myinstaspace.ru

// sorting order signs &#9661 == '\u25BD'; ++ &#8420; == \u20E4 ++  &#9651; == \u25B3    \u20E4 \u2206 \u25B3 &#x25B3;