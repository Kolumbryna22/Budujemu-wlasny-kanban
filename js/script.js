$(function() {
    'use strict';

    function randomString() {
        var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
        var str = '';
        var i;

        for (i = 0; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }

        return str;
    };

    function initSortable() {
        $('.column-card-list').sortable({
            connectWith: '.column-card-list',
            placeholder: 'card-placeholder'
        }).disableSelection();
    };

    function Column(name) {
        var self = this;

        this.id = randomString();
        this.name = name;
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
                self.removeColumn();
            });
            $columnAddCard.click(function() {
                var text;

                text = prompt('Enter the description of the card');

                if (!text) {
                    return 0;
                }

                self.addCard(new Card(text));
            });

            // construction column element
            $column.append($columnTitle)
                    .append($columnDelete)
                    .append($columnAddCard)
                    .append($columnCardList);

            return $column;
        };
    };

    Column.prototype = {
        addCard: function(card) {
            this.$element.children('ul').append(card.$element);
        },

        removeColumn: function() {
            this.$element.remove();
        },
    };

    function Card(descritpion) {
        var self = this;

        this.id = randomString();
        this.descritpion = descritpion;
        this.$element = createCard();

        function createCard() {
            // creating components of card
            var $card = $('<li>').addClass('card');
            var $cardDescription = $('<p>').addClass('card-descritpion').text(self.descritpion);
            var $cardDelete = $('<button>').addClass('btn-delete').text('x');

            // adding events
            $cardDelete.click(function() {
                self.removeCard();
            });

            // construction card element
            $card.append($cardDelete)
                .append($cardDescription);

            return $card;
        };
    };

    Card.prototype = {
        removeCard: function() {
            this.$element.remove();
        },
    };

    var board = {
        name: 'Kanban Board',
        addColumn: function(column) {
            this.$element.append(column.$element);
            initSortable();
        },
        $element: $('#board .column-container'),
    };

    $('.btn-create-column').click(function() {
        var name = prompt('Enter a column name');

        if (!name) {
            return 0;
        }

        var column = new Column(name);
        board.addColumn(column);
    });

    // creating default kanban
    var todoColumn = new Column('To do');
    var doingColumn = new Column('Doing');
    var doneColumn = new Column('Done');
    var card1 = new Card('New task');
    var card2 = new Card('Add style for my kanban');

    board.addColumn(todoColumn);
    board.addColumn(doingColumn);
    board.addColumn(doneColumn);
    todoColumn.addCard(card1);
    doingColumn.addCard(card2);
});
