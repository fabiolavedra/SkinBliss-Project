import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Rating } from "react-simple-star-rating";
import * as Yup from "yup";
// internal
import ErrorMsg from "../common/error-msg";
import { useAddReviewMutation } from "@/redux/features/reviewApi";
import { notifyError, notifySuccess } from "@/utils/toast";

// schema
const schema = Yup.object().shape({
  comment: Yup.string().required().label("Comment"),
});

const ReviewForm = ({ product_id }) => {
  const { user } = useSelector((state) => state.auth);
  const [rating, setRating] = useState(0);
  const [addReview, {}] = useAddReviewMutation();

  // Catch Rating value
  const handleRating = (rate) => {
    setRating(rate);
  };

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  // on submit
  const onSubmit = (data) => {
    if (!user) {
      notifyError("Please login first");
      return;
    } else {
      addReview({
        productId: product_id,
        rating: rating,
        review: data.comment,
      }).then((result) => {
        if (result?.error) {
          notifyError(result?.error?.data?.message);
        } else {
          notifySuccess(result?.data?.message);
        }
      });
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="tp-product-details-review-form-rating d-flex align-items-center">
        <p>Your Rating :</p>
        <div className="tp-product-details-review-form-rating-icon d-flex align-items-center">
          <Rating
            onClick={handleRating}
            allowFraction
            size={16}
            initialValue={rating}
          />
        </div>
      </div>
      <div className="tp-product-details-review-input-wrapper">
        <div className="tp-product-details-review-input-box">
          <div className="tp-product-details-review-input">
            <textarea
              {...register("comment", { required: `Comment is required!` })}
              id="comment"
              name="comment"
              placeholder="Write your review here..."
            />
          </div>
          <div className="tp-product-details-review-input-title">
            <label htmlFor="msg">Your Review</label>
          </div>
          <ErrorMsg msg={errors.name?.comment} />
        </div>
      </div>
      <div className="tp-product-details-review-btn-wrapper">
        <button type="submit" className="tp-product-details-review-btn">
          Submit
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
