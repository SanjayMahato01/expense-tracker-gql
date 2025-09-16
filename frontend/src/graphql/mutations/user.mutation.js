import { gql } from "@apollo/client";

export const SIGN_UP = gql`
 mutation signUp($input : SignUpInput!){
   signUp(input : $input) {
     _id
     name
     username
   }
 }
`


export const LOGIN = gql`
	mutation Login($input: LoginInput!) {
		login(input: $input) {
			_id
			name
			username
		}
	}
`;


export const LOG_OUT = gql`
  mutation Logout {
     logout {
       message
     }
  }
`