import Moment from "react-moment";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { FaMountain } from "react-icons/fa";
import Join from "./Join";
export default function TourItem({ tour, id, onEdit, onDelete, onJoin }) {
  // function onJoin(attending, spots) {
  //   attending++;
  //   spots = spots - attending;
  // }
  return (
    <li className="relative bg-white flex flex-col justify-between items-center shadow-md hover:shadow-xl rounded-md overflow-hidden transition-shadow duration-150 m-[10px]">
      <Link className="contents" to={`/category/${tour.type}/${id}`}>
        <img
          className="h-[170px] w-full object-cover hover:scale-105 transition-scale duration-200 ease-in"
          loading="lazy"
          src={tour.imgUrls[0]}
        />
        {/* <Moment
          className="absolute top-2 left-2 bg-[#3377cc] text-white uppercase text-xs font-semibold rounded-md px-2 py-1 shadow-lg"
          fromNow
        >
          {tour.timestamp?.toDate()}
          {tour.startdate}
        </Moment> */}
        <p className="absolute top-2 left-2 bg-[#3377cc] text-white uppercase text-xs font-semibold rounded-md px-2 py-1 shadow-lg">
          {tour.startdate}
        </p>
        <div className="w-full p-[10px]">
          <div className="flex items-center space-x-1">
            <MdLocationOn className="h-4 w-4 text-green-600" />
            <p className="font-semibold text-sm mb-[2px] text-gray-600 truncate">
              {tour.meetingPoint}
            </p>
          </div>
          <p className="font-semibold m-0 text-xl truncate">{tour.name}</p>
          <p className="text-[#457b9d] mt-2 font-semibold">
            $
            {tour.offer
              ? // ? tour.discountedPrice
                tour.discountStartAt &&
                tour.discount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : tour.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </p>
          <div className="flex items-center mt-[10px] space-x-3">
            <div className="flex items-center space-x-1">
              <FaMountain className="text-lg mr-1" />
              <p className="font-bold text-xs">
                {tour.difficultyLevel > 1
                  ? `${tour.difficultyLevel} out of 5`
                  : "1"}
              </p>
            </div>
            <div className="flex items-center space-x-1">
              <p className="font-bold text-xs">
                {tour.duration > 24 ? `A package tour` : "daytour"}
              </p>
            </div>
          </div>
          <div>
            {/* <Join
              price={tour.price}
              attending={tour.attending}
              spots={tour.attending}
              // onClick={() => onJoin(tour.attending, tour.spots)}
            /> */}
          </div>
        </div>
      </Link>
      {/* {onDelete && ( */}
      <FaTrash
        className="absolute bottom-2 right-2 h-[14px] cursor-pointer text-red-500"
        onClick={() => onDelete(tour.id)}
      />
      {/* )} */}
      {/* {onEdit && ( */}
      <MdEdit
        className="absolute bottom-2 right-7 h-4 cursor-pointer "
        onClick={() => onEdit(tour.id)}
      />
      {/* )} */}
    </li>
  );
}
