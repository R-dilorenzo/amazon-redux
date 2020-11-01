import React from "react";
import StarIcon from "@material-ui/icons/Star";
import { useDispatch, useSelector } from "react-redux";
import { 
    selectRatingRichiesto, 
    CHANGE_RATING 
} from "../features/filterSlice";

function FilterRating({ number }) {
  const ratingRichiesto = useSelector(selectRatingRichiesto);

  const dispatch = useDispatch();

  const changeRating = () => {
    dispatch(
        CHANGE_RATING({ 
            number: number 
        }));
  };

  return (
    <div>
      <div>
        <label className="filter__ratingSearch" onClick={changeRating}>
          {[...Array(number)].map((e, i) => (
            <StarIcon className="filter__iconSearch" key={i}></StarIcon>
          ))}
        </label>
        <label style={{ fontSize: "12px" }}>o più...</label>
      </div>
    </div>
  );
}

export default FilterRating;
