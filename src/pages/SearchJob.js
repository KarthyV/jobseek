import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "../styles/SearchJob.css";
import axios from "../api";
import JobCardList from "../components/JobCardList";

const SearchJob = () => {
  const [query, setQuery] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      setLoading(true);
      const searchQuery = query.toLowerCase();
      axios
        .get(`/jobs/search/${searchQuery}`)
        .then((response) => {
          setSearchResults(response.data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [query]);

  return (
    <Container>
      <div className="filter-container">
        <h3>Filter By Languages</h3>
        <div className="language-tag-container">
          <span
            onClick={(e) => setQuery(e.target.textContent)}
            className="language-tag"
          >
            HTML
          </span>
          <span
            onClick={(e) => setQuery(e.target.textContent)}
            className="language-tag"
          >
            React
          </span>
          <span
            onClick={(e) => setQuery(e.target.textContent)}
            className="language-tag"
          >
            Javascript
          </span>
          <span
            onClick={(e) => setQuery(e.target.textContent)}
            className="language-tag"
          >
            Python
          </span>
          <span
            onClick={(e) => setQuery(e.target.textContent)}
            className="language-tag"
          >
            Frontend
          </span>
        </div>
      </div>
      {query && loading && <div>Searching for Jobs that match</div>}
      {query && (
        <div>
          {searchResults.length > 0 ? (
            searchResults.map((job) => <JobCardList key={job._id} job={job} />)
          ) : (
            <div>No Jobs Available as of now...</div>
          )}
        </div>
      )}
    </Container>
  );
};

export default SearchJob;
