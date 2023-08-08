import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from './Pagination';
import WatchList from './WatchList';
import Card from './Card';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [watchList, setWatchList] = useState([]);
  const [notification, setNotification] = useState('');

  const onNext = () => {
    setPageNum(pageNum + 1);
  };

  const onPrev = () => {
    if (pageNum > 1) {
      setPageNum(pageNum - 1);
    }
  };

  const addToWatchlist = (movie) => {

    let isPresent = watchList?.find((ele) => ele.id === movie.id);

    if (!isPresent)
      setWatchList([...watchList, movie]);


    // Check if the movie is already in the watchlist to avoid duplicates
    // if (!watchList.find((item) => item.id === movie.id)) {
    //   setWatchList([...watchList, movie.id]);
    //   console.log(setWatchList)
    //   setNotification(`${movie.title} added to watchlist!`);
    // }
  };

  const removeFromWatchlist = (movie) => {
    console.log(movie)
    const filtered = watchList?.filter((ele) => ele.id !== movie.id);
    setWatchList(filtered)
  }

  console.log(watchList)

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/trending/movie/day?api_key=7af0a3ff53ab2ff0f3f224bb58d5b777&page=${pageNum}`)
      .then((res) => {
        setMovies(res.data.results);
      });
  }, [pageNum]);

  // console.log(movies)



  return (
    <div className='flex flex-col gap-10 py-12'>
      <h2 className='text-5xl font-bold text-center text-white'>Trending Movies</h2>
      {notification && <p>{notification}</p>}
      <div className='w-4/5 m-auto flex flex-wrap gap-5 justify-center '>
        {movies.map((movie) => (
          <Card movie={movie} addToWatchlist={addToWatchlist} removeFromWatchlist={removeFromWatchlist} />

        ))}
      </div>
      <Pagination pageNumProp={pageNum} onNextProp={onNext} onPrevProp={onPrev} />
      <WatchList watchlistprop={watchList} />
    </div>
  );
}

export default Movies;
