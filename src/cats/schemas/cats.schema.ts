// 目錄：src/cats/schemas/cats.schema.ts

import * as mongoose from 'mongoose';

export const CatSchema = new mongoose.Schema({
    name: String,
    age: Number,
    breed: String
}, {
  versionKey: false // You should be aware of the outcome after set to false
});