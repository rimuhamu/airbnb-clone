import getListingById from '@/actions/getListingById';

interface Params {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: Params }) => {
  const listing = await getListingById;
  return <div>ListingPage</div>;
};
export default ListingPage;
