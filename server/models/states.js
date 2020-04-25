const mongoose = require('mongoose');

const stateSchema = mongoose.Schema({
    stateId: { type: Number, required: true, unique: true},
    name: { type: String, required: true, unique: true, trim: true, minLength: 3 },
    totalCases: {type: Number, default: 0, required: true},
    tollNumbers: {type: Number},
    isolationCentres: {type: String}
},
{ timestamps: true });

/* stateSchema.pre('save', function (next) {

    // Only increment when the document is new
    if (this.isNew) {
        stateModel.count().then(res => {
            this._id = res; // Increment count
            next();
        });
    } else {
        next();
    }
});
 */
const states = mongoose.model('State', stateSchema);

module.exports= states;
