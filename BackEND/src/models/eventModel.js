const { model, Schema } = require('mongoose');

const ticketSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  available: {
    type: Number,
    required: true,
    min: 1,
  },
  rate: {
    type: Number,
    required: true,
    min: 0,
  }
})

const eventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Por aprobar', 'Disponible', 'Finalizado'],
    default: 'Por aprobar'
  },
  promotorID: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  tickets: [ticketSchema],
}, { timestamps: true })

const Event = model("Event", eventSchema);

module.exports = Event;