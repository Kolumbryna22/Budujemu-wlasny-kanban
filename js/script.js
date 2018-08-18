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
            var $columnAddCard = $('<button>').addClass('btn-add').text('Add a card');

            // adding events
            $columnDelete.click(function() {
                self.removeColumn();
            });
            $columnAddCard.click(function() {
                self.addCard(new Card(prompt('Enter the name of the card')));
            });

            // construction column element
            $column.append($columnTitle)
                    .append($columnDelete)
                    .append($columnAddCard)
                    .append($columnCardList);

            // methods for column  // nie wiem dlaczego tą metodą nie działa
            // this.addCard = function(card) {
            //     this.$element.children('ul').append(card.$element);
            // };

            // this.removeColumn = function() {
            //     this.$element.remove();
            // };

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

            // methods for card
            // this.removeCard = function() {
            //     this.$element.remove();
            // };

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

    $('.create-column').click(function() {
        var name = prompt('Enter a column name');
        var column = new Column(name);
        board.addColumn(column);
    });
});
