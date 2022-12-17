const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the Property model to whatever makes sense in this case
const requestSchema = new Schema(
  {
    property: {
      type: Schema.Types.ObjectId,
      ref: "Property",
    },
    description: {
      type: String,
    },
    comments: {
      type: Array,
    },
    dueDate: {
      type: String,
    },
    assignedTo: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    status: {
      type: String,
      default: "Not Started",
      enum: ["Not Started", "In Progress", "Finished"],
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const request = model("Request", requestSchema);

module.exports = request;
