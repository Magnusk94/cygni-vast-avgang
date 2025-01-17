"use client";
import Header from "@components/Header";
import Spinner from "@components/Spinner";
import TripCard from "@components/TripCard";
import { Transition } from "@headlessui/react";
import { Column, ColumnWrapper } from "@models/Trip";
import { fetchAllTrips } from "@services/TripsService";
import { useEffect, useState } from "react";
//import mock from "../mock/mock.json";

export default function Trips() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [columnWrapper, setColumnWrapper] = useState<ColumnWrapper>();
  let interval: any = null;

  const fetchData = async () => {
    setIsLoading(true);

    //const trips = mock;
    const trips = await fetchAllTrips();
    setColumnWrapper(trips);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
    interval = setInterval(() => {
      console.log("[USEEFFECT] 5 MIN PASSED. FETCHING DATA AGAIN!");
      fetchData();
    }, 300000);
  }, []);

  const renderContent = (col: Column) => {
    return (
      <>
        <h1 className="self-center text-3xl mb-4">{col.title}</h1>
        {col.trips.map((t: any) => (
          <TripCard key={t.id} trip={t} />
        ))}
      </>
    );
  };

  return (
    <div className="z-0 w-full">
      {isLoading && <Spinner />}
      <Transition
        appear={true}
        show={!isLoading}
        enter="transition-opacity ease-linear duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="flex justify-center">
          <Header />
        </div>
        <div className="flex justify-between">
          {columnWrapper && (
            <>
              <div className="w-1/3 pr-4">
                {columnWrapper.colLeft.map((col: any) => (
                  <div key={col.title} className="flex flex-col mb-6">
                    {renderContent(col)}
                  </div>
                ))}
              </div>
              <div className="w-1/3 px-4">
                {columnWrapper.colMiddle.map((col: any) => (
                  <div key={col.title} className="flex flex-col">
                    {renderContent(col)}
                  </div>
                ))}
              </div>
              <div className="w-1/3 pl-4">
                {columnWrapper.colRight.map((col: any) => (
                  <div key={col.title} className="flex flex-col mb-6">
                    {renderContent(col)}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </Transition>
    </div>
  );
}
