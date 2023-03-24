import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { db } from "../firebase";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";
import "swiper/css/bundle";
import { FaShare, FaMapMarkerAlt, FaMountain } from "react-icons/fa";
import { TbCurrencyShekel } from "react-icons/tb";
import { GiDuration, GiBus, GiHotMeal } from "react-icons/gi";
import { TbMoodKid } from "react-icons/tb";
import { getAuth } from "firebase/auth";
import Contact from "../components/Contact";
import Join from "../components/Join";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export default function Tour() {
  const auth = getAuth();
  const params = useParams();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const [contactOrginizer, setContactOrginizer] = useState(false);
  const [joinTour, setJoinTour] = useState(false);
  SwiperCore.use([Autoplay, Navigation, Pagination]);
  useEffect(() => {
    async function fetchTour() {
      const docRef = doc(db, "tours", params.tourId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setTour(docSnap.data());
        setLoading(false);
      }
    }
    fetchTour();
  }, [params.tourId]);
  if (loading) {
    return <Spinner />;
  }
  return (
    <main>
      <Swiper
        slidesPerView={1}
        navigation
        pagination={{ type: "progressbar" }}
        effect="fade"
        modules={[EffectFade]}
        autoplay={{ delay: 3000 }}
      >
        {tour.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full overflow-hidden h-[300px]"
              style={{
                background: `url(${tour.imgUrls[index]}) center no-repeat`,
                backgroundSize: "cover",
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className="fixed top-[13%] right-[3%] z-10 bg-white cursor-pointer border-2 border-gray-400 rounded-full w-12 h-12 flex justify-center items-center"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareLinkCopied(true);
          setTimeout(() => {
            setShareLinkCopied(false);
          }, 2000);
        }}
      >
        <FaShare className="text-lg text-slate-500" />
      </div>
      {shareLinkCopied && (
        <p className="fixed top-[23%] right-[5%] font-semibold border-2 border-gray-400 rounded-md bg-white z-10 p-2">
          Link Copied
        </p>
      )}

      <div className="m-4 flex flex-col md:flex-row max-w-6xl lg:mx-auto p-4 rounded-lg shadow-lg bg-white lg:space-x-5">
        <div className=" w-full ">
          <p className="text-2xl font-bold mb-3 text-blue-900 flex flex-nowrap items-end">
            {tour.name} -
            {tour.offer
              ? tour.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : tour.discountedPrice
                  ?.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            <TbCurrencyShekel className="text-lg" />
          </p>

          <p className="flex items-center mt-6 mb-3 font-semibold">
            <FaMapMarkerAlt className="text-green-700 mr-1" />
            {tour.meetingPoint}
          </p>
          <div className="flex justify-start items-center space-x-4 w-[75%]">
            <p className="bg-red-800 w-full max-w-[200px] rounded-md p-1 text-white text-center font-semibold shadow-md">
              {tour.type === "daytour" ? "Day tour" : "Multi-day tour"}
            </p>
            {tour.offer && (
              <p className="w-full max-w-[210px] bg-green-800 rounded-md p-1 text-white text-[15px] text-center font-semibold shadow-md whitespace-nowrap">
                {tour.discount}% discount for groups
              </p>
            )}
          </div>
          <p className="mt-3 mb-3">
            <span className="font-semibold">Description - </span>
            {tour.description}
          </p>
          <ul className="flex-col items-center space-y-2 text-sm font-semibold mb-6">
            <li className="flex items-center whitespace-nowrap">
              {/* //* TODO - CHANGE ICON FROM REACT-ICONS */}
              <FaMountain className="text-lg mr-1" />
              {/* {+listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"} */}
              {`${tour.difficultyLevel} difficulty level (from 1 to 5)`}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <GiDuration className="text-lg mr-1" />
              {/* {+listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : "1 Bath"} */}
              {`${tour.duration} hours/days duration`}
            </li>

            {tour.kidsFriendly ? (
              <>
                <li className="flex items-center whitespace-nowrap">
                  <TbMoodKid className="text-lg mr-1" />
                  Kids Friendly. price per kid is: ${tour.PricePerChild}
                </li>
              </>
            ) : (
              ""
            )}
            {/* </li> */}
            <li className="flex items-center whitespace-nowrap">
              <GiBus className="text-lg mr-1" />
              {tour.busTour ? "Bus included" : ""}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <GiHotMeal className="text-lg mr-1" />
              {tour.food ? "Food included" : "bring your own food"}
            </li>
          </ul>
          {tour.userRef !== auth.currentUser?.uid &&
            !contactOrginizer &&
            !joinTour && (
              <div className="mt-6 flex flex-col space-y-1">
                <button
                  onClick={() => setContactOrginizer(true)}
                  className="px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg w-full text-center transition duration-150 ease-in-out "
                >
                  Contact Orginizer
                </button>
                <button
                  onClick={() => setJoinTour(true)}
                  className="px-7 py-3 bg-red-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg w-full text-center transition duration-150 ease-in-out "
                >
                  Join
                </button>
              </div>
            )}
          {contactOrginizer && <Contact userRef={tour.userRef} tour={tour} />}
          {joinTour && <Join userRef={tour.userRef} tour={tour} />}
        </div>

        {/* {tour.userRef !== auth.currentUser?.uid && !joinTour && (
          <div className="mt-6">
            <button
              onClick={() => setJoinTour(true)}
              className="px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg w-full text-center transition duration-150 ease-in-out "
            >
              Join
            </button>
          </div>
        )}
        {joinTour && <Join userRef={tour.userRef} tour={tour} />}
      </div> */}
        {/* </ */}

        <div className="w-full h-[200px] md:h-[400px] z-10 overflow-x-hidden mt-6 md:mt-0 md:ml-2">
          <MapContainer
            center={[tour.geolocation.lat, tour.geolocation.lng]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[tour.geolocation.lat, tour.geolocation.lng]}>
              <Popup>{tour.meetingpoint}</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </main>
  );
}
