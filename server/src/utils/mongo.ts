import * as mongoose from 'mongoose';

export const cleanMongoDocument = (doc: mongoose.Document) => {
    const obj = doc.toJSON();
    delete obj._id;
    delete obj.__v;
    return obj;
};
