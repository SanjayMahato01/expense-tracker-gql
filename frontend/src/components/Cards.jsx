import { useQuery } from "@apollo/client";
import {  GET_TRANSACTIONS } from "../graphql/queries/transaction.query";
import Card from "./Card";
import { GET_USER_AND_TRANSACTION } from "../graphql/queries/user.query";
import { GET_AUTH_USER } from "../graphql/mutations/transaction.mutation";

const Cards = () => {
    const {data,loading,error} = useQuery(GET_TRANSACTIONS);
	const {data:authUser} = useQuery(GET_AUTH_USER);

	const {data : userAndTransaction } = useQuery(GET_USER_AND_TRANSACTION,{
		variables : {
			userId : authUser?.authUser?._id
		}
	});

	return (
		<div className='w-full px-10 min-h-[40vh]'>
			<p className='text-5xl text-white font-bold text-center my-10'>History</p>
			<div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20'>
				{!loading && data.transactions.map(transaction => (
					<Card key={transaction._id} transaction={transaction} authUser={authUser.authUser} />
				))}
			</div>
			{!loading && data?.transactions.length === 0 && (
				<p className="text-2xl">No transaction history found.</p>
			)}
		</div>
	);
};
export default Cards;