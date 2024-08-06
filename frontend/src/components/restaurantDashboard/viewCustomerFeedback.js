import React from 'react'
import RHeader from "./restaurantHeader"
import F from "../footer";

export default function viewCustomerFeedback() {
  return (
    <div>
        <RHeader currentPage="viewCustomerFeedback"/>
        <h1> Customer Feedback Page</h1>
        <F/>
      
    </div>
  )
}
