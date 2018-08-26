var board = {
    name: 'Kanban Board',
    createColumn: function(column) {
        this.$element.append(column.$element);
        initSortable('.column-card-list', 'card-placeholder');
        initSortable('.column-container', 'column-placeholder');
    },
    $element: $('#board .column-container'),
};

function initSortable(element, placeholder) {
    $(element).sortable({
        connectWith: element,
        placeholder: placeholder
    }).disableSelection();
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
