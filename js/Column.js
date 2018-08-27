function Column(id, name) {
    var self = this;

    this.id = id;
    this.name = name || 'No name given';
    this.$element = createColumn();

    function createColumn() {
        // creating components of columns
        var $column = $('<div>').addClass('column');
        var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
        var $columnCardList = $('<ul>').addClass('column-card-list');
        var $columnDelete = $('<button>').addClass('btn-delete').text('x');
        var $columnAddCard = $('<button>').addClass('btn-create').text('Add a card');

        // adding events
        $columnDelete.click(function() {
            self.deleteColumn();
        });

        $columnAddCard.click(function(event) {
            var text = prompt('Enter the description of the card');

            event.preventDefault();

            if (text) {
                $.ajax({
                    url: baseUrl + '/card',
                    method: 'POST',
                    data: {
                        name: text,
                        bootcamp_kanban_column_id: self.id
                    },
                    success: function(response) {
                        var card = new Card(response.id, text);
                        self.createCard(card);
                    }
                })
            }
        });

        // construction column element
        $column.append($columnTitle)
            .append($columnDelete)
            .append($columnCardList)
            .append($columnAddCard);

        return $column;
    };
};

Column.prototype = {
    createCard: function(card) {
        this.$element.children('ul').append(card.$element);
    },

    deleteColumn: function() {
        var self = this;
        $.ajax({
            url: baseUrl + '/column/' + self.id,
            method: 'DELETE',
            success: function() {
                self.element.remove();
            }
        });
    },
};
