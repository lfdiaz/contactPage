const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: {type: String, required: true},
    created_at: Date,
    major: {type: String, required: true},
    city: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: Number}
})

studentSchema.pre('save', function(next) {
    const currentDate = new Date();
    this.created_at = currentDate;

    next();

})

module.exports = mongoose.model('Student', studentSchema);