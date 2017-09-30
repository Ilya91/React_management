import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    projectId: { type: String },
    title     : { type: String },
    authorId    : { type: String },
    date      : { type: String },
    description  : { type: String },
    status      : { type: Object },
    complete      : { type: Object },
    executors: { type: Array }
})

TaskSchema.set('toJSON', {
    virtuals: true,
    versionKey:false,
    transform: function (doc, ret) {   delete ret._id  }
})

mongoose.model('Task', TaskSchema);
