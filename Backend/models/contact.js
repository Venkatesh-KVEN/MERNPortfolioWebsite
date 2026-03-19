import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true },
    Phone: {
    type: [Number], 
    required:true,
    validate: {
      validator: function(v) {
        return v.length <= 2;
      },
      message: props => `${props.value.length} phone numbers provided, but max allowed is 2!`
    }
  },
    location: { type: String, required: true }
})

export const Contact = mongoose.model("Contact", contactSchema);
