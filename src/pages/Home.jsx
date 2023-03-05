import {
  collection,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import TourItem from "../components/TourItem";
import Slider from "../components/Slider";
import { db } from "../firebase";

export default function Home() {
  // Offers
  const [offerTours, setOfferTours] = useState(null);
  useEffect(() => {
    async function fetchTours() {
      try {
        // get reference
        const tourRef = collection(db, "tours");
        // create the query
        const q = query(
          tourRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        // execute the query
        const querySnap = await getDocs(q);
        const tours = [];
        querySnap.forEach((doc) => {
          return tours.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setOfferTours(tours);
      } catch (error) {
        console.log(error);
      }
    }
    fetchTours();
  }, []);

  // Places for daytour
  const [daytourTours, setDaytourTours] = useState(null);
  useEffect(() => {
    async function fetchTours() {
      try {
        // get reference
        const toursRef = collection(db, "tours");
        // create the query
        const q = query(
          toursRef,
          where("type", "==", "daytour"),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        // execute the query
        const querySnap = await getDocs(q);
        const tours = [];
        querySnap.forEach((doc) => {
          return tours.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setDaytourTours(tours);
      } catch (error) {
        console.log(error);
      }
    }
    fetchTours();
  }, []);
  // Packages/Multi-day tours
  const [packagetourTours, setPackagetourTours] = useState(null);
  useEffect(() => {
    async function fetchTours() {
      try {
        // get reference
        const toursRef = collection(db, "tours");
        // create the query
        const q = query(
          toursRef,
          where("type", "==", "packagetour"),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        // execute the query
        const querySnap = await getDocs(q);
        const tours = [];
        querySnap.forEach((doc) => {
          return tours.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setPackagetourTours(tours);
      } catch (error) {
        console.log(error);
      }
    }
    fetchTours();
  }, []);
  return (
    <div>
      <Slider />
      <div className="max-w-6xl mx-auto pt-4 space-y-6">
        {offerTours && offerTours.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-2xl mt-6 font-semibold">Recent offers</h2>
            <Link to="/offers">
              <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                Show more offers
              </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
              {offerTours.map((tour) => (
                <TourItem key={tour.id} tour={tour.data} id={tour.id} />
              ))}
            </ul>
          </div>
        )}
        {daytourTours && daytourTours.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-2xl mt-6 font-semibold">Day tours</h2>
            <Link to="/category/daytour">
              <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                Show more Day Tours
              </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
              {daytourTours.map((tour) => (
                <TourItem key={tour.id} tour={tour.data} id={tour.id} />
              ))}
            </ul>
          </div>
        )}
        {packagetourTours && packagetourTours.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-2xl mt-6 font-semibold">Package Tours</h2>
            <Link to="/category/packagetour">
              <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                Show more Package Tours
              </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
              {packagetourTours.map((tour) => (
                <TourItem key={tour.id} tour={tour.data} id={tour.id} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
