import React from 'react';

import ReviewBox from './ReviewBox';

const ReviewCard = (props) => {
    const reviewData = props.data.review;
    return (

        <div className="text-black px-4">
            <h1 className='font-semibold text-lg text-center'>Reviews of {props.data.title}</h1>
             <div className="grid md:grid-cols-2 gap-4 w-[70vw] mx-auto mt-3">{
                reviewData.map((review, index) => (
                    <ReviewBox key={index} review={review}/>
                ))}
            </div>
            
        </div>
    );
};

export default ReviewCard;
