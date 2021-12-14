import React from 'react';
import PageHeading from "../../components/PageHeading";
import {useParams} from "react-router-dom";

const Tour = () => {
  const { id } = useParams();

  return (
    <div>
      <PageHeading>Экскурсия {id}</PageHeading>
    </div>
  );
};

export default Tour;
