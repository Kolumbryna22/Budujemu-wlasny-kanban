function Card(id, descritpion) {
    var self = this;

    this.id = id;
    this.descritpion = descritpion || 'No descritpion given';
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
        var self = this;

        $.ajax({
            url: baseUrl + '/card/' + self.id,
            method: 'DELETE',
            success: function() {
                self.$element.remove();
            }
        });
    },
};
