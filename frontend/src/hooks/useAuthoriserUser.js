import {useQuery} from '@apollo/client'
import {ME} from "../graphql/queries";

const useAuthorizedUser = () => {
    const { data } = useQuery(ME);
    console.log('data meeee: ', data)
    return data ? data.me : null;
};

export default useAuthorizedUser;