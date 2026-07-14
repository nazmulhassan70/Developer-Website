function initFormValidation() {

    function showAlert(selector, duration = 4000) {
        const $alert = $(selector);
        $alert.removeClass("hidden");
        setTimeout(() => $alert.addClass("hidden"), duration);
    }

    function isFormValid($form) {
        let valid = true;

        $form.find("input, textarea").each(function () {
            if ($(this).val().trim() === "") {
                valid = false;
                return false;
            }
        });

        return valid;
    }

    function resetForm($form) {
        $form[0].reset();
    }

    $("#notify-form")
        .find('button[type="button"]')
        .on("click", function () {
            const $form = $("#notify-form");

            if (isFormValid($form)) {
                resetForm($form);
                showAlert(".success-message-notify");
            } else {
                showAlert(".error-message-notify");
            }
        });

    $("#contact-form").on("submit", function (e) {
        e.preventDefault();

        const $form = $(this);

        if (isFormValid($form)) {
            resetForm($form);
            showAlert(".success-message-contact");
        } else {
            showAlert(".error-message-contact");
        }
    });

    $("#newsletter-form")
        .find('button[type="button"]')
        .on("click", function () {
            const $form = $("#newsletter-form");

            if (isFormValid($form)) {
                resetForm($form);
                showAlert(".success-message-newsletter");
            } else {
                showAlert(".error-message-newsletter");
            }
        });

    $("#service-detail__form").on("submit", function (e) {
        e.preventDefault();

        const $form = $(this);

        if (isFormValid($form)) {
            resetForm($form);
            showAlert(".success-message-service");
        } else {
            showAlert(".error-message-service");
        }
    });
}

$(document).ready(function () {
    initFormValidation();
});