
// const parquet = require('parquetjs');

// class TaxiData {
//     constructor(vendorID, pickupDatetime, dropoffDatetime, passengerCount, tripDistance, rateCode, puLocationID, doLocationID, paymentType, fareAmount) {
//         this.vendorID = vendorID; // STRING
//         this.pickupDatetime = pickupDatetime; // STRING
//         this.dropoffDatetime = dropoffDatetime; // STRING
//         this.passengerCount = passengerCount; // INT32
//         this.tripDistance = tripDistance; // DOUBLE
//         this.rateCode = rateCode; // INT32
//         this.puLocationID = puLocationID; // INT32
//         this.doLocationID = doLocationID; // INT32
//         this.paymentType = paymentType; // STRING
//         this.fareAmount = fareAmount; // DOUBLE
//     }

//     static getSchema() {
//         return new parquet.ParquetSchema({
//             vendor_id: { type: 'BYTE_ARRAY', encoding: 'PLAIN' },
//             pickup_datetime: { type: 'BYTE_ARRAY', encoding: 'PLAIN' },
//             dropoff_datetime: { type: 'BYTE_ARRAY', encoding: 'PLAIN' },
//             passenger_count: { type: 'INT32' },
//             trip_distance: { type: 'DOUBLE' },
//             rate_code: { type: 'INT32' },
//             pu_location_id: { type: 'INT32' },
//             do_location_id: { type: 'INT32' },
//             payment_type: { type: 'BYTE_ARRAY', encoding: 'PLAIN' },
//             fare_amount: { type: 'DOUBLE' }
//         });
//     }
// }

// module.exports = TaxiData;

const mongoose = require('mongoose');

const taxiDataSchema = new mongoose.Schema({
    vendorID: { type: String, required: true },
    pickupDatetime: { type: String, required: true },
    dropoffDatetime: { type: String, required: true },
    passengerCount: { type: Number, required: true },
    tripDistance: { type: Number, required: true },
    rateCode: { type: Number, required: true },
    pulocationID: { type: Number, required: true },
    dolocationID: { type: Number, required: true },
    paymentType: { type: String, required: true },
    fareAmount: { type: Number, required: true },
});

const TaxiData = mongoose.model('TaxiData', taxiDataSchema);
module.exports = TaxiData;
