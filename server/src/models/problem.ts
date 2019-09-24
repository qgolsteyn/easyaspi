import mongoose, {Schema} from 'mongoose';

const ProblemSchema = new Schema({
  problemArchetype: {
    type: String,
    required: true
  },
  problemType: {
    type: String,
    required: true
  },
  problem: {
    type: String,
    default: true
  },
  solution: {
    type: Array,
    default: true
  },
  difficulty: {
    type: Number,
    default: true
  },
  seed: {
    type: Number,
    default: true
  }
});

module.exports = mongoose.model('problemSchema', ProblemSchema);

