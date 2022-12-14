const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the Property model to whatever makes sense in this case
const propertySchema = new Schema(
  {
    name: {
      type: String,
    },
    address: {
      type: String,
    },
    requests: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Request",
        },
      ],
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const property = model("Property", propertySchema);

module.exports = property;
