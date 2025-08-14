const baseURL = "https://api.themoviedb.org/3/";
const apiKey = "5ece69ac2140520a6eba7a328f7c3c0a";



export async function LatDATA (){
    const latMovieURL = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`);
    const latTvURL = await fetch(`https://api.themoviedb.org/3/tv/airing_today?api_key=${apiKey}`);

    const movie = await latMovieURL.json();
    const tv = await latTvURL.json();

    const latMovie = (movie.results || []).map(m=>({...m,realmediatype:'movie', media_type:"Movie"}));
    const latTv = (tv.results || []).map(t=>({...t,realmediatype:'tv', media_type:"TV Show"}));
    
    const result = [...latTv,...latMovie].sort((a,b)=>b.popularity - a.popularity);
   
    return result;
}

export async function GetLatMovie(){
    const latMovieURL = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`);
    const movie = await latMovieURL.json();
    return (movie.results || []).map(m=>({...m,realmediatype:'movie', media_type:"Movie"}));
}

export async function GetLatTV(){
     const latTvURL = await fetch(`https://api.themoviedb.org/3/tv/airing_today?api_key=${apiKey}`);
     const tv = await latTvURL.json();
     return (tv.results || []).map(t=>({...t,realmediatype:'tv', media_type:"TV Show"}));
}


export async function PopItems(){
    const popMovieURL =   await fetch(`${baseURL}movie/popular?api_key=${apiKey}`);
    const  poTvURL = await fetch(`${baseURL}tv/popular?api_key=${apiKey}`);
     const poMovie = await popMovieURL.json();
     const tvpo = await poTvURL.json();

    const popMovie = (poMovie.results || []).map(m=>({...m,realmediatype:'movie', media_type:"Movie"}));
    const poTv = (tvpo.results || []).map(t=>({...t,realmediatype:'tv', media_type:"TV Show"}));

    const bothResults = [...poTv,...popMovie].sort((a,b)=>b.popularity - a.popularity);
    return bothResults;
}

export async function GetPopMovie() {
    const popMovieURL =   await fetch(`${baseURL}movie/popular?api_key=${apiKey}`);
    const poMovie = await popMovieURL.json();
    return (poMovie.results || []).map(m=>({...m,realmediatype:'movie', media_type:"Movie"}));
}

export async function GetPopTV(){
        const  poTvURL = await fetch(`${baseURL}tv/popular?api_key=${apiKey}`);
        const tvpo = await poTvURL.json();
        return (tvpo.results || []).map(t=>({...t,realmediatype:'tv', media_type:"TV Show"}));
}



export async function Search(searchQuery){
    const movieURL =  await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(searchQuery)}`);
    const tvURL = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${encodeURIComponent(searchQuery)}`);
    const searchedTv = await tvURL.json();
    const searchedMovie = await movieURL.json();
    const tvResults = (searchedTv.results || []).map(t=>({...t,realmediatype:'tv', media_type:"TV Show"}));
    const movieResults = (searchedMovie.results || []).map(m=>({...m,realmediatype:'movie', media_type:"Movie"}));
    const searched = [...tvResults,... movieResults].sort((a,b)=>b.popularity - a.popularity);
    return searched;
}

export async function Trending(){
    const url = await fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}`);
    const urlobj = await url.json();
    return urlobj.results.map((i)=>({...i,realmediatype: i.media_type,  media_type: i.media_type === 'tv' ?  'TV Show' : 'Movie'}));
}

export async function GetSpecific(id, type){
    const url = await fetch(`${baseURL}${type}/${id}?api_key=${apiKey}`);
    const urlobj = await url.json();
    return urlobj;
}

export async function GetTrailer(id,type){
    const url = await fetch(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${apiKey}`);
    const urlobj = await url.json();
    return urlobj.results;
}

export async function GetCast(id,type){
    const url = await fetch(`https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${apiKey}`);
    const urlobj = await url.json();
    return urlobj;

}

export async function GetWheretowatch(id,type){
    const url = await fetch(`https://api.themoviedb.org/3/${type}/${id}/watch/providers?api_key=${apiKey}`);
    const urlobj = await url.json();
    return urlobj.results["IN"]?.flatrate ?? [];

}