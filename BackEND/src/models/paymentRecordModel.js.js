const { model, Schema } = require('mongoose');

const PaymentSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  reference: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  status: {
    type: String,
    default: 'Pendiente',
  },
});

const PaymentRecordSchema = new Schema({
  payment: {
    type: PaymentSchema,
    required: true,
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  ticket: {
    type: Schema.Types.ObjectId,
    ref: 'Ticket',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  approvedBy: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
  },
  orderNumber: {
    type: Number,
  },
}, { timestamps: true })

const PaymentRecord = model('PaymentRecord', PaymentRecordSchema);

module.exports = PaymentRecord;