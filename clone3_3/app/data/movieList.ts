import { useQuery } from "@tanstack/react-query";
import { GetMovieRes } from "./definition";
import { axiosCus } from "../axios/axiosCus";

export const useGetMovieList = () =>
  useQuery<GetMovieRes, Error>({
    queryKey: ["get", "movie", "list"],
    queryFn: async () => {
      return (
        await axiosCus.get(
          "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=korean&page=1&sort_by=popularity.desc"
        )
      ).data;
    },
  });
