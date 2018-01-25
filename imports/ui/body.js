import './lot.js';
import './body.html';

import { Lot } from '../api/lot.js';

Template.body.helpers({
    lots() {
        return Lot.find({});
    },

    currentLot() {
        return Lot.findOne({ current: true });
    },
});

Template.body.events({
    'submit .new-lot' (event) {
        const target = event.target;
        const name = target.name.value;
        const duration = +target.duration.value;

        event.preventDefault();

        Meteor.call('lot.insert', name, duration);

        target.name.value = '';
        target.duration.value = '';
    },
});