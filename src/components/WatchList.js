
import { Link } from 'react-router-dom';
import Card from './Card';
import { useSelector } from 'react-redux';

function WatchList() {

  const watchList = useSelector((state)=>state.watchList.data)

 
 return (// grid-cols-[repeat(auto-fill,minmax(250px,1fr))] used for auto responsive
 <>
  {
    watchList.length > 0 ? <div className='w-[80%] m-auto py-4 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-x-2 gap-y-4'>{ watchList.map((movie)=> <Card key={movie.id} movie={movie}/>)} </div>:<h1 className='h-screen flex justify-center items-center gap-1 text-white text-2xl text-center'>No movies in watchlist. <Link to="/" className='text-blue-600'> Tap to add</Link></h1>
    
  }
  </>
 )
}

export default WatchList;
