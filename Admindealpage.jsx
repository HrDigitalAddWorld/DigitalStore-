import React, { useRef } from "react";
import DealsOffersForm from "./DealsOffersForm";
import DealsOffers from "./DealsOffers";

const AdminDealsPage = () => {
  const dealsRef = useRef();

  return (
    <>
      <DealsOffersForm onDealAdded={() => dealsRef.current?.refreshDeals()} />
      <DealsOffers ref={dealsRef} />
    </>
  );
};

export default AdminDealsPage;
