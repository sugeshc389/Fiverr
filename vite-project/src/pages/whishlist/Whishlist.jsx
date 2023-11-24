import './Whishlist.scss';
import newRequest from '../../utils/newRequest';
import { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Skeleton, Stack } from '@mui/material';

const Wishlist = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const queryClient = useQueryClient();


  const { isLoading, data } = useQuery(['myGigs', currentUser._id], () =>
    newRequest.get(`/whishlist/${currentUser._id}`).then((res) => res.data.whishList)
  );

  const mutation = useMutation(
    (gigId) => newRequest.delete(`/whishlist/${currentUser._id}/${gigId}`),
    {
      onMutate: (gigId) => {

        queryClient.setQueryData(['myGigs', currentUser._id], (prevData) =>
          prevData.filter((gig) => gig._id !== gigId)
        );
      },
      onError: (error) => {

        queryClient.invalidateQueries(['myGigs', currentUser._id]);
      },
      onSuccess: () => {

        queryClient.invalidateQueries(['myGigs', currentUser._id]);
      },
    }
  );

  const removeFromWishlist = (gigId) => {

    mutation.mutate(gigId);
  };

  useEffect(() => {

    queryClient.invalidateQueries(['myGigs', currentUser._id]);
  }, [currentUser._id, queryClient]);

  return (
    <div className="wishlist">
      <h2>My Wishlist</h2>
      {data && data.length > 0 ? (
        data.map((gig) => (
          <div className="wishlist-item" key={gig._id}>
            {isLoading ?
              <Stack>
                <Skeleton variant='rectangular' width={100} height={50} />
              </Stack>
              : <img src={gig.cover} alt={gig.name} />}
            <div className="wishlist-item-details">
              <h3>{gig.name}</h3>
              <p>${gig.price.toFixed(2)}</p>
            </div>
            <button
              className="remove-button"
              onClick={() => removeFromWishlist(gig._id)}
            >
              Remove
            </button>
          </div>
        ))
      ) : (
        <p>No items in the wishlist</p>
      )}
    </div>
  );
};

export default Wishlist;

