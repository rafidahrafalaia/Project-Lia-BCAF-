   $(document).ready(function () {
            var validationSuccess = $("#validation-success");

            $("#exampleform").kendoForm({
                orientation: "vertical",
                formData: {
                    firstName: "johny",
                    lastName: "johny",
                    email: "john.doe@email.com",
                    password: "pass123"
                },
                items: [{
                    type: "group",
                    label: "Registration Form",
                    items: [
                        { field: "firstName", label: "First Name:", validation: { required: true } },
                        { field: "lastName", label: "Last Name:", validation: { required: true } },
                        { field: "email", label: "email:", validation: { required: true, email: true } },
                        {
                            field: "password",
                            label: "Password:",
                            validation: { required: true },
                            hint: "Hint: enter alphanumeric characters only.",
                            editor: function(container, options) {
                                container.append($("<input type='password' class='k-textbox k-valid' id='Password' name='Password' title='Password' required='required' autocomplete='off' aria-labelledby='Password-form-label' data-bind='value:Password' aria-describedby='Password-form-hint'>"));
                            }
                        }

                    ]
                }],
                validateField: function(e) {
                    validationSuccess.html("");
                },
                update: {url: "/api/updateProfile",
                                              dataType: "json",
                                              type: "POST",
                                              contentType: "application/json"
                                          },
                clear: function(ev) {
                    validationSuccess.html("");
                },
            });
        });