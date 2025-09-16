import Transaction from "../models/transaction.model.js"
import User from '../models/user.model.js';


const transactionResolver = {
  Query: {
    transactions: async (__, _, context) => {
      try {
        if (!context.getUser()) throw new Error("Unauthorized");
        const userId = context.getUser()._id;

        const transactions = await Transaction.find({ userId })
        return transactions
      } catch (error) {
        console.error("Error getting transactions:", error);
        throw new Error("Error getting transactions");
      }
    },
    transaction: async (_, { transactionId },) => {
      console.log(transactionId)
      try {

        const transaction = await Transaction.findById(transactionId);

        return transaction;
      } catch (error) {
        console.error("Error geting transaction:", error)
        throw new Error("Error getting transaction");
      }
    },
    // TODO => ADD categoryStatistics query
    categoryStatistics: async (_, __, context) => {
      if (!context.getUser()) throw new Error("Unauthorized");

      const userId = context.getUser()._id;
      const transactions = await Transaction.find({ userId });

      const categoryMap = {};

      transactions.forEach((transaction) => {
        if (!categoryMap[transaction.category]) {
          categoryMap[transaction.category] = 0
        }

        categoryMap[transaction.category] += transaction.amount
      })

      return Object.entries(categoryMap).map(([category, amount]) => ({
        category,
        totalAmount: amount
      }));
    }

  },
  Mutation: {
    createTransaction: async (parent, { input }, context) => {

      try {
        const newTransaction = new Transaction({
          ...input,
          userId: context.getUser().id
        })
        await newTransaction.save()
        return newTransaction;
      } catch (err) {
        console.error("Error creating transaction", err)
        throw new Error("Error creating transaction")
      }
    },
    updateTransaction: async (_, { input }) => {
      try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(input.transactionId, input, { new: true })
        return updatedTransaction
      } catch (err) {
        console.error("Error creating transaction", err)
        throw new Error("Error creating transaction")
      }
    },
    deleteTransaction: async (_, { transactionId }) => {
      try {
        const updatedTransaction = await Transaction.findByIdAndDelete(transactionId)
        return updatedTransaction
      } catch (err) {
        console.error("Error deleting transaction", err)
        throw new Error("Error deleting transaction")
      }
    },
  },

  Transaction: {
    user: async (parent) => {
      const userId = parent.userId
    
      try {
        const user = await User.findById(userId);
    
        return user
      } catch (err) {
        console.error("Error getting user:", err)
        throw new Error("Error getting user")
      }
    }
  }

}

export default transactionResolver;

