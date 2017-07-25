$(document).ready(function() {
    // invisible hidden
    // $(body).children.off();

    $('#no-button').click(function() {
        // $('#delete-modal').css('display', 'none');
        $("html,body").css("overflow", "auto");

        $('#delete-modal').hide();
    });

    // close modal
    $('#close-button').click(function() {
        $("html,body").css("overflow", "auto"); // TODO

        // $("html,body").css('margin-right', '0px');

        $('#edit-modal').css('display', 'none');
        enableEditModal();
    });

    function clearForm() {
        document.getElementById('add-update-form').reset();

        $('#name').removeClass('input-highlighting');
        $('#supplier-email').removeClass('input-highlighting');
        $('#count').removeClass('input-highlighting');

        $('.help-block').text('');
    }

    function validateName(name) {
        return 0 < name.length && name.length <= 15 && !/^ +$/.test(name);
    }

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

    function validateEmail(email) {
        var symbols = '([\\w.-])+';
        var domain = '([a-zA-Z]){2,3}';
        var regexp = '^' + symbols + '@' + symbols + '\\.' + domain + '$';

        return new RegExp(regexp).test(email);
    }

    function emailValidation(email) {
        // if (email == '') {
        //     return {
        //         valid: true
        //     }
        // }
        return {
            valid: validateEmail(email),
            message: SUPPLIER_EMAIL_HELP_TEXT
        };
    }

    function validateCount(count) {
        var re = /^\d+$/;
        return count == '' || re.test(count);
    }

    function validatePrice(price) {
        var re = /^[\d\.]+$/;
        return price == '' || re.test(price); // !isNaN()
    }

    function validateFormattedPrice(formattedPrice) {
        // if (formattedPrice == '') {
        //     return true;
        // }
        // $12,345,678.98
        // /(([0-9]){1,2})/;
        // /(([0-9]){1,2}\,)(([0-9]){3}\,)*(([0-9]){3})/;
        // /(([0-9]){1,2})|((([0-9]){1,2}\,)(([0-9]){3}\,)*(([0-9]){3}))/;

        var leftPartWithoutCommas = '([0-9]){1,2}';
        var leftPartWithCommas = '(([0-9]){1,2}\\,)(([0-9]){3}\\,)*(([0-9]){3})';
        var leftPart = '(' + leftPartWithoutCommas + '|' + leftPartWithCommas + ')';
        var rightPart = '(\\.([0-9]){1,2})?';
        var regexp = '^\\$' + leftPart + rightPart + '$';
        return formattedPrice == '' || new RegExp(regexp).test(formattedPrice);
        // return (new RegExp('^\$' + leftPartWithoutCommas + rightPart + '$').test(formattedPrice)) ||
        //     (new RegExp('^\$' + leftPartWithCommas + rightPart + '$').test(formattedPrice));

        // return /^\$([0-9]){1,2}(\.([0-9]){1,2})?$/.test(formattedPrice);

        // var re = /^\$  (([0-9]){1,2}\,)?(([0-9]){3}\,)*  (\.([0-9]){1,2})?$/;
        // return re.test(formattedPrice);
    }

    function addValidation() {

        // email validation
        // on focus
        var firstNameFocus = true;
        $('#name').off();
        $('#name').focus(function() {
            // alert('#name focused');
            // console.log('#supplier-email focused');
            if (firstNameFocus) {
                firstNameFocus = !firstNameFocus;
                return;
            }

            var validation = nameValidation($(this).val());
            if (!validation.valid) {
                // console.log('highlighting');
                $(this).addClass('input-highlighting');
                $('#name-help-block').text(BLACK_CIRCLE + ' ' + validation.message);
            } else {
                $(this).removeClass('input-highlighting');
                $('#name-help-block').text('');
            }
        });
        // on blur

        $('#name').blur(function() {
            // alert('#name blurred');
            // console.log('#supplier-email blurred');

            var validation = nameValidation($(this).val());
            if (!validation.valid) {
                // console.log('highlighting');
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
            // alert('#name focused');
            // console.log('#supplier-email focused');
            if (firstSupplierEmailFocus) {
                firstSupplierEmailFocus = !firstSupplierEmailFocus;
                return;
            }

            var validation = emailValidation($(this).val());
            if (!validation.valid) {
                // console.log('highlighting');
                $(this).addClass('input-highlighting');
                $('#supplier-email-help-block').text(BLACK_CIRCLE + ' ' + validation.message);
            } else {
                $(this).removeClass('input-highlighting');
                $('#supplier-email-help-block').text('');
            }
        });
        // on blur
        $('#supplier-email').blur(function() {
            // alert('#name blurred');
            // console.log('#supplier-email blurred');

            var validation = emailValidation($(this).val());
            if (!validation.valid) {
                // console.log('highlighting');
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
            // e.preventDefault();
            // e.which
            // $(this).val(e.type + ' ' + e.value);
            var pasteData = e.originalEvent.clipboardData.getData('Text');
            // if (!validateCount(pasteData)) {
            //     return false;
            // }
            return validateCount(pasteData);
        });

        // $('#count').on('input', function() {
        //     $(this).val($(this).val().replace(/\D/, ''));
        // });

        $('#count').keypress(function(e) {
            var e = e || window.event;
            var keyCode = e.keyCode || e.which;
            var key = String.fromCharCode(keyCode);
            // if (!validateCount(key)) { // /\d/
            //     // e.preventDefault();
            //     return false;
            // }
            return validateCount(key);
        });

        // price validation
        $('#price').off();
        // $('#price').on('input', function() {
        //     $(this).val($(this).val().replace(/[^0-9\.]/, ''));
        // });
        $('#price').on('paste', function(e) {
            var pasteData = e.originalEvent.clipboardData.getData('Text');
            // if (!validatePrice(pasteData)) {
            //     return false;
            // }
            return validatePrice(pasteData);
        });

        $('#price').keypress(function(e) {
            var e = e || window.event;
            var keyCode = e.keyCode || e.which;
            var key = String.fromCharCode(keyCode);
            // if (!validatePrice(key)) { // !/\d|\./.test(key)
            //     // e.preventDefault();
            //     return false;
            // }
            return validatePrice(key);
            // TODO add isNaN on input.val()???
        });

        $('#price').focus(function() {
            var price = $(this).val();
            if (price) {
                // delete all commas and dollar sign
                $(this).val(getUnformattedPrice(price));
                // price.replace(/\,|\$/g, '')
            }

            console.log('caret position: ', $(this).selectionStart);
            // TODO add vertical lines in edit form
            // TODO delete shift when opening modal // LOOK AT myinstaspace.ru
        });
        $('#price').blur(function() {
            var price = $(this).val();
            if (!price) {
                // $(this).val('$0');
                return;
            }
            $(this).val(getFormattedPrice($(this).val()));
            // var parts = $(this).val().split('.');
            // var mainPart = '$' + reverseString(reverseString(parts[0]).match(/.{1,3}/g).join(','));
            // $(this).val(mainPart + (parts[1] ? '.' + parts[1].substr(0, 2) : ''));
        });
    }

    function getFormattedPrice(unformattedPrice) {
        var parts = unformattedPrice.toString().split('.');
        var leftPart = '$' + reverseString(reverseString(parts[0]).match(/.{1,3}/g).join(','));
        return leftPart + (parts[1] ? '.' + parts[1].substr(0, 2) : '');
    }

    function getUnformattedPrice(formattedPrice) {
        return formattedPrice.replace(/[\,\$]/g, '');
    }

    // add new product 
    $('#add-new-button').click(function() {
        // console.log('add-new-button pressed');

        $("html,body").css("overflow", "hidden");
        // $("body").css("margin-right", "20px");
        // $("html,body").css("overflow-y", "scroll");
        // $("html,body").css({
        //     "overflow": "hidden",
        //     "margin": "0",
        //     "height": "100%"
        // });
        // $("html").css('margin-right', '0px');

        // clearing form
        clearForm();

        $('#add-update-button').text('Add');

        $('#delivery-country-radio-group').addClass('invisible');
        $('#delivery-city-checkbox-group').addClass('invisible');

        // making event handler for add-button
        $('#add-update-button').off('click');
        $('#add-update-button').click(function() {
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

                $("html,body").css("overflow", "auto");

                $('#edit-modal').css('display', 'none'); // hide()
            } else {
                // no valid
                // var validation = nameValidation($('#name').val());
                // if (!validation.valid) {
                //     $('#name').focus();
                // }
                if (!validateEmail($('#supplier-email').val())) {
                    $('#supplier-email').focus().blur().focus();
                }
                if (!validateName($('#name').val())) {
                    $('#name').focus().blur().focus();
                }
            }
        });

        addValidation();

        $('#edit-modal').css('display', 'block');
    });

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

    $('#select-all-checkbox').change(function() {
        if ($(this).first().prop('checked')) {
            $('input[type=checkbox]').prop('checked', true);
        }
    });

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
    $('#search-button').click(function(e) {
        e.preventDefault();
        // console.log('search button pressed');
        // alert('search button pressed');

        var filterString = $('input[id="search"]').last().val().toLowerCase();

        clearTable();

        for (var id in window.products) {
            var product = products[id];
            if (~product.name.toLowerCase().indexOf(filterString)) {
                addRowIntoTable(product);
                addEventsTo(product);
            }
        }
    });

    function getTableRows() {
        var trs = [];
        $('tr:has(td)').each(function() {
            var tr = $(this).clone(true);
            // 'tr-id' => 'id'
            trs.push({
                id: tr.attr('id').substr(3),
                data: tr
            });
        });
        return trs;
    }

    function setTableRows(trs) {
        trs.forEach(function(tr) {
            $('tbody').append(tr.data);
            // addEventsTo(ps[tr.id]);
        });
    }

    // sorting by name
    $('tr>th:nth-child(1)').click(function() {
        // table rows with their ids
        var trs = getTableRows();

        // sorting trs
        var ps = window.products;
        trs.sort(function(f_tr, s_tr) {
            var f_id = f_tr.id;
            var s_id = s_tr.id;

            if (ps[f_id].name < ps[s_id].name) {
                return -1;
            }
            if (ps[f_id].name > ps[s_id].name) {
                return 1;
            }
            return 0;
        });

        // if descending order then reverse trs
        if (!ascendingOrderOfSortingByName) {
            trs.reverse();
        }

        // clear table body
        clearTable();

        // add rows to table body
        setTableRows(trs);
        // trs.forEach(function(tr) {
        //     $('tbody').append(tr.data);
        //     // addEventsTo(ps[tr.id]);
        // });

        // change sorting order sign &#9661 == '\u25BD'; ++ &#8420; == \u20E4 ++  &#9651; == \u25B3     \u20E4 \u2206  \u25B3   '&#x25B3;'
        // fromCodePoint(194564)  String.fromCharCode('25B3')  String.fromCharCode(8420)
        // var sign = (ascendingOrderOfSortingByName) ? '\u25BD' : '\u20E4';
        $('tr>th:nth-child(1)').children().last().toggleClass('rotate180deg');

        // change sorting order
        ascendingOrderOfSortingByName = !ascendingOrderOfSortingByName;
    });

    // sorting by price
    $('tr>th:nth-child(2)').click(function() {
        // table rows with their ids
        var trs = getTableRows();

        // sorting trs
        var ps = window.products;
        trs.sort(function(f_tr, s_tr) {
            var f_id = f_tr.id;
            var s_id = s_tr.id;

            if (ps[f_id].price < ps[s_id].price) {
                return -1;
            }
            if (ps[f_id].price > ps[s_id].price) {
                return 1;
            }
            return 0;
        });

        // if descending order then reverse trs
        if (!ascendingOrderOfSortingByPrice) {
            trs.reverse();
        }

        // clear table body
        clearTable();

        // add rows to table body
        setTableRows(trs);
        // trs.forEach(function(tr) {
        //     $('tbody').append(tr.data);
        //     // addEventsTo(ps[tr.id]);
        // });
        $('tr>th:nth-child(2)').children().last().toggleClass('rotate180deg');

        // change sorting order
        ascendingOrderOfSortingByPrice = !ascendingOrderOfSortingByPrice;
    });

    function addIntoTable(product) {
        // window.products.push(product);
        window.products[product.id] = product;
        addRowIntoTable(product);
        addEventsTo(product);
    }

    function addRowIntoTable(product) {
        var newRow = $('<tr></tr>').html(
            '<td><a href="#" class="text-info">' + product.name + '</a><span class="badge">' + product.count + '</span></td>' +
            '<td>' + getFormattedPrice(product.price) + '</td>' +
            '<td>' +
            '<div class="row">' +
            '<div class="col-md-2 col-md-offset-4 col-xs-3 col-xs-offset-3">' +
            '<button id="edit-button-' + product.id + '" class="btn btn-default">Edit</button>' +
            '</div>' +
            '<div class="col-md-2 col-xs-3">' +
            '<button id="delete-button-' + product.id + '" class="btn btn-default">Delete</button>' +
            '</div>' +
            '</div>' +
            '</td>');
        newRow.attr('id', 'tr-' + product.id);
        $('tbody').append(newRow);
    }

    function updateTableRow(newProduct) {
        var tr = $('#tr-' + newProduct.id);
        tr.find('a').text(newProduct.name);
        tr.find('span.badge').text(newProduct.count);
        tr.find('td:nth-child(2)').text(getFormattedPrice(newProduct.price));
    }

    function addEventsTo(product) {

        $('#delete-button-' + product.id).click(function() {
            $("html, body").css("overflow", "hidden");

            // making delete-modal text
            $('#delete-modal').find('h4').html('Вы действительно хотите<br>удалить "' + product.name + '"?');

            // deleting all event handlers
            $('#yes-button').off('click');

            // add event handler
            $('#yes-button').click(function() {
                //deleting from tbody
                // $('tr:has(button[id="delete-button-' + id + '"])').remove();
                $('tr[id="tr-' + product.id + '"]').remove();

                // deleting the product
                delete window.products[product.id];

                $('#delete-modal').css('display', 'none'); // hide()
            });

            $('#delete-modal').css('display', 'block'); // show()
        });

        $('#edit-button-' + product.id).click(function() {
            $("html,body").css("overflow", "hidden");

            // reseting form
            // document.getElementById('add-update-form').reset();
            clearForm();

            $('#add-update-button').text('Update');

            $('#delivery-country-radio-group').addClass('invisible');
            $('#delivery-city-checkbox-group').addClass('invisible');

            // fill form fields
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
                    // $(':radio[name=country]').filter('[value="' + delivery.value + '"]').prop('checked', true);
                    $(':radio[name=country][value="' + delivery.value + '"]').prop('checked', true);
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

            // making event handler for update-button
            $('#add-update-button').off('click');
            $('#add-update-button').click(function() {
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

                    var newProduct = {
                        id: product.id,
                        name: $('#name').val(),
                        supplierEmail: $('#supplier-email').val(),
                        count: $('#count').val(),
                        price: price,
                        delivery: delivery
                    };

                    var oldProduct = window.products[newProduct.id];
                    for (var key in newProduct) {
                        oldProduct[key] = newProduct[key];
                    }
                    // update table row
                    updateTableRow(newProduct);

                    $("html,body").css("overflow", "auto");

                    $('#edit-modal').css('display', 'none');
                } else {
                    // no valid
                    // var validation = nameValidation($('#name').val());
                    // if (!validation.valid) {
                    //     $('#name').focus();
                    // }
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
            $('#edit-modal').css('display', 'block');
        });

        $('#tr-' + product.id + ' a').click(function() {
            // reseting form
            // document.getElementById('add-update-form').reset();
            clearForm();

            $('#add-update-button').text('OK');

            $('#delivery-country-radio-group').addClass('invisible');
            $('#delivery-city-checkbox-group').addClass('invisible');

            // fill form fields
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
                    // $(':radio[name=country]').filter('[value="' + delivery.value + '"]').prop('checked', true);
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

            // making event handler for update-button
            $('#add-update-button').off('click');
            $('#add-update-button').click(function() {
                $('#edit-modal').css('display', 'none');
            });

            // disable all 
            disableEditModal();

            // show modal dialog
            $('#edit-modal').css('display', 'block');
        });
    }

    function disableEditModal() {
        $('#name').prop('disabled', true);
        $('#supplier-email').prop('disabled', true);
        $('#count').prop('disabled', true);
        $('#price').prop('disabled', true);
        $('#delivery-type-select').prop('disabled', true);
        $(':radio[name="country"]').prop('disabled', true);
        $(':checkbox[name="city"]').prop('disabled', true);
    }

    function enableEditModal() {
        $('#name').prop('disabled', false);
        $('#supplier-email').prop('disabled', false);
        $('#count').prop('disabled', false);
        $('#price').prop('disabled', false);
        $('#delivery-type-select').prop('disabled', false);
        $(':radio[name="country"]').prop('disabled', false);
        $(':checkbox[name="city"]').prop('disabled', false);
    }

    function clearTable() {
        var headerRow = $('tr').first().clone(true);
        var tbody = $('tbody');
        tbody.empty();
        tbody.append(headerRow);
    }

    function showAllProducts() {
        // console.log('showing all products');
        // alert('showing all products');
        clearTable();

        for (var id in window.products) {
            var product = products[id];
            addRowIntoTable(product);
            addEventsTo(product);
        }
    }

    showAllProducts();
});

// TODO vertical lines on edit-modal