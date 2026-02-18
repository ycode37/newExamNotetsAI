import mongoose from "mongoose";

const notesSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    classLevel: String,
    examType: String,

    revisionMode: {
      type: Boolean,
      default: false,
    },

    isCreditAvailaible: {
      type: Boolean,
      default: true,
    },
    includeDiagram: Boolean,
    includeChart: Boolean,

    content: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true },
);

const Notes = mongoose.model("Notes", notesSchema);
export default Notes;
