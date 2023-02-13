
import { useSearchParams } from "react-router-dom";

/* 

# this hook perserves the previous state of url_string.

args:
  paramName
  default value for param
*/
export function useSearchParamsState(
  searchParamName,
  defaultValue
){
  // asscess url_str to get and set params
  const [searchParams, setSearchParams] = useSearchParams();
  // if: param_name exist get value from url
  const acquiredSearchParam = searchParams.get(searchParamName);
  // if: param does not exist set default value.
  const searchParamsState = acquiredSearchParam ?? defaultValue;

  // set url param: like: 'age'=12
  const setSearchParamsState = (newState) => {

    console.log('_____________________________________', newState)
      console.log(...searchParams.entries());

      const next = {};

      // const next = Object.assign(
      //     {},
      //     [...searchParams.entries()].reduce(
      //         (o, [key, value]) => {
      //           console.log(o, key, value);
      //           return { ...o, [key]: value };
      //         },
      //         {}
      //     ),
      //     { [searchParamName]: newState },
      
      // );
      console.log('jooooooooooooooooooss', next);
      setSearchParams(next);
  };
  // return: param=value , set: value
  return [searchParamsState, setSearchParamsState];
}