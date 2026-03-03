import Notes from "../models/notes.model.js";

export const getMyNotes = async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.userId })
      .select(
        "topic classlevel examType revisionMode includeDiagram includeChart createdat",
      )
      .sort({ createdAt: -1 });
    if (!notes) {
      return res.status(404).json({
        error: "Note not found",
      });
    }
    return res.status(200).json(notes);
  } catch (error) {
    return res
      .status(500)
      .json({ message: " getCurrentUser notes error $(error}" });
  }
};

export const getSingleNotes = async (req, res) => {
  try {
    const notes = await Notes.findOne({
      _id: req - params.id,
      user: req.userId,
    });
    if (!notes) {
      return res.status(404).json({
        error: "Note not found",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
