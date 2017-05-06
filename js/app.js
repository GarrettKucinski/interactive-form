'use strict';

const userData = document.getElementById('user_data'),
    nameField = document.getElementById('name'),
    emailField = document.getElementById('mail'),
    titleSelect = document.getElementById('title'),
    colorSelect = document.getElementById('colors-js-puns'),
    colorOptions = document.getElementById('color'),
    designSelect = document.getElementById('design'),
    creditCard = document.getElementById('credit-card'),
    paypal = document.getElementById('paypal'),
    bitcoin = document.getElementById('bitcoin'),
    payment = document.getElementById('payment'),
    activities = document.getElementById('activities'),
    checkboxes = document.querySelectorAll('input[type=checkbox'),

    heartJsOptions = new Set(),
    jsPunsOptions = new Set(),

    createElement = (element, id, classname, content = '') => {
        const el = document.createElement(element);
        el.id = id;
        el.className = classname;
        el.textContent = content;

        return el;
    },

    sortColorOptions = () => {
        for (let i = 1; i < colorOptions.length; i++) {
            if (i < 4) {
                jsPunsOptions.add(colorOptions[i]);
            } else {
                heartJsOptions.add(colorOptions[i]);
            }
        }
    },

    displayColorOptions = {
        default: () => {
            for (let color of colorOptions) {
                color.style.display = 'block';
            }
        },
        jsPuns: () => {
            for (let color of colorOptions) {
                color.style.display = 'none';
                if (jsPunsOptions.has(color)) {
                    color.style.display = 'block';
                }
            }
        },
        heartJs: () => {
            for (let color of colorOptions) {
                color.style.display = 'none';
                if (heartJsOptions.has(color)) {
                    color.style.display = 'block';
                }
            }
        }
    },

    paymentOptions = {
        credit_card: () => {
            creditCard.style.display = 'block';
            bitcoin.style.display = 'none';
            paypal.style.display = 'none';
        },
        paypal: () => {
            creditCard.style.display = 'none';
            bitcoin.style.display = 'none';
            paypal.style.display = 'block';
        },
        bitcoin: () => {
            creditCard.style.display = 'none';
            bitcoin.style.display = 'block';
            paypal.style.display = 'none';
        }
    },

    displayPaymentInfo = () => {
        paypal.style.display = 'none';
        bitcoin.style.display = 'none';

        payment.addEventListener('change', (e) => {
            const selectedValue = e.target.value;
            paymentOptions[selectedValue]();
        });
    },

    validate = {
        name: (input) => {
            const nameError = document.getElementById('name-error');
            if (!input && !nameError) {
                const nameError = createElement('p', 'name-error', 'error', 'Field cannot be empty');
                userData.insertBefore(nameError, nameField.nextElementSibling);
            } else if (input && nameError) {
                nameError.remove();
            }
        },
        email: (input) => {
            const invalidEntryError = document.getElementById('invalid-entry-error');
            const emptyFieldError = document.getElementById('empty-field-error');
            const isValidEmail = /(.+)@(.+){2,}\.(.+){2,}/.test(emailField.value);

            if (input) {
                if (!isValidEmail && !invalidEntryError) {
                    const emailError = createElement('p', 'invalid-entry-error', 'error', 'You must enter a valid email address.');
                    userData.insertBefore(emailError, emailField.nextElementSibling);
                    if (emptyFieldError) {
                        emptyFieldError.remove();
                    }
                } else if (isValidEmail && invalidEntryError) {
                    invalidEntryError.remove();
                }
            } else if (!emptyFieldError) {
                const emailError = createElement('p', 'empty-field-error', 'error', 'Field cannot be empty');
                userData.insertBefore(emailError, emailField.nextElementSibling);
                if (invalidEntryError) {
                    invalidEntryError.remove();
                }

            }
        },
        activities: () => {

        }
    },

    validateForm = () => {
        nameField.addEventListener('blur', () => {
            validate.name(nameField.value);
        });

        emailField.addEventListener('blur', () => {
            validate.email(emailField.value);
        });
    };

sortColorOptions();
displayPaymentInfo();
validateForm();

const otherInput = document.getElementById('other-title');
otherInput.style.display = 'none';

titleSelect.addEventListener('change', (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === 'other') {
        otherInput.style.display = 'block';
    } else {
        otherInput.style.display = 'none';
    }
});

colorSelect.style.display = 'none';

designSelect.addEventListener('change', (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === 'default') {
        colorSelect.style.display = 'none';
    } else {
        colorSelect.style.display = 'block';
        displayColorOptions[selectedValue]();
    }
});

nameField.focus();

activities.addEventListener('change', (e) => {
    let checkbox = e.target;
    const checkedBoxes = [];

    for (let i = 0; i < checkboxes.length; i++) {
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
        } else {
            conflictingTime.setAttribute('disabled', 'disabled');
        }
    }
});