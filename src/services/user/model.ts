import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";

const schema = new Schema({
    name: {
        type: String,
        trim: true,
    },
    userName: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        index: true,
        unique: true,
    },
    password: {
        type: String,
        trim: true,
        default: ""
    },
    avatar: {
        type: String,
        trim: true,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    phone: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }
}, { timestamps: true });

schema.plugin(paginate);

schema.index({ name: 'text', email: 'text' });

schema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    delete user.__v;
    delete user.updatedAt;
    delete user.createdAt;
    return JSON.parse(JSON.stringify(user).replace(/_id/g, 'id'));
};

export default model("User", schema);