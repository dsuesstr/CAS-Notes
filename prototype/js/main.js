$(document).ready(function() {
    $('#note-priority-ranking').ranking({
        matchElement : 'i',
        value: 3,
        activeClass: 'note-priority-active',
        inactiveClass: 'note-priority-inactive',
        callbackFunction : function(value) {
            $('.note-priority-value').text(value);
            ranking = value;
        }
    });

    var foregroundColor = loadLocalStorageValue('notes-foreground', '#000000');
    var backgroundColor = loadLocalStorageValue('notes-background', '#ffffff');
    var foregroundPicker = $('#notes-foreground');
    var backgroundPicker = $('#notes-background');

    foregroundPicker.val(foregroundColor);
    backgroundPicker.val(backgroundColor);

    changeForeground(foregroundColor);
    changeBackground(backgroundColor);

    backgroundPicker.on('change', function() {
        var color = $(this).val();
        changeBackground(color);
        saveLocalStorageValue('notes-background', color);
    });

    foregroundPicker.on('change', function() {
        var color = $(this).val();
        changeForeground(color);
        saveLocalStorageValue('notes-foreground', color);
    });

    var noteItems = loadLocalStorageValue('notes', []);
    saveLocalStorageValue(noteItems);

    document.getElementById('note-duedate').valueAsDate = new Date();
});