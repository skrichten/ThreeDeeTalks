import { useEffect, useReducer, useState } from "react";

const useDataApi = (initialUrl, options, transformer) => {
  const [url, setUrl] = useState(initialUrl);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    error: false,
    data: null,
  });

  useEffect(() => {
    if (!url || url === '') return;
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });

      try {
        const response = await fetch(url, options);
        const result = await response.json();

        if (!didCancel) {
          dispatch({ type: 'FETCH_SUCCESS', payload: result, transformer });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE', error });
        }
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [url, options, transformer]);

  return [state, setUrl];
};

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        error: false
      };
    case 'FETCH_SUCCESS':
      let data = action.payload;
      if (action.transformer) {
        data = action.transformer(data, state);
      }
      return {
        ...state,
        isLoading: false,
        error: false,
        data: data
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    default:
      throw new Error();
  }
};


export default useDataApi;
