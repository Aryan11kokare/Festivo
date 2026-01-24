import { BadgeCheck } from "lucide-react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import React from "react";

const ReviewCard = ({ review }) => {
  return (
    <div className="w-full min-h-[5rem] mb-4 rounded-md ">
      <div className="bg-slate-100 p-2 rounded-md">
        <h3 className="text-gray-800 mb-1 flex gap-2 text-xs font-bold justify-start items-center">
          {review.author.username}{" "}
          <BadgeCheck size={16} className="text-blue-600" />
        </h3>
        <Box sx={{ "& > legend": { width: "100%" } }}>
          <Rating
            name="read-only"
            value={review.rating}
            readOnly
            size="small"
          />
        </Box>
        <div className="text-sm ">{review.comment}</div>
      </div>
    </div>
  );
};

export default ReviewCard;
