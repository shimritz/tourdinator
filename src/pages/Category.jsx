import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import Spinner from "../components/Spinner";
import TourItem from "../components/TourItem";
import { useParams } from "react-router-dom";

export default function Category() {
  const [tours, setTours] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchedTour, setLastFetchTour] = useState(null);
  const params = useParams();
  useEffect(() => {
    async function fetchTours() {
      try {
        const tourRef = collection(db, "tours");
        const q = query(
          tourRef,
          where("type", "==", params.categoryName),
          orderBy("timestamp", "desc"),
          limit(8)
        );
        const querySnap = await getDocs(q);
        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastFetchTour(lastVisible);
        const tours = [];
        querySnap.forEach((doc) => {
          return tours.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setTours(tours);
        setLoading(false);
      } catch (error) {
        toast.error("Could not fetch listing");
      }
    }

    fetchTours();
  }, [params.categoryName]);

  async function onFetchMoreTours() {
    try {
      const tourRef = collection(db, "tours");
      const q = query(
        tourRef,
        where("type", "==", params.categoryName),
        orderBy("timestamp", "desc"),
        startAfter(lastFetchedTour),
        limit(4)
      );
      const querySnap = await getDocs(q);
      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastFetchTour(lastVisible);
      const tours = [];
      querySnap.forEach((doc) => {
        return tours.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setTours((prevState) => [...prevState, ...tours]);
      setLoading(false);
    } catch (error) {
      toast.error("Could not fetch tour");
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-3">
      <h1 className="text-3xl text-center mt-6 font-bold mb-6">
        {params.categoryName === "daytour" ? "Day Tours" : "Multi-day Tours"}
      </h1>
      {loading ? (
        <Spinner />
      ) : tours && tours.length > 0 ? (
        <>
          <main>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {tours.map((tour) => (
                <TourItem key={tour.id} id={tour.id} tour={tour.data} />
              ))}
            </ul>
          </main>
          {lastFetchedTour && (
            <div className="flex justify-center items-center">
              <button
                onClick={onFetchMoreTours}
                className="bg-white px-3 py-1.5 text-gray-700 border border-gray-300 mb-6 mt-6 hover:border-slate-600 rounded transition duration-150 ease-in-out"
              >
                Load more
              </button>
            </div>
          )}
        </>
      ) : (
        <p>
          There are no current{" "}
          {params.categoryName === "daytour" ? "Day Tours" : "Multi-day Tours"}
        </p>
      )}
    </div>
  );
}
