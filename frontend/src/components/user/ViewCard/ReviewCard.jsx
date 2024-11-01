import React from 'react';
import StarRoundedIcon from '@mui/icons-material/StarRounded';

const ReviewCard = (props) => {
    const reviewData = props.data.review;
     const userid=localStorage.getItem("userid");
   
    return (
        <div className="text-black grid md:grid-cols-2 gap-4 px-4">
            {
                reviewData.map((review, index) => (
                    <div key={index} className="border-2 rounded-md p-2">
                        <h1>{review.comment}</h1>
                        <div className="flex">
                            {Array.from({ length: review.rating }).map((_, starIndex) => (
                                <StarRoundedIcon key={starIndex} sx={{ color: "rgb(251 191 36)" }} />
                            ))}
                        </div>
                        {
                          
                          userid===props.data._id?<button className='p-2'>delete</button>:""
                        }
                    </div>
                ))
            }
        </div>
    );
};

export default ReviewCard;
