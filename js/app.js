document.addEventListener('DOMContentLoaded', () => {

    'use strict';

    const userData = document.getElementById('user_data'),
        nameField = document.getElementById('name'),
        emailField = document.getElementById('mail'),
        colorSelect = document.getElementById('colors-js-puns'),
        colorOptions = document.getElementById('color'),
        creditCard = document.getElementById('credit-card'),
        paypal = document.getElementById('paypal'),
        bitcoin = document.getElementById('bitcoin'),
        payment = document.getElementById('payment'),
        activities = document.getElementById('activities'),
        checkboxes = document.querySelectorAll('input[type=checkbox'),
        shirtSelection = document.getElementById('shirt'),
        activityLegend = document.getElementById('activity-legend'),
        otherInput = document.getElementById('other-title'),
        eventForm = document.getElementById('event-form'),

        heartJsOptions = new Set(),
        jsPunsOptions = new Set(),

        createElement = (element, id, classname, content = '') => {
            const el = document.createElement(element);
            el.id = id;
            el.className = classname;
            el.textContent = content;

            return el;
        },

        sortColorOptions = _ => {
            for (let i = 1; i < colorOptions.length; i++) {
                if (i < 4) {
                    jsPunsOptions.add(colorOptions[i]);
                } else {
                    heartJsOptions.add(colorOptions[i]);
                }
            }
        },

        displayColorOptions = {
            default () {
                for (let color of colorOptions) {
                    color.style.display = 'block';
                }
            },
            jsPuns () {
                for (let color of colorOptions) {
                    color.style.display = 'none';
                    if (jsPunsOptions.has(color)) {
                        color.style.display = 'block';
                    }
                }
            },
            heartJs () {
                for (let color of colorOptions) {
                    color.style.display = 'none';
                    if (heartJsOptions.has(color)) {
                        color.style.display = 'block';
                    }
                }
            }
        },

        paymentOptions = {
            credit_card () {
                creditCard.style.display = 'block';
                bitcoin.style.display = 'none';
                paypal.style.display = 'none';
            },
            paypal () {
                creditCard.style.display = 'none';
                bitcoin.style.display = 'none';
                paypal.style.display = 'block';
            },
            bitcoin () {
                creditCard.style.display = 'none';
                bitcoin.style.display = 'block';
                paypal.style.display = 'none';
            }
        },

        validate = {
            userData: {
                name () {
                    const nameFieldValue = nameField.value,
                        emptyFieldError = document.getElementById('empty-field-error');

                        if(!nameFieldValue) {
                            if (!emptyFieldError) {
                                console.log('No name value', nameFieldValue);
                                const nameError = createElement('p', 'empty-field-error', 'error', 'Field cannot be empty');
                                userData.insertBefore(nameError, nameField.nextElementSibling);
                            } 
                            return false;
                        } else {
                            if(emptyFieldError) {
                                emptyFieldError.remove();
                            } 
                            return true;
                        }
                },
                email () {
                    const emailFieldValue = emailField.value,
                        invalidEntryError = document.getElementById('invalid-entry-error'),
                        isValidEmail = /(.+)@(.+){2,}\.(.+){2,}/.test(emailFieldValue);

                    if (!isValidEmail && !invalidEntryError) {
                        const emailError = createElement('p', 'invalid-entry-error', 'error', 'You must enter a valid email address - ex. person@example.com.');
                        userData.insertBefore(emailError, emailField.nextElementSibling);
                        return false;
                    } else if (isValidEmail && invalidEntryError) {
                        invalidEntryError.remove();
                        return true;
                    }
                }
            },
            activities: {
                isChecked () {
                    for (let checkbox of checkboxes) {
                        if (checkbox.checked) {
                        console.log(checkbox);
                            return true;
                        }
                    }
                    return false;
                },
                checkboxes (e, runningTotal) {
                    let checkedBoxes = [];
                    let checkbox = e.target;

                    for (let i = 0; i < checkboxes.length; i++) {
                        if (checkboxes[i].checked) {
                            runningTotal += parseInt(checkboxes[i].value);
                        }

                        if (checkboxes[i].classList.contains(checkbox.classList)) {
                            checkedBoxes.push(checkboxes[i].name);
                        }
                    }

                    if (checkedBoxes.length > 1) {
                        const disable = (value) => {
                            return value !== checkbox.name;
                        };
                        let checkboxToDisable = checkedBoxes.filter(disable);
                        let conflictingTime = document.getElementById(checkboxToDisable);

                        if (conflictingTime.hasAttribute('disabled')) {
                            conflictingTime.removeAttribute('disabled');
                            conflictingTime.parentNode.style.color = "#000";
                        } else {
                            conflictingTime.setAttribute('disabled', 'disabled');
                            conflictingTime.parentNode.style.color = "#bbb";
                        }
                    }

                    totalSpan.textContent = runningTotal.toString();
                }
            },
            creditCard: {
                number () {
                    const ccNum = document.getElementById('cc-num'),
                        ccNumValue = ccNum.value,
                        ccNumError = document.getElementById('cc-num-error');

                    if (ccNumValue.length < 13 || ccNumValue.length > 16 || isNaN(ccNumValue)) {
                        if (!ccNumError) {
                            const ccNumError = createElement('div', 'cc-num-error', 'error cc-num-error', 'Sorry that is not a valid card number, please make sure you entered 13-16 digits and only characters 0-9');
                            creditCard.appendChild(ccNumError);
                            return false;
                        }
                    } else {
                        if (ccNumError) {
                            ccNumError.remove();
                        }
                        return true;
                    }
                },
                zipCode () {
                    const ccZip = document.getElementById('cc-zip'),
                        ccZipValue = ccZip.value,
                        zipError = document.getElementById('zip-error');

                    if (ccZipValue.length !== 5 || isNaN(ccZipValue)) {
                        if (!zipError) {
                            const zipError = createElement('div', 'zip-error', 'error zip-error', 'That is not a valid zip code, it must be exactly five digits and consists only of characters 0-9');
                            creditCard.appendChild(zipError);
                        }
                        return false;
                    } else {
                        if (zipError) {
                            zipError.remove();
                        }
                        return true;
                    }
                },
                cvv () {
                    const ccCvv = document.getElementById('cc-cvv'),
                        cvvValue = ccCvv.value,
                        cvvError = document.getElementById('cvv-error');

                    if (cvvValue.length !== 3 || isNaN(cvvValue)) {
                        if (!cvvError) {
                            const cvvError = createElement('div', 'cvv-error', 'error cvv-error', 'You must enter the 3 digit code on that back of your card.');
                            creditCard.appendChild(cvvError);
                        }
                        return false;
                    } else {
                        if (cvvError) {
                            cvvError.remove()
                        }
                        return true;
                    }
                }
            }
        },

        toggleShirtCollection = e => {
            let selectedValue = e.target.value;
            if (selectedValue === 'default') {
                colorSelect.style.display = 'none';
            } else {
                colorSelect.style.display = 'block';
                displayColorOptions[selectedValue]();
            }
        },

        toggleOtherInput = e => {
            let selectedValue = e.target.value;
            if (selectedValue === 'other') {
                otherInput.style.display = 'block';
            } else {
                otherInput.style.display = 'none';
            }
        },

        validateForm = _ => {
            if (
            validate.userData.name()
            && validate.userData.email()
            && validate.activities.isChecked()
            && validate.creditCard.number()
            && validate.creditCard.zipCode()
            && validate.creditCard.cvv()
            ) {
                return true;
            } else {
                validate.userData.name()
                validate.userData.email()
                validate.creditCard.number()
                validate.creditCard.zipCode()
                validate.creditCard.cvv()
            }
            return false;
        },

        // Create elements for activity total and checkbox instructions
        total = createElement('label', 'total-label', 'total-label', 'Total: $'),
        totalSpan = createElement('span', 'total', 'total', '0'),
        checkboxWarning = createElement('div', 'warning', 'warning', 'You must choose at least one activity.');

    // Set a variable to keep track of selected conferences dollar amount
    let runningTotal = 0;

    // Hide Inputs on load until user performs required action
    otherInput.style.display = 'none';
    colorSelect.style.display = 'none';
    paypal.style.display = 'none';
    bitcoin.style.display = 'none';

    // Append conference price total display to total div
    // Append total div to DOM
    // Append checkbox instructions to checkbox area
    total.appendChild(totalSpan);
    activities.appendChild(total);
    activityLegend.appendChild(checkboxWarning);

    // Focus input on namefield onload
    nameField.focus();

    // Apply filter to color option select
    // Apply filter to payment options
    sortColorOptions();

    payment.addEventListener('change', e => {
        const selectedValue = e.target.value;
        paymentOptions[selectedValue]();
    });

    userData.addEventListener('change', e => {
        toggleOtherInput(e);
    }, true);

    shirtSelection.addEventListener('change', e => {
        toggleShirtCollection(e);
    }, true);

    activities.addEventListener('change', e => {
        validate.activities.checkboxes(e, runningTotal);
    });

    eventForm.addEventListener('submit', e => {
        let isValid = validateForm();
        validate.activities.isChecked();
        if(!isValid) {
            console.log("Invalid Form");
            e.preventDefault();
        }
    });
});
