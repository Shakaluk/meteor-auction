import { check } from 'meteor/check';

export const Lot = new Mongo.Collection('lot');

Meteor.methods({
    'lot.insert'(name, duration) {
        check(name, String);
        check(duration, Number);

        Lot.insert({
            name,
            duration,
            current  : false,
            createdAt: new Date(),
        });
    },
});