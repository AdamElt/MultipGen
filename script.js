/*
File: script.js
GUI Assignment: Multiplication Table
Adam El-Telbani, UMass Lowell Computer Science, Adam_ElTelbani@student.uml.edu
Copyright (c) 2024 by Adam. All rights reserved. May be freely copied or
excerpted for educational purposes with credit to the author.
updated by Adam on June 16th, 2024 at 8:20PM
*/

$(document).ready(function() {
    // Initialize sliders
    $('#minColSlider, #maxColSlider, #minRowSlider, #maxRowSlider').slider({
        range: 'min',
        min: -50,
        max: 50,
        value: 0,
        slide: function(event, ui) {
            $(this).siblings('.slider-label').text(ui.value);
            $(this).siblings('input[type="hidden"]').val(ui.value);
            generateTable();
        }
    });

    // Validate form using jQuery Validation Plugin
    $('#rangeForm').validate({
        rules: {
            minCol: {
                required: true,
                number: true,
                range: [-50, 50]
            },
            maxCol: {
                required: true,
                number: true,
                range: [-50, 50]
            },
            minRow: {
                required: true,
                number: true,
                range: [-50, 50]
            },
            maxRow: {
                required: true,
                number: true,
                range: [-50, 50]
            }
        },
        messages: {
            minCol: {
                required: "Please enter a value.",
                number: "Please enter a valid number.",
                range: "Value must be between -50 and 50."
            },
            maxCol: {
                required: "Please enter a value.",
                number: "Please enter a valid number.",
                range: "Value must be between -50 and 50."
            },
            minRow: {
                required: "Please enter a value.",
                number: "Please enter a valid number.",
                range: "Value must be between -50 and 50."
            },
            maxRow: {
                required: "Please enter a value.",
                number: "Please enter a valid number.",
                range: "Value must be between -50 and 50."
            }
        },
        errorElement: 'div',
        errorPlacement: function(error, element) {
            error.addClass('alert alert-danger mt-1');
            error.appendTo(element.parent());
        },
        submitHandler: function(form) {
            generateTable();
            return false; // Prevent form submission
        }
    });

    // Generate Table Function
    function generateTable() {
        // Clear previous error messages
        $('#errorContainer').empty();

        // Get Input Values
        let minCol = parseInt($('#minCol').val());
        let maxCol = parseInt($('#maxCol').val());
        let minRow = parseInt($('#minRow').val());
        let maxRow = parseInt($('#maxRow').val());

        // Validate input
        if (minCol > maxCol || minRow > maxRow) {
            displayError('Minimums cannot be greater than maximums.');
            return;
        }

        // Create Table Element
        let table = $('<table>').addClass('table table-bordered');

        // Create Table Rows and Columns
        for (let row = minRow - 1; row <= maxRow; row++) {
            let tr = $('<tr>');
            for (let col = minCol - 1; col <= maxCol; col++) {
                let td = $('<td>');

                if (row === minRow - 1 && col === minCol - 1) {
                    td.addClass('top-left-cell');
                } else if (row === minRow - 1 || col === minCol - 1) {
                    td.addClass('header-cell');
                    if (row === minRow - 1) {
                        td.text(col);
                    }
                    if (col === minCol - 1) {
                        td.text(row);
                    }
                } else {
                    td.text(row * col);
                }

                tr.append(td);
            }

            table.append(tr);
        }

        // Clear existing table and append new one
        $('#tableContainer').empty().append(table);
    }

    // Display error message
    function displayError(message) {
        $('#errorContainer').html('<div class="alert alert-danger mt-1">' + message + '</div>');
    }

    // Initialize tabs
    $('#tabs').tabs();

    // Handle Save Table button click
    $('.save-table').click(function(event) {
        event.preventDefault();
        saveTable();
    });

    let tabCount = 0;

    function saveTable() {
        tabCount++;
        const tabTitle = 'Tab ' + tabCount;
        const tableContent = $('#tableContainer').html(); // Get the generated table HTML

        // Create the new tab
        const tabId = 'tabs-' + tabCount;
        $('#tabs ul').append('<li><a href="#' + tabId + '">' + tabTitle + '</a></li>');
        $('#tabs').append('<div id="' + tabId + '" class="tab-content">' + tableContent + '</div>');

        // Refresh the tabs widget to recognize the new tab
        $('#tabs').tabs('refresh');
        $('#tabs').tabs('option', 'active', tabCount - 1);
    }
});
