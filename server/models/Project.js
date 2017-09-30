import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    title     : { type: String },
    date      : { type: String },
    dateStart      : { type: String },
    dateEnd      : { type: String },
    description  : { type: String },
    status      : { type: Object },
    executors: { type: Array }
})

ProjectSchema.set('toJSON', {
    virtuals: true,
    versionKey:false,
    transform: function (doc, ret) {   delete ret._id  }
})

mongoose.model('Project', ProjectSchema);
