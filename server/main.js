import { Meteor } from 'meteor/meteor';

import { Lot } from '../imports/api/lot.js';

Meteor.startup(() => {
    let currentLot = Lot.findOne({ current: true });

    if (!currentLot) {
        currentLot = Lot.findOne();

        if (currentLot) {
            Lot.update(currentLot._id, { $set: { current: true, updatedAt: new Date() } });
        }
    }

    function switchToNextLot() {
        if (currentLot) {
            const nextLot = Lot.findOne({ createdAt: { $gt: new Date(currentLot.createdAt) } });

            Lot.update(currentLot._id, { $set: { current: false, updatedAt: new Date() } });

            if (nextLot) {
                currentLot = nextLot;
            } else {
                currentLot = Lot.findOne();
            }

            Lot.update(currentLot._id, { $set: { current: true, updatedAt: new Date() } });

            runAuction();
        }
    }

    function runAuction() {
        if (currentLot && currentLot._id) {
            Meteor.setTimeout(switchToNextLot, currentLot.duration * 1000);
        } else {
            currentLot = Lot.findOne();

            Meteor.setTimeout(runAuction, 2000);
        }
    }

    runAuction();
});
