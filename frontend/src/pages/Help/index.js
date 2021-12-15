import React, {useState, useEffect, useCallback} from 'react';
import PageHeading from "../../components/PageHeading";
import './Help.css'
import Spinner from "../../components/Spinner";

const HelpPage = () => {
  const [error, setError] = useState(null);
  const [content, setContent] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchData = useCallback(() => {
    fetch('https://bellissimo-tour-agency.herokuapp.com/bellissimo/help')
      .then(res => res.json())
      .then((result) => {
          setContent(result);
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        })
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData])

  return (
    <div>
      <PageHeading>Помощь</PageHeading>
      <Spinner isVisible={!isLoaded}/>

      <div className='help-page-text-block'>
        {!error && isLoaded &&
          content.help.map((paragraph, id) =>
            <div key={id}>
              <h1 className='help-page-heading'>{paragraph.label}</h1>
              <p className='help-page-text'>{paragraph.text}</p>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default HelpPage;
