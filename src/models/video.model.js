import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const VideoSchema = new Schema(
    {
        title:{
            type:String,
            required: true,
            trim:true,
            index:true
        },
        description:{
            type:String,
            required: true,
            trim:true,
        },
        videoFile:{
            type:String,
            required: true,
        },
        thumbnail:{
            type:String,
            required: true,
        },
        duration:{
            type:Number,
            required: true,
        },
        views:{
            type:Number,
            default:0
        },
        isPublished:{
            type:Boolean,
            default:true
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref:"User",
        }
    },{timestamps:true}
)

const videoSchema = new Schema(
    {
        
    },
    {timestamps:true}
);

videoSchema.plugin(mongooseAggregatePaginate);

export const Video = mongoose.model("Video", VideoSchema);