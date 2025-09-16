import { gql } from "@apollo/client";

export const GET_USER_AND_TRANSACTION = gql`

   query GetUserAndTransactions($userId : ID!){
        user(userId : $userId){
            _id
            name 
            username
            profilePicture
            transactions {
                _id
                description
                paymentType
                category
                amount
                location
                date
            }
        }
  }
`