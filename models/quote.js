var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Quote Schema
 */
var QuoteSchema = new Schema({
  create: {
    type: Date,
    default : Date.now
  },
  author: {
    type: String,
    trim : true
  },
  excerpt: {
    type: String,
    trim : true,
    required: true
  },
  source: {
    type: String,
    trime: true
  }
});


/**
 * Validations
 */
QuoteSchema.path('excerpt').validate(function(excerpt) {
  return !!excerpt;
}, 'Must provide a quote');

/**
 * Statics
 */
QuoteSchema.statics.findByAuthor = function(authorName, callback) {
  this.findOne({
    author: authorName
  }).toArray();
};

mongoose.model('Quote', QuoteSchema);