import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SubTaskSchema = new Schema({
    taskId: { type: String },
    title     : { type: String },
    users    : { type: Array }
})

SubTaskSchema.set('toJSON', {
    virtuals: true,
    versionKey:false,
    transform: function (doc, ret) {   delete ret._id  }
})

mongoose.model('SubTask', SubTaskSchema);
