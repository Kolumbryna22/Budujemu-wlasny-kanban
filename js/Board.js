var board = {
    name: 'Kanban Board',
    createColumn: function(column) {
        this.$element.append(column.$element);
        initSortable(this, '/card/', '.column-card-list', 'card-placeholder');
        initSortable(this, '/column/', '.column-container', 'column-placeholder');
    },
    $element: $('#board .column-container'),
};

function initSortable(element, type, element, placeholder) {
    $(element).sortable({
        connectWith: element,
        placeholder: placeholder
    }).disableSelection();

    $.ajax({
        url: baseUrl + type + element.id,
        method: 'PUT',
        success: function(response) {
            element.id = response.id;
        }
    })
};

$('.btn-create-column').click(function() {
    var name = prompt('Enter a column name');

    if (name) {
        $.ajax({
            url: baseUrl + '/column',
            method: 'POST',
            data: {
                name: name
            },
            success: function(response) {
                var column = new Column(response.id, name);
                board.createColumn(column);
            }
        })
    }
});
