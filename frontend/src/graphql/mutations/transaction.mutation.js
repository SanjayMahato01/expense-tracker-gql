import { gql } from "@apollo/client";


export const GET_AUTH_USER = gql`
  query GetAuthenticatedUser {
     authUser {
      _id
      username
      name
      profilePicture
    }
  }
`;

export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($input:CreateTransactionInput!) {
     createTransaction(input:$input) {
       _id 
       description
       category
       paymentType
       category
       amount
       location
       date
     }
  }
`

export const UPDATE_TRANSACTION = gql`
  mutation UpdateTransaction($input : UpdateTransactionInput!) {
    updateTransaction(input: $input) {
         _id 
       description
       category
       paymentType
       category
       amount
       date
    }
  }
`
export const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($transactionId : ID!) {
    deleteTransaction(transactionId : $transactionId) {
         _id 
    }
  }
`

export const GET_TRANSACTION_STATISTICS = gql`
   query GetTransactionStatistics {
      categoryStatistics {
         category
         totalAmount
      }
   }
`